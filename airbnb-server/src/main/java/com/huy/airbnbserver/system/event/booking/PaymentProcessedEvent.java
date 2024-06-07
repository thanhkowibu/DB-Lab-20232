package com.huy.airbnbserver.system.event.booking;

import com.huy.airbnbserver.booking.dto.BookingDetail;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
@RequiredArgsConstructor
public class PaymentProcessedEvent {
    private BookingDetail booking;
}
