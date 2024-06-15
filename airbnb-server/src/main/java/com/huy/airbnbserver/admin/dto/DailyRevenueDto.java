package com.huy.airbnbserver.admin.dto;

import java.math.BigDecimal;

public record DailyRevenueDto(
        Integer day,
        BigDecimal revenue
) {
}
