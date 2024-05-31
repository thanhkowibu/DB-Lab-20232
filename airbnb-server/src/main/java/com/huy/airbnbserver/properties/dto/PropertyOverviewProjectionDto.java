package com.huy.airbnbserver.properties.dto;

import com.huy.airbnbserver.image.ImageDto;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

public record PropertyOverviewProjectionDto (
    Long id,
    BigDecimal nightly_price,
    String name,
    BigDecimal longitude,
    BigDecimal latitude,
    Date created_at,
    Date updated_at,
    Integer num_beds,
    List<ImageDto> images,
    BigDecimal average_rating){
}
