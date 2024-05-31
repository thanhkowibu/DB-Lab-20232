package com.huy.airbnbserver.properties.dto;

import com.huy.airbnbserver.image.ImageDto;
import com.huy.airbnbserver.properties.enm.Category;
import com.huy.airbnbserver.properties.enm.Tag;
import com.huy.airbnbserver.system.annotation.ValueOfEnum;
import com.huy.airbnbserver.system.annotation.ValueOfEnums;
import com.huy.airbnbserver.user.dto.UserDto;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Set;

public record PropertyDetailDto(
        Long id,
        @NotNull @Min(10)
        BigDecimal nightly_price,
        @NotEmpty
        String name,
        @NotNull @Min(0)
        Integer max_guests,
        @NotNull @Min(0)
        Integer num_beds,
        @NotNull @Min(0)
        Integer num_bedrooms,
        @NotNull @Min(0)
        Integer num_bathrooms,
        @NotNull @Min(-180) @Max(180)
        BigDecimal longitude,
        @NotNull @Min(-90) @Max(90)
        BigDecimal latitude,
        @NotEmpty
        String description,
        @NotEmpty
        String address_line,
        Date created_at,
        Date updated_at,
        List<ImageDto> images,
        UserDto host,
        Double average_rating,
        Integer total_rating,
        List<Date> booking_date,
        @ValueOfEnums(enumClass = Category.class) @NotEmpty
        Set<String> categories,
        @ValueOfEnum(enumClass = Tag.class) @NotNull
        String tag
) {

}
