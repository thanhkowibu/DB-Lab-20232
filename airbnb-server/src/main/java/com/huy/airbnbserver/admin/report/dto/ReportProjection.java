package com.huy.airbnbserver.admin.report.dto;

import java.util.Date;

public interface ReportProjection {
    Long getId();
    Date getCreatedAt();
    String getDetail();
    Boolean getIsResolved();
    String getIssue();
    Integer getReportedUserId();
    Integer getUserId();
    Long getTotalCount();
}
