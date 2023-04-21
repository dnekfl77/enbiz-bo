package com.enbiz.bo.base.exception;

import com.enbiz.common.base.exception.UserDefinedException;

@SuppressWarnings("serial")
public class AuthException extends UserDefinedException {

    public AuthException() {
        super();
    }

    public AuthException(String message) {
        super(message);
    }

    public AuthException(Throwable t) {
        super(t);
    }

    public AuthException(String message, Throwable t) {
        super(message, t);
    }
}
