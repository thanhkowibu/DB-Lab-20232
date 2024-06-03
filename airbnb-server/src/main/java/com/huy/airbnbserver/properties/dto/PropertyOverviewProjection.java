package com.huy.airbnbserver.properties.dto;

import com.huy.airbnbserver.image.Image;
import com.huy.airbnbserver.image.ImageDto;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

public interface PropertyOverviewProjection {
        Long getId();
        BigDecimal getNightlyPrice();
        String getName();
        BigDecimal getLongitude();
        BigDecimal getLatitude();
        Date getCreatedAt();
        Date getUpdatedAt();
        Integer getNumBeds();
        List<ImageDto> getImages();

        BigDecimal getAverageRating();
}
