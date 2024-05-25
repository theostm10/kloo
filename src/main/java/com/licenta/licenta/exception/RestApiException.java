package com.licenta.licenta.exception;

import java.util.Arrays;
import java.util.Collection;

public class RestApiException extends RuntimeException{
    private Collection<Object> rejected;
    private Integer httpStatusCode;

    public RestApiException(String message) {
        super(message);
        this.httpStatusCode = 500;
    }

    public RestApiException(String message, Throwable throwable) {
        super(message,throwable);
        this.httpStatusCode = 500;
    }

    public RestApiException(String message, Throwable throwable, Object... rejected) {
        super(message, throwable);
        this.rejected = Arrays.asList(rejected);
        this.httpStatusCode = 500;
    }


    public Collection<Object> getRejected() {
        return rejected;
    }
}
