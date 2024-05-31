package com.huy.airbnbserver.admin;

import com.huy.airbnbserver.comment.CommentService;
import com.huy.airbnbserver.properties.PropertyService;
import com.huy.airbnbserver.report.ReportService;
import com.huy.airbnbserver.report.dto.ReportDto;
import com.huy.airbnbserver.report.dto.ReportPageDto;
import com.huy.airbnbserver.system.Page;
import com.huy.airbnbserver.system.PageMetadata;
import com.huy.airbnbserver.system.Result;
import com.huy.airbnbserver.system.exception.InvalidSearchQueryException;
import com.huy.airbnbserver.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@PreAuthorize("hasRole('ROLE_admin')")
@RequestMapping("/api/v1")
public class AdminController {
    private final ReportService reportService;
    private final UserService userService;
    private final PropertyService propertyService;
    private final CommentService commentService;
    private final FakerService fakerService;

    @GetMapping("/admin/reported-properties")
    public Result findAllReportedProperty(
            @RequestParam(value = "page", required = false) Long page,
            @RequestParam(value = "page_size", required = false) Long pageSize
    ) {
        pageSizeCheck(page,pageSize);
        Page pageObject =  new Page(page,pageSize);
        List<ReportDto> reportDtoList = reportService.findAllPropertyReports(
                pageObject.getLimit(),
                pageObject.getOffset());
        PageMetadata pageMetadata = new PageMetadata(
                pageObject.getPage(),
                pageObject.getPageSize(),
                reportDtoList.isEmpty() ? 0 : reportDtoList.get(0).total_count()
        );

        return new Result(true, 200, "Get all reported properties", new ReportPageDto(pageMetadata, reportDtoList));
    }

    @GetMapping("/admin/reported-users")
    public Result findAllReportedUser(
            @RequestParam(value = "page", required = false) Long page,
            @RequestParam(value = "page_size", required = false) Long pageSize
    ) {
        pageSizeCheck(page,pageSize);
        Page pageObject =  new Page(page,pageSize);
        List<ReportDto> reportDtoList = reportService.findAllUserReports(
                pageObject.getLimit(),
                pageObject.getOffset());
        PageMetadata pageMetadata = new PageMetadata(
                pageObject.getPage(),
                pageObject.getPageSize(),
                reportDtoList.isEmpty() ? 0 : reportDtoList.get(0).total_count()
        );

        return new Result(true, 200, "Get all reported users", new ReportPageDto(pageMetadata, reportDtoList));
    }

    @GetMapping("/admin/reported-comments")
    public Result findAllReportedComment(
            @RequestParam(value = "page", required = false) Long page,
            @RequestParam(value = "page_size", required = false) Long pageSize
    ) {
        pageSizeCheck(page,pageSize);
        Page pageObject =  new Page(page,pageSize);
        List<ReportDto> reportDtoList = reportService.findAllCommentReports(
                pageObject.getLimit(),
                pageObject.getOffset());
        PageMetadata pageMetadata = new PageMetadata(
                pageObject.getPage(),
                pageObject.getPageSize(),
                reportDtoList.isEmpty() ? 0 : reportDtoList.get(0).total_count()
        );

        return new Result(true, 200, "Get all reported comments", new ReportPageDto(pageMetadata, reportDtoList));
    }

    @PutMapping("/admin/report/{reportId}")
    public Result resolveReport(@PathVariable Long reportId) {
        reportService.resolveReport(reportId);
        return new Result(true, 200, "Report resolved successfully");
    }

    @PutMapping("/admin/users/{userId}/ban")
    public Result banUser(@PathVariable Integer userId) {
        userService.banUser(userId);
        return new Result(true, 200,"Ban user with id "+userId);
    }

    @DeleteMapping("/admin/users/{userId}/ban")
    public Result unbanUser(@PathVariable Integer userId) {
        userService.unbanUser(userId);
        return new Result(true, 200,"Unban user with id "+userId);
    }

    @DeleteMapping("/admin/properties/{propertyId}")
    public Result deleteProperty(@PathVariable Long propertyId) throws IOException {
        propertyService.delete(propertyId, -1);
        return new Result(true, 200, "delete property with id "+propertyId);
    }

    @DeleteMapping("/admin/comments/{commentId}")
    public Result deleteComment(@PathVariable Long commentId) {
        commentService.delete(commentId, -1);
        return new Result(true, 200, "delete comment with id "+commentId);
    }

    @GetMapping("/admin/generate-comments")
    public Result generateComment() {
        return new Result(true, 200, "generate mock comment", fakerService.generateComment());
    }

    @GetMapping("/admin/generate-bookings")
    public Result generateBooking() {
        fakerService.generateBooking();
        return new Result(true, 200, "generate mock booking");
    }

    @GetMapping("/admin/generate-properties")
    public Result generateProperties() {
        fakerService.generateProperty();
        return new Result(true, 200, "generate mock property");
    }

    private void pageSizeCheck(Long page, Long pageSize) {
        if (page != null && page < 1) {
            throw new InvalidSearchQueryException("Page must be greater than zero");
        }

        if (pageSize != null && pageSize < 5) {
            throw new InvalidSearchQueryException("Page size must be at least 5");
        }
    }
}
