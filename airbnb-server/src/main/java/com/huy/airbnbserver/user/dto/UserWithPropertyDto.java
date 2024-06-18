package com.huy.airbnbserver.user.dto;

import com.huy.airbnbserver.properties.dto.PropertyOverviewProjectionDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@Getter
@Setter
public class UserWithPropertyDto {
    private UserDetailDto user_info;
    private List<PropertyOverviewProjectionDto> top_properties;
}
