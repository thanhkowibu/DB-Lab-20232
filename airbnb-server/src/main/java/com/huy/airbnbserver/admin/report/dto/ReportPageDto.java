package com.huy.airbnbserver.admin.report.dto;

import com.huy.airbnbserver.system.common.PageMetadata;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class ReportPageDto {
    PageMetadata pagination_meta_data;
    List<ReportDto> reports;
}
