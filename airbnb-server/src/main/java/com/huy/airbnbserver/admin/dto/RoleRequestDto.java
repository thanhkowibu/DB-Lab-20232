package com.huy.airbnbserver.admin.dto;

import java.util.Date;

public record RoleRequestDto(
      Long id,
      Integer user_id,
      String requested_role,
      Date created_at,
      String status,
      Integer reviewed_by,
      Date reviewed_at,
      Long total_count
) {
}
