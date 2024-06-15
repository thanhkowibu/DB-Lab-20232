package com.huy.airbnbserver.booking.dto;

import java.util.Date;

public interface BookingLogProjection {
    String getType();
    Date getTime();
    String getDescription();
}
