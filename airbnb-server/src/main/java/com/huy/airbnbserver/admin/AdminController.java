package com.huy.airbnbserver.admin;

import com.huy.airbnbserver.admin.dto.RoleRequestDto;
import com.huy.airbnbserver.admin.dto.RoleRequestPage;
import com.huy.airbnbserver.properties.PropertyService;
import com.huy.airbnbserver.admin.report.ReportService;
import com.huy.airbnbserver.admin.report.dto.ReportDto;
import com.huy.airbnbserver.admin.report.dto.ReportPageDto;
import com.huy.airbnbserver.system.Utils;
import com.huy.airbnbserver.system.common.Page;
import com.huy.airbnbserver.system.common.PageMetadata;
import com.huy.airbnbserver.system.common.Result;
import com.huy.airbnbserver.system.exception.InvalidSearchQueryException;
import com.huy.airbnbserver.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@PreAuthorize("hasRole('ROLE_admin')")
@RequestMapping("/api/v1")
public class AdminController {
    private final ReportService reportService;
    private final UserService userService;
    private final PropertyService propertyService;
    private final AdminService adminService;

    @GetMapping("/admin/report")
    public Result findAllReportedProperty(
            @RequestParam(value = "page", required = false) Long page,
            @RequestParam(value = "page_size", required = false) Long pageSize,
            @RequestParam(value = "resolve", required = false) Boolean isResolve
    ) {
        if (isResolve == null) {
            isResolve = false;
        }


        pageSizeCheck(page,pageSize);
        Page pageObject =  new Page(page,pageSize);
        List<ReportDto> reportDtoList;
        if (!isResolve) {
            reportDtoList = reportService.findAllReports(
                    pageObject.getLimit(),
                    pageObject.getOffset());
        } else {
            reportDtoList = reportService.findAllResolvedReports(
                    pageObject.getLimit(),
                    pageObject.getOffset());
        }
        PageMetadata pageMetadata = new PageMetadata(
                pageObject.getPage(),
                pageObject.getPageSize(),
                reportDtoList.isEmpty() ? 0 : reportDtoList.get(0).total_count()
        );

        return new Result(true, 200, "Get all report", new ReportPageDto(pageMetadata, reportDtoList));
    }

    @GetMapping("/admin/host-request")
    public Result findAllHostRequest(
            @RequestParam(value = "page", required = false) Long page,
            @RequestParam(value = "page_size", required = false) Long pageSize
    ) {
        pageSizeCheck(page,pageSize);
        Page pageObject =  new Page(page,pageSize);
        List<RoleRequestDto> reportDtoList = adminService.findAllHostRequest(
                pageObject.getLimit(),
                pageObject.getOffset());
        PageMetadata pageMetadata = new PageMetadata(
                pageObject.getPage(),
                pageObject.getPageSize(),
                reportDtoList.isEmpty() ? 0 : reportDtoList.get(0).total_count()
        );

        return new Result(true, 200, "Get all reported users", new RoleRequestPage(pageMetadata, reportDtoList));
    }

    @PutMapping("/admin/report/{reportId}")
    public Result resolveReport(@PathVariable Long reportId, @RequestParam("ban") Boolean isBan) {
        adminService.resolveReport(reportId, isBan);
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
    public Result deleteProperty(@PathVariable Long propertyId) {
        propertyService.delete(propertyId, -1);
        return new Result(true, 200, "delete property with id "+propertyId);
    }

    @GetMapping("/admin/revenue/year/{year}")
    public Result getRevenue(@PathVariable int year) {
        return new Result(
                true,
                200,
                "fetching revenue in " + year,
                adminService.getRevenueInYear(year));
    }

    @GetMapping("/admin/revenue/year/{year}/month/{month}")
    public Result getRevenue(@PathVariable int year, @PathVariable int month) {
        return new Result(
                true,
                200,
                "fetching revenue in "+month+"/"+year,
                adminService.getRevenueInMonth(year, month));
    }

    @GetMapping("/admin/bookings/status/year/{year}/month/{month}")
    public Result getBookingStatusOverview(@PathVariable int year, @PathVariable int month) {
        return new Result(
                true, 200, "Success",
                adminService.getBookingStatusOverview(year, month)
        );
    }

    @GetMapping("/admin/diff-report")
    public Result getDiffReport() {
        return new Result(
                true, 200, "success",
                adminService.getDiffReport()
        );
    }

    @PutMapping("/admin/users/{userId}/set-admin")
    public void setAdminPrivilege(@PathVariable Integer userId) {
        adminService.setAdminPrivilege(userId);
    }

    @PutMapping("/admin/users/{userId}/set-user")
    public void setUserPrivilege(@PathVariable Integer userId) {
        adminService.setUserPrivilege(userId);
    }

    @PutMapping("/admin/users/{userId}/set-host/{roleRequestId}")
    public void setHostPrivilege(@PathVariable Integer userId,
                                 @RequestParam("confirm") Boolean isConfirm,
                                 @PathVariable Long roleRequestId,
                                 Authentication authentication
    ) {
        adminService.setHostPrivilege(
                roleRequestId,
                userId,
                isConfirm,
                Utils.extractAuthenticationId(authentication)
        );
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
