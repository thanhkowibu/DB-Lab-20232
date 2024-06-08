package com.huy.airbnbserver.email;

import lombok.Getter;

@Getter
public enum EmailTemplateName {
    ACTIVATE_ACCOUNT("activate_account.html"),
    BOOKING_SUCCESS("booking_success.html");

    private final String name;

    EmailTemplateName(String name) {
        this.name = name;
    }
}