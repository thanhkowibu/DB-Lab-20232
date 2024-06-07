package com.huy.airbnbserver.system.event.booking;

import com.huy.airbnbserver.booking.Booking;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@EqualsAndHashCode
public class NoShowEvent {
    private Booking booking;
}
