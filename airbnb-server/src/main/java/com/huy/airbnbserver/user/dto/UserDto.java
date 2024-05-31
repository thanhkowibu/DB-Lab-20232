package com.huy.airbnbserver.user.dto;

import com.huy.airbnbserver.image.Image;
import com.huy.airbnbserver.image.ImageDto;
import com.huy.airbnbserver.properties.Property;
import com.huy.airbnbserver.properties.dto.PropertyOverviewProjectionDto;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.Date;
import java.util.List;

public record UserDto(
    Integer id,
    @NotEmpty(message = "firstname is required")
    String firstname,
    @NotEmpty(message = "lastname is required")
    String lastname,
    @NotEmpty(message = "email is required")
    @Email(message = "invalid email")
    String email,
    boolean enabled,
    Date created_at,
    Date updated_at,
    ImageDto avatar
) {
}
