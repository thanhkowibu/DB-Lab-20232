package com.huy.airbnbserver.admin;

import com.huy.airbnbserver.admin.dto.BookingStatusCountProjection;
import com.huy.airbnbserver.admin.dto.DailyRevenueDto;
import com.huy.airbnbserver.admin.dto.MonthlyRevenueDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RequiredArgsConstructor
@Service
public class AdminService {
    private final AdminRepository adminRepository;

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
}
