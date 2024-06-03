package com.huy.airbnbserver.user;


import com.huy.airbnbserver.properties.Property;
import com.huy.airbnbserver.properties.PropertyService;
import com.huy.airbnbserver.properties.converter.PropertyOverProjectionToPropertyOverProjectionDto;
import com.huy.airbnbserver.properties.dto.PropertyOverviewPageDto;
import com.huy.airbnbserver.properties.dto.PropertyOverviewProjection;
import com.huy.airbnbserver.properties.dto.PropertyOverviewProjectionDto;
import com.huy.airbnbserver.report.Issue;
import com.huy.airbnbserver.report.ReportService;
import com.huy.airbnbserver.report.dto.ReportDto;
import com.huy.airbnbserver.system.*;
import com.huy.airbnbserver.system.exception.InvalidSearchQueryException;
import com.huy.airbnbserver.user.converter.UserToUserDtoConverter;
import com.huy.airbnbserver.user.dto.UserDto;
import com.huy.airbnbserver.user.dto.UserWithPropertyDto;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;

import org.springframework.http.MediaType;
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
    private final PropertyService propertyService;
    private final PropertyOverProjectionToPropertyOverProjectionDto converter;
    private final ReportService reportService;

    @PreAuthorize("hasRole('ROLE_admin')")
    @GetMapping
    public Result findAllUsers() {
        List<User> users = userService.findAll();

        List<UserDto> userDtos = users
                .stream()
                .map(userToUserDtoConverter::convert)
                .toList();
        return new Result(true, StatusCode.SUCCESS, "Fetch All User", userDtos);
    }

    @GetMapping("/{userId}")
    public Result findUserById(@PathVariable Integer userId) {
        var user = userService.findById(userId);
        var topProperties = propertyService
                .findTopRatingPropertiesForHost(userId)
                .stream()
                .map(converter::convert)
                .toList();
        var userDto = userToUserDtoConverter.convert(user);
        return new Result(true, StatusCode.SUCCESS, "Success",
                new UserWithPropertyDto(userDto,topProperties));
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

    @PutMapping("/{userId}")
    public Result updateUser(@PathVariable Integer userId,
                             Authentication authentication,
                             @RequestBody UserDto userDto) {
        if (!userId.equals(Utils.extractAuthenticationId(authentication))) {
            return new Result(false,  StatusCode.UNAUTHORIZED, "Action Not Allow For This User");
        }

        return new Result(
                true,
                StatusCode.SUCCESS,
                "Updated Success",
                userToUserDtoConverter.convert(userService.update(userId, userDto))
        );
    }

    @PutMapping(path = "/{userId}/avatar", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Result assignAvatar(@PathVariable Integer userId,
                               @NotNull @RequestParam("images") List<MultipartFile> files,
                               Authentication authentication) throws IOException {
        if (!userId.equals(Utils.extractAuthenticationId(authentication))) {
            return new Result(false,  StatusCode.UNAUTHORIZED, "Action Not Allow For This User");
        }

        if (files != null && Utils.imageValidationFailed(files)) {
            return new Result(false, StatusCode.INVALID_ARGUMENT, "Invalid image files were provided");
        }

        if (files != null && files.size() > 1) {
            new Result(false, StatusCode.INVALID_ARGUMENT, "Too many images were provided, only accept 1");
        }

        userService.assignAvatar(userId, files);
        return new Result(true, 200, "Avatar upload success!");
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
                reportedUser.getEntityId(),
                reportedUser.getType()
        );

        return new Result(true, 200, "Success");
    }
}
