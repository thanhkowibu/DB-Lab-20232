package com.huy.airbnbserver.admin;

import com.huy.airbnbserver.admin.dto.BookingStatusCountProjection;
import com.huy.airbnbserver.admin.dto.DailyRevenueDto;
import com.huy.airbnbserver.admin.dto.MonthlyRevenueDto;
import com.huy.airbnbserver.admin.dto.RoleRequestDto;
import com.huy.airbnbserver.admin.report.dto.ReportDto;
import com.huy.airbnbserver.system.event.EventPublisher;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RequiredArgsConstructor
@Service
public class AdminService {
    private final AdminRepository adminRepository;
    private final EventPublisher eventPublisher;

    public void setAdminPrivilege(Integer userId) {
        adminRepository.setAdminPrivilege(userId);
    }

    public void setUserPrivilege(Integer userId) {
        adminRepository.setUserPrivilege(userId);
    }


    public List<MonthlyRevenueDto> getRevenueInYear(int year) {
        return adminRepository.findRevenueInYear(year).stream().map(this::mapToRevenue).toList();
    }

    public List<DailyRevenueDto> getRevenueInMonth(int year, int month) {
        return adminRepository.findRevenueInMonth(year, month).stream().map(this::mapToRevenueDaily).toList();
    }

    public BookingStatusCountProjection getBookingStatusOverview(int year, int month) {
        return adminRepository.findBookingStatus(year, month);
    }


    private MonthlyRevenueDto mapToRevenue(Object[] source) {
        return new MonthlyRevenueDto(
                (Integer) source[0],
                (BigDecimal) source[1]
        );
    }

    private DailyRevenueDto mapToRevenueDaily(Object[] source) {
        return new DailyRevenueDto(
                (Integer) source[0],
                (BigDecimal) source[1]
        );
    }

    public Map<String, Long> getDiffReport() {
        Map<String, Long> res = new HashMap<>();
        Object[] counts = adminRepository.countUsersAndBookingsByCurrentAndLastMonth().get(0);

        Long currentMonthUserCount = counts[0] != null ? (Long) counts[0] : 0;
        Long currentMonthBookingCount = counts[1] != null ? (Long) counts[1] : 0;
        Long lastMonthUserCount = counts[2] != null ? (Long) counts[2] : 0;
        Long lastMonthBookingCount = counts[3] != null ? (Long) counts[3] : 0;

        res.put("current_month_user", currentMonthUserCount);
        res.put("last_month_user", lastMonthUserCount);
        res.put("current_month_booking", currentMonthBookingCount);
        res.put("last_month_booking", lastMonthBookingCount);

        return res;
    }

    @Transactional
    public void setHostPrivilege(Long roleRequestId, Integer userId, Boolean isConfirm, Integer reviewerId) {
        adminRepository.reviewRoleRequestAndSetPrivilege(roleRequestId, userId, isConfirm, reviewerId);
        if (isConfirm) {
            eventPublisher.publishSendingNotificationEvent(userId, userId.longValue(), "Congratulations, you are now a host, please login again for this to take effect!" , "USER");
        }
    }

    @Transactional
    public void hostRequest(Integer userId) {
        adminRepository.saveRoleRequest(userId);
    }

    public List<RoleRequestDto> findAllHostRequest(long limit, long offset) {
        return adminRepository.findAllHostRequest(limit, offset)
                .stream()
                .map(this::mapToRoleRequestDto)
                .toList();
    }

    private RoleRequestDto mapToRoleRequestDto(Object[] source) {
        return new RoleRequestDto(
                (Long) source[0],
                (Integer) source[1],
                (String) source[2],
                (Date) source[3],
                (String) source[4],
                (Integer) source[5],
                (Date) source[6],
                (Long) source[7]
        );
    }

    public void resolveReport(Long reportId, Boolean isBan) {
        adminRepository.resolveReportAndConditionalBanUser(reportId, isBan);
    }
}
