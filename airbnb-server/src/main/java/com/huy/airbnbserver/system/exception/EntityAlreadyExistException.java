package com.huy.airbnbserver.system.exception;

public class EntityAlreadyExistException extends RuntimeException{
    public EntityAlreadyExistException(String object) {
        super("this "+ object +" already exists");
    }
}
