package com.huy.airbnbserver.system.event.ui;

import com.huy.airbnbserver.booking.dto.BookingDetail;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@EqualsAndHashCode
public class SendingBookingEmailEvent {
    private BookingDetail bookingDetail;
}
