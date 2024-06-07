package com.huy.airbnbserver.review;

import com.huy.airbnbserver.user.dto.UserDto;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.Date;

public record ReviewDto(
        Long id,
        @NotEmpty
        String content,
        @NotNull @Min(1) @Max(5)
        Integer rating,
        Date created_at,
        Date checked_out_date,
        @NotNull
        Boolean is_recommend,
        UserDto user
) {

}
