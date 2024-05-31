package com.huy.airbnbserver.system.exception;

public class InvalidSearchQueryException extends RuntimeException{
    public InvalidSearchQueryException(String message) {
        super(message);
    }
}
