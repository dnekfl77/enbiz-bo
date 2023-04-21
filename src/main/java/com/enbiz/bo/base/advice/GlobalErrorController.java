package com.enbiz.bo.base.advice;

import java.util.Map;

import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.boot.autoconfigure.web.servlet.error.AbstractErrorController;
import org.springframework.boot.web.error.ErrorAttributeOptions;
import org.springframework.boot.web.error.ErrorAttributeOptions.Include;
import org.springframework.boot.web.servlet.error.ErrorAttributes;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.enbiz.bo.base.exception.AuthException;
import com.enbiz.common.base.exception.MessageResolver;
import com.enbiz.common.base.exception.ValidationException;
import com.enbiz.common.base.rest.ErrorResponse;

import lombok.extern.slf4j.Slf4j;

@Controller
//@RequestMapping("${server.error.path:${error.path:/error}}") // 1)
@RequestMapping("/error") // 1)
@Slf4j
public class GlobalErrorController extends AbstractErrorController {
	public static final String EXCEPTION_KEY = "_ExceptioN_KEY_";
    public static final String COMMON_ERROR_PAGE = "common/error";

	public GlobalErrorController(ErrorAttributes errorAttributes) {
		super(errorAttributes);
	}
	
	@RequestMapping(produces = MediaType.TEXT_HTML_VALUE) // 2)
	public ModelAndView errorHtml(HttpServletRequest request, HttpServletResponse response) {
		ErrorAttributeOptions options = ErrorAttributeOptions.defaults();
		Map<String, Object> model = getErrorAttributes(request, options);
		String errorPage = "error/error";
		Exception exception = (Exception) request.getAttribute("javax.servlet.error.exception");
		
		if (exception != null) {
			Throwable throwable = exception.getCause();
        	if (throwable instanceof AuthException) {
        		errorPage = "error/403";
            } else if (throwable instanceof ValidationException) {
            	errorPage = "error/404";
            } else {
            	errorPage = "error/500";
            }
		} else {
			errorPage = "error/500";
		}

    	ModelAndView modelAndView = new ModelAndView(errorPage, model);
    	modelAndView.addObject(EXCEPTION_KEY, exception.getCause());
    	return modelAndView;
	}

	protected ErrorAttributeOptions getErrorAttributeOptions(HttpServletRequest request, MediaType mediaType) {
		ErrorAttributeOptions options = ErrorAttributeOptions.defaults();
		options = options.including(Include.MESSAGE);
		options = options.including(Include.BINDING_ERRORS);
		return options;
	}

	@RequestMapping
    public ResponseEntity<ErrorResponse> error(HttpServletRequest request) {
        Object status = request.getAttribute(RequestDispatcher.ERROR_STATUS_CODE);

        log.error("status_code: {}", request.getAttribute("javax.servlet.error.status_code"));
        log.error("exception_type: {}", request.getAttribute("javax.servlet.error.exception_type"));
        log.error("message: {}", request.getAttribute("javax.servlet.error.message"));
        log.error("request_uri: {}", request.getAttribute("javax.servlet.error.request_uri"));
        log.error("exception: {}", request.getAttribute("javax.servlet.error.exception"));

        Exception exception = (Exception)request.getAttribute("javax.servlet.error.exception");
        
        if (exception != null) {
        	Throwable throwable = exception.getCause();
        	if (throwable instanceof AuthException) {
        		return new ResponseEntity<ErrorResponse>(
        				new ErrorResponse("0403", ((AuthException)throwable).getMessage()),
        				new HttpHeaders(), HttpStatus.FORBIDDEN);
            } else {
            	return new ResponseEntity<ErrorResponse>(
        				new ErrorResponse("9000", MessageResolver.getMessage("adminCommon.system.error")),
        				new HttpHeaders(), HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else {
    		return new ResponseEntity<ErrorResponse>(
    				new ErrorResponse("9000", MessageResolver.getMessage("adminCommon.system.error")),
    				new HttpHeaders(), HttpStatus.valueOf(Integer.valueOf(String.valueOf(status))));
        }
    }

}
