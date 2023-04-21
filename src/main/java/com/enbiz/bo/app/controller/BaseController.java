package com.enbiz.bo.app.controller;

import java.sql.Timestamp;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.servlet.ModelAndView;

import com.enbiz.common.base.Validator;
import com.enbiz.common.base.propertyeditor.TimestampPropertyEditorSupport;
import com.enbiz.common.base.util.RedirectUtils;

public abstract class BaseController {
	public static final String CONTROLLER_LOGGER = "controller.cat";
	
	protected static final Logger LOGGER = LoggerFactory.getLogger(CONTROLLER_LOGGER);
    protected static final boolean DEBUG_ENABLED = LOGGER.isDebugEnabled();
    
    protected static final String PREFIX_FORWARD = "forward:";
    
    @InitBinder
    public void initBinder(WebDataBinder binder){
    	binder.registerCustomEditor(Timestamp.class, new TimestampPropertyEditorSupport());
    }
    
    protected ModelAndView getRedirectModelAndView(String message, String redirectUrl) {
        Validator.throwIfNull(redirectUrl, "redirectUrl cannot be null");
        
    	return RedirectUtils.getRedirectMAV(message, redirectUrl);
    }
    
    protected ModelAndView getRedirectModelAndView(String redirectUrl) {
        Validator.throwIfNull(redirectUrl, "redirectUrl cannot be null");
        
    	return RedirectUtils.getRedirectMAV(redirectUrl);
    }
    
    protected ModelAndView getForwardModelAndView(String forwardUrl){
    	ModelAndView modelAndView = new ModelAndView(PREFIX_FORWARD+forwardUrl);
    	
    	return modelAndView;
    }
    
    protected ModelAndView getForwardModelAndView(ModelAndView modelAndView, String forwardUrl){
    	modelAndView.setViewName(PREFIX_FORWARD+forwardUrl);
    	return modelAndView;
    }
}
