package com.huy.airbnbserver.booking;

import lombok.Getter;

@Getter
public enum BookingLogDes {

    CREATED("This booking was first issued by an user."),
    CONFIRMED("This booking has been confirmed by host."),
    REJECTED("This booking has failed due to following reason: "),
    SUCCESS("The payment process is marked as complete."),
    NO_SHOW("This booking has been marked as no show from host."),
    CHECKED_OUT("This booking has been marked as checked out from host"),
    CANCEL("This booking has been marked as cancel from issuer");

    private final String description;

    BookingLogDes(String description) {
        this.description = description;
    }
}
