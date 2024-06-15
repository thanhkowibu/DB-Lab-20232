package com.huy.airbnbserver.admin.dto;

public interface BookingStatusCountProjection {
    Integer getCancel();
    Integer getCheckedOut();
    Integer getNoShow();
}
