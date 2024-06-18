package com.huy.airbnbserver.admin.dto;

import com.huy.airbnbserver.system.common.PageMetadata;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class RoleRequestPage {
    PageMetadata pagination_meta_data;
    List<RoleRequestDto> reports;
}

