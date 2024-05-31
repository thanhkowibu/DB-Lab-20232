package com.huy.airbnbserver.report.dto;

import com.huy.airbnbserver.report.Issue;
import com.huy.airbnbserver.report.ReportableEntity;
import com.huy.airbnbserver.system.annotation.NotEmpty;
import com.huy.airbnbserver.system.annotation.ValueOfEnum;
import jakarta.validation.constraints.NotNull;

import java.util.Date;

public record ReportDto(
        Long id,
        Integer reporter_id,
        Date created_at,
        @NotEmpty
        String detail,
        @ValueOfEnum(enumClass = Issue.class) @NotNull
        String issue,
        Boolean is_resolved,
        ReportableEntity reported_entity,
        Long total_count
) {
}
