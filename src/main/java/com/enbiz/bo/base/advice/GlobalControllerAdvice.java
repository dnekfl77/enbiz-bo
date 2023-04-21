package com.enbiz.bo.base.advice;

import java.text.MessageFormat;
import java.util.Arrays;
import java.util.Enumeration;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.ModelAndView;

import com.enbiz.bo.base.exception.AuthException;
import com.enbiz.common.base.exception.AppException;
import com.enbiz.common.base.exception.ValidationException;

import lombok.extern.slf4j.Slf4j;

@ControllerAdvice
@Slf4j
@ResponseBody
public class GlobalControllerAdvice {
	public static final String EXCEPTION_KEY = "_ExceptioN_KEY_";
    public static final String NEW_LINE = "\n";
    public static final String COMMON_ERROR_PAGE = "common/error";

    protected static final String PARAMETER_PATTERN = "\tParam[{0}].value={1}\n";

	@ExceptionHandler(Exception.class)
	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public Object handleException(Exception exception, HttpServletRequest request, Object object) {
        
        if (isApiRequest(request)) {
    		return new ResponseEntity<Exception>(
    				exception, 
    				new HttpHeaders(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return handleException(request, exception, object);
    }
	
	@ExceptionHandler(AuthException.class)
	@ResponseStatus(HttpStatus.FORBIDDEN)
	public Object handleAuthException(AuthException exception, HttpServletRequest request, Object object) {
		if (log.isDebugEnabled()) {
            String errorMessage = getErrorMessage(exception, request);
            log.debug(errorMessage);
        }
        
        if (isApiRequest(request)) {
    		return new ResponseEntity<AuthException>(
    				exception, 
    				new HttpHeaders(), HttpStatus.FORBIDDEN);
        }

        return handleException(request, exception, object);
	}
	
	@ExceptionHandler(ValidationException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
    public Object handleValidationException(ValidationException exception, HttpServletRequest request, Object object) {
        if (log.isDebugEnabled()) {
            String errorMessage = getErrorMessage(exception, request);
            log.debug(errorMessage);
        }
        
        if (isApiRequest(request)) {
    		return new ResponseEntity<ValidationException>(
    				exception, 
    				new HttpHeaders(), HttpStatus.BAD_REQUEST);
        }

        return handleException(request, exception, object);
    }
	
	@ExceptionHandler(AppException.class)
	@ResponseStatus(HttpStatus.FAILED_DEPENDENCY)
    public Object handleRestApiException(AppException exception, HttpServletRequest request, Object object) {
        if (isApiRequest(request)) {
    		return new ResponseEntity<AppException>(
    				exception,
    				new HttpHeaders(), HttpStatus.FAILED_DEPENDENCY);
        }
        return handleException(request, exception, object);
    }

    private String getErrorMessage(Exception exception, HttpServletRequest request) {
        String exceptionMessage = exception == null || exception.getMessage() == null 
                ? 
                "Null Exception Message" : exception.getMessage();
        
        StringBuilder buffer = new StringBuilder(exceptionMessage);
        buffer.append(NEW_LINE);
        buffer.append(getParameterString(request));

        return buffer.toString();
    }

    private String getParameterString(HttpServletRequest request) {
        StringBuilder buffer = new StringBuilder();
        Enumeration<String> names = request.getParameterNames();

        String name = null;
        String value = null;
        while (names.hasMoreElements()) {
            name = names.nextElement();
            value = Arrays.asList(request.getParameterValues(name)).toString();

            buffer.append(MessageFormat.format(PARAMETER_PATTERN, name, value));
        }

        return buffer.toString();
    }

    private ModelAndView handleException(HttpServletRequest request, Exception exception, Object object) {
        if (isLoggableException(exception) && log.isErrorEnabled()) {
            log.error(exception.getMessage(), exception);
        }
        
        String errorPage = COMMON_ERROR_PAGE;
        
    	ModelAndView modelAndView = new ModelAndView(errorPage);
    	modelAndView.addObject(EXCEPTION_KEY, exception);
    	return modelAndView;
    }

	private boolean isLoggableException(Exception exception) {
        return !(exception instanceof ValidationException);
    }
    
	private boolean isApiRequest(HttpServletRequest request) {
		String ajaxHeader = request.getHeader("X-Requested-With");
		if ("XMLHttpRequest".equals(ajaxHeader)) {
			return true;
		}
		return false;
	}
	
}
