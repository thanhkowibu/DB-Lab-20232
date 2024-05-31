package com.huy.airbnbserver.report.dto;

import java.util.Date;

public interface ReportProjection {
    Long getId();
    Date getCreatedAt();
    String getDetail();
    Boolean getIsResolved();
    String getIssue();
    Long getReportEntityId();
    String getReportType();
    Integer getUserId();
    Long getTotalCount();
}
