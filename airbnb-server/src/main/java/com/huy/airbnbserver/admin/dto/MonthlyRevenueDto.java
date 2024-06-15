package com.huy.airbnbserver.admin.dto;

import java.math.BigDecimal;

public record MonthlyRevenueDto(
        Integer month,
        BigDecimal revenue
) {
}
