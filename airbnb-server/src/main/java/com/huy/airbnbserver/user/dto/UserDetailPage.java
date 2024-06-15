package com.huy.airbnbserver.user.dto;

import com.huy.airbnbserver.system.common.PageMetadata;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@Getter
@Setter
public class UserDetailPage {
    PageMetadata pagination_meta_data;
    List<UserDetailDto> users;
}
