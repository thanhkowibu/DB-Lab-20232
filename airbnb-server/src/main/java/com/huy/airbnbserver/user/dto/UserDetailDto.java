package com.huy.airbnbserver.user.dto;

import com.huy.airbnbserver.image.ImageDto;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;

import java.util.Date;
import java.util.List;

public record UserDetailDto(
        Integer id,
        @NotEmpty(message = "firstname is required")
        String firstname,
        @NotEmpty(message = "lastname is required")
        String lastname,
        String email,
        Boolean enabled,
        Boolean is_banned,
        Date created_at,
        List<String> roles,
        String phone_number,
        String gender,
        Date dob,
        ImageDto avatar
) {
}
