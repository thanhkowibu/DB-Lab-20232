package com.huy.airbnbserver.system.exception;

public class InvalidDateArgumentException extends RuntimeException{
    public InvalidDateArgumentException() {
        super("Invalid Date, Check In Date Cannot >= Check Out Date, Or The Date Has Already Been Booked By Another User");
    }
}
