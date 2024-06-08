package com.huy.airbnbserver.system.exception;

public class NotModifiedException extends RuntimeException {
    public NotModifiedException(String message) {
        super(message);
    }
}
