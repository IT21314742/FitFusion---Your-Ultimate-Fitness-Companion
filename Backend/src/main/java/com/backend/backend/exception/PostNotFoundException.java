package com.backend.backend.exception;

public class PostNotFoundException extends RuntimeException  {
    public PostNotFoundException(String id){
        super("Could not found the  id"+id);
    }
}
