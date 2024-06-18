package com.huy.airbnbserver.user;

import com.huy.airbnbserver.admin.AdminService;
import com.huy.airbnbserver.image.ImageDto;
import com.huy.airbnbserver.image.converter.ImageToImageDtoConverter;
import com.huy.airbnbserver.properties.PropertyService;
import com.huy.airbnbserver.properties.converter.PropertyOverProjectionToPropertyOverProjectionDto;
import com.huy.airbnbserver.properties.dto.PropertyOverviewPageDto;
import com.huy.airbnbserver.properties.dto.PropertyOverviewProjection;
import com.huy.airbnbserver.properties.dto.PropertyOverviewProjectionDto;
import com.huy.airbnbserver.admin.report.Issue;
import com.huy.airbnbserver.admin.report.ReportService;
import com.huy.airbnbserver.admin.report.dto.ReportDto;
import com.huy.airbnbserver.system.*;
import com.huy.airbnbserver.system.common.Page;
import com.huy.airbnbserver.system.common.PageMetadata;
import com.huy.airbnbserver.system.common.Result;
import com.huy.airbnbserver.system.common.StatusCode;
import com.huy.airbnbserver.system.exception.InvalidSearchQueryException;
import com.huy.airbnbserver.user.converter.UserToUserDetailDtoConverter;
import com.huy.airbnbserver.user.converter.UserToUserDtoConverter;
import com.huy.airbnbserver.user.dto.*;
import com.huy.airbnbserver.user.model.User;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

import lombok.NonNull;
import org.springframework.http.MediaType;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
@AllArgsConstructor
public class UserController {
    private final UserService userService;
    private final UserToUserDtoConverter userToUserDtoConverter;
    private final UserToUserDetailDtoConverter userToUserDetailDtoConverter;
    private final PropertyService propertyService;
    private final PropertyOverProjectionToPropertyOverProjectionDto converter;
    private final ReportService reportService;
    private final ImageToImageDtoConverter imageToImageDtoConverter;
    private final AdminService adminService;

    @PreAuthorize("hasRole('ROLE_admin')")
    @GetMapping
    public Result findAllUsers(
            @RequestParam(value = "page", required = false) Long page,
            @RequestParam(value = "page_size", required = false) Long pageSize
    ) {
        if (page != null && page < 1) {
            throw new InvalidSearchQueryException("Page must be greater than zero");
        }

        if (pageSize != null && pageSize < 5) {
            throw new InvalidSearchQueryException("Page size must be at least 5");
        }
        Page pageObject =  new Page(page,pageSize);
        List<User> users = userService.findAll(pageObject.getPage(), pageObject.getPageSize());
        PageMetadata pageMetadata = new PageMetadata(
                pageObject.getPage(),
                pageObject.getPageSize(),
                userService.getTotal());

        List<UserDetailDto> userDtos = users
                .stream()
                .map(userToUserDetailDtoConverter::convert)
                .toList();


        return new Result(true, StatusCode.SUCCESS, "Fetch All User",
                new UserDetailPage(pageMetadata, userDtos));
    }

    @GetMapping("/{userId}")
    public Result findUserById(@PathVariable Integer userId) {
        var user = userService.findById(userId);
        var topProperties = propertyService
                .findTopRatingPropertiesForHost(userId)
                .stream()
                .map(converter::convert)
                .toList();
        var userDto = userToUserDetailDtoConverter.convert(user);
        return new Result(true, StatusCode.SUCCESS, "Success",
                new UserWithPropertyDto(userDto,topProperties));
    }

    @GetMapping("/{userId}/details")
    public Result getUserDetail(@PathVariable Integer userId,
                                Authentication authentication) {
        if (!userId.equals(Utils.extractAuthenticationId(authentication))) {
            return new Result(false,  StatusCode.UNAUTHORIZED, "Action Not Allow For This User");
        }

        User user = userService.findById(userId);
        UserDetailDto userDetailDto = userToUserDetailDtoConverter.convert(user);

        return new Result(true, 200, "Fetch user detail success", userDetailDto);
    }

    @PutMapping("/{userId}/details")
    public Result updateUserDetail(@PathVariable Integer userId,
                                   Authentication authentication,
                                   @Valid @RequestBody UserDetailDto userDetailDto) {
        if (!userId.equals(Utils.extractAuthenticationId(authentication))) {
            return new Result(false,  StatusCode.UNAUTHORIZED, "Action Not Allow For This User");
        }

        userService.update(userId, userDetailDto);
        return new Result(true, 200, "Update success");
    }

    @GetMapping("/{userId}/properties")
    public Result getAllHostedProperties(
            @PathVariable Integer userId,
            @RequestParam(value = "page", required = false) Long page,
            @RequestParam(value = "page_size", required = false) Long pageSize
    ) {
        if (page != null && page < 1) {
            throw new InvalidSearchQueryException("Page must be greater than zero");
        }

        if (pageSize != null && pageSize < 5) {
            throw new InvalidSearchQueryException("Page size must be at least 5");
        }

        Page pageObject = new Page(page,pageSize);
        List<PropertyOverviewProjection> propertyOverviewProjections =
                propertyService.findALlByUserId(userId, pageObject.getLimit(), pageObject.getOffset());

        Long totalProperty = propertyService.getTotalByUserId(userId);
        PageMetadata pageData = new PageMetadata(pageObject.getPage(), pageObject.getPageSize(), totalProperty);

        List<PropertyOverviewProjectionDto> propertyOverviewProjectionDtos =
                propertyOverviewProjections.stream()
                        .map(converter::convert)
                        .toList();

        return new Result(
                true,
                200,
                "Success",
                new PropertyOverviewPageDto(
                        pageData,
                        propertyOverviewProjectionDtos
                )
        );
    }

    @PutMapping(path = "/{userId}/avatar", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Result assignAvatar(@PathVariable Integer userId,
                               @NonNull @RequestParam(value = "images") List<MultipartFile> files,
                               Authentication authentication) throws IOException {
        if (!userId.equals(Utils.extractAuthenticationId(authentication))) {
            return new Result(false,  StatusCode.UNAUTHORIZED, "Action Not Allow For This User");
        }

        if (Utils.imageValidationFailed(files)) {
            return new Result(false, StatusCode.INVALID_ARGUMENT, "Invalid image files were provided");
        }

        if (files.size() > 1) {
            new Result(false, StatusCode.INVALID_ARGUMENT, "Too many images were provided, only accept 1");
        }

        ImageDto image = imageToImageDtoConverter.convert(userService.assignAvatar(userId, files));
        return new Result(true, 200, "Avatar upload success!", image);
    }

    @PostMapping("/{userId}/report")
    public Result reportUser(@PathVariable Integer userId,
                                 @Valid @RequestBody ReportDto reportDto,
                                 Authentication authentication) {
        Issue issue = Issue.valueOf(reportDto.issue());
        User reportedUser = userService.findById(userId);

        reportService.createReport(
                Utils.extractAuthenticationId(authentication),
                issue,
                reportDto.detail(),
                reportedUser.getId());

        return new Result(true, 200, "Success");
    }

    @PutMapping("/{userId}/notification-preference")
    public Result updatingPreference(@PathVariable Integer userId,
                                     @RequestBody NotificationPreferenceDto notificationPreferenceDto,
                                     Authentication authentication) {
        if (!Utils.extractAuthenticationId(authentication).equals(userId)) {
            throw new AccessDeniedException("Access denied for this user");
        }

        userService.updateNotificationPreference(notificationPreferenceDto, userId);
        return new Result(true, 200, "Success");
    }

    @GetMapping("/{userId}/notification-preference")
    public Result getPreference(@PathVariable Integer userId) {
        return new Result(
                true,
                200,
                "Fetching user notification preference",
                userService.getNotificationPreference(userId)
        );
    }

    @PostMapping("/host-request")
    @PreAuthorize("!hasRole('ROLE_host')")
    public Result requestToBeHost(Authentication authentication) {
        adminService.hostRequest(Utils.extractAuthenticationId(authentication));
        return new Result(true, 200, "Request success, please comeback again while admin review your request");
    }
}
