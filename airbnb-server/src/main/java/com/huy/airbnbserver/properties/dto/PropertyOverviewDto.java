package com.huy.airbnbserver.properties.dto;
import com.huy.airbnbserver.image.ImageDto;
import jakarta.validation.constraints.NotEmpty;


import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

// images and basic info
public record PropertyOverviewDto(
        Long id,
        BigDecimal nightly_price,
        String name,
        BigDecimal longitude,
        BigDecimal latitude,
        Date created_at,
        Date updated_at,
        List<ImageDto> images
) {

}
