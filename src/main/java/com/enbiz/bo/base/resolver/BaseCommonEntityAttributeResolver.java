package com.enbiz.bo.base.resolver;

import java.lang.reflect.Field;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.MethodParameter;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;
import org.springframework.web.servlet.mvc.method.annotation.ServletModelAttributeMethodProcessor;

import com.enbiz.bo.app.dto.request.login.LoginRequest;
import com.enbiz.bo.app.dto.request.realgrid.RawRealGridCUDRequest;
import com.enbiz.bo.app.dto.request.realgrid.RealGridCUDRequest;
import com.enbiz.common.base.annotation.Uppercase;
import com.enbiz.common.base.entity.BaseCommonEntity;
import com.enbiz.common.base.util.ObjectMapperUtils;
import com.enbiz.common.base.util.ReflectionUtils;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

public class BaseCommonEntityAttributeResolver implements HandlerMethodArgumentResolver {
    private static final Logger LOGGER = LoggerFactory.getLogger(BaseCommonEntityAttributeResolver.class);
    
    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return BaseCommonEntity.class.isAssignableFrom(parameter.getParameterType()) && !LoginRequest.class.isAssignableFrom(parameter.getParameterType());
    }

    @Override
    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer,
            NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {
        ServletModelAttributeMethodProcessor servletProcessor = new ServletModelAttributeMethodProcessor(true);

        Class<?>[] types = parameter.getMethod().getParameterTypes();
        boolean hasRealGridRequestType = false;
        
        for(Class<?> type : types){
        	if(type == RealGridCUDRequest.class || type == RawRealGridCUDRequest.class){
        		hasRealGridRequestType = true;
        		break;
        	}
        }
        
        BaseCommonEntity resolvedObject = null;
        if(hasRealGridRequestType){
        	JsonNode formPayload = RealgridCUDResolver.getFormPayload(webRequest);
        	ObjectMapper objectMapper = RealgridCUDResolver.getConfiguredObjectMapper();
        	
        	resolvedObject = (BaseCommonEntity) ObjectMapperUtils.treeToValue(objectMapper, formPayload,
        			parameter.getParameterType());
        }else{
        	resolvedObject = (BaseCommonEntity) servletProcessor.resolveArgument(parameter, mavContainer,
        			webRequest, binderFactory);
        }
        
        HttpServletRequest request = (HttpServletRequest) webRequest.getNativeRequest();
        HttpServletResponse response = (HttpServletResponse) webRequest.getNativeResponse();

        RealgridCUDResolver.setCurrentUserInfo(request, response, resolvedObject);
        capitalizeUppercaseFields(resolvedObject);

        return resolvedObject;
    }
    
    private static void capitalizeUppercaseFields(BaseCommonEntity resolvedObject) {
        try{
            Field[] fields = ReflectionUtils.getDeclaredFieldsAll(resolvedObject.getClass());
            for(Field field : fields){
                field.setAccessible(true);
                if(field.getAnnotation(Uppercase.class) != null
                        && field.get(resolvedObject) != null
                        && field.getType() == String.class) {
                    String value = ((String)field.get(resolvedObject)).toUpperCase();
                    field.set(resolvedObject, value);
                }
            }
        }catch(Exception e){
            LOGGER.trace(e.getMessage(), e);
        }
    }
}
