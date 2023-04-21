package com.enbiz.bo.base.resolver;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.ByteArrayOutputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.lang.reflect.InvocationTargetException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.beanutils.BeanUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.MethodParameter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import com.enbiz.bo.app.dto.request.login.LoginRequest;
import com.enbiz.bo.app.dto.request.realgrid.RawRealGridCUDRequest;
import com.enbiz.bo.app.dto.request.realgrid.RealGridCUDRequest;
import com.enbiz.bo.base.annotation.RawRealGridCUD;
import com.enbiz.bo.base.annotation.RealGridCUD;
import com.enbiz.common.base.constant.BaseConstants;
import com.enbiz.common.base.entity.BaseCommonEntity;
import com.enbiz.common.base.util.DataMap;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.util.ISO8601DateFormat;

@SuppressWarnings("deprecation")
public class RealgridCUDResolver implements HandlerMethodArgumentResolver {
    protected static final String REAL_GRID_CUD_REQUEST_STRING_CACHE = "_REAL_GRID_CUD_REQUEST_STRING_CACHE_";
    protected static final String REAL_GRID_CUD_REQUEST_JSON_CACHE = "_REAL_GRID_CUD_REQUEST_JSON_CACHE_";
    
    private static final Logger LOGGER = LoggerFactory.getLogger(RealgridCUDResolver.class);

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.hasParameterAnnotation(RealGridCUD.class)
                || parameter.hasParameterAnnotation(RawRealGridCUD.class);
    }

    @Override
    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer,
            NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {

        RealGridCUD realGridCUD = parameter.getParameterAnnotation(RealGridCUD.class);

        if (realGridCUD != null) {
            return resolveRealGridCUD(webRequest, realGridCUD);
        } else { // rawRealGridCUD
            return resolveRawRealGridCUD(webRequest);
        }
    }

    private Object resolveRealGridCUD(NativeWebRequest webRequest, RealGridCUD realGridCUD) throws Exception {
        String gridName = realGridCUD.value();
        Class<? extends BaseCommonEntity> genericType = realGridCUD.type();
        
        String jsonRequest = readJSONString(webRequest);
        JsonNode json = getConvertedJson(webRequest, jsonRequest);

        return RealGridCUDRequest.fromJsonNode(gridName, genericType, json, getCurrentUser(webRequest));
    }

    private Object resolveRawRealGridCUD(NativeWebRequest webRequest) throws Exception {
        String jsonRequest = readJSONString(webRequest);
        JsonNode json = getConvertedJson(webRequest, jsonRequest);

        ObjectMapper objectMapper = getConfiguredObjectMapper();
        RawRealGridCUDRequest cudRequest = new RawRealGridCUDRequest(json, getCurrentUser(webRequest));
        JsonNode formPayload = getFormPayload(webRequest);

        if (formPayload == null) {
            cudRequest.setRequestMap(new DataMap());
        } else {
            cudRequest.setRequestMap(objectMapper.treeToValue(formPayload, DataMap.class));
        }
        return cudRequest;
    }

    protected static JsonNode getConvertedJson(NativeWebRequest webRequest, String jsonRequest) {
        HttpServletRequest request = (HttpServletRequest) webRequest.getNativeRequest();
        JsonNode cachedJson = (JsonNode) request.getAttribute(REAL_GRID_CUD_REQUEST_JSON_CACHE);

        if (cachedJson != null) {
            return cachedJson;
        }

        ObjectMapper objectMapper = getConfiguredObjectMapper();

        try {
            cachedJson = objectMapper.readTree(jsonRequest);
        } catch (Exception e) {
            throw new IllegalStateException("Cannot Parse Json Message [" + e + "]");
        }

        request.setAttribute(REAL_GRID_CUD_REQUEST_JSON_CACHE, cachedJson);
        return cachedJson;
    }

    private LoginRequest getCurrentUser(NativeWebRequest webRequest) {
        LoginRequest loginRequest = null;
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (authentication != null && authentication.isAuthenticated()) {
	        loginRequest = (LoginRequest) authentication.getPrincipal();
		}

        return loginRequest;
    }
    
    protected static String readJSONString(NativeWebRequest nativeRequest) throws Exception {
        HttpServletRequest request = (HttpServletRequest)nativeRequest.getNativeRequest();
        String cachedRequest = (String) request.getAttribute(REAL_GRID_CUD_REQUEST_STRING_CACHE);

        if (cachedRequest != null && !cachedRequest.isEmpty()) {
            return cachedRequest;
        }

        String line = null;
        String result = "[]";
        
        BufferedReader reader = null;
        BufferedWriter writer = null;
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        try{
            reader = new BufferedReader(new InputStreamReader(request.getInputStream(), BaseConstants.DEFAULT_CHARSET));
            writer = new BufferedWriter(new OutputStreamWriter(baos, BaseConstants.DEFAULT_CHARSET));
            
            while((line = reader.readLine()) != null){
                writer.write(line);
            }
            
            writer.flush();

            result = baos.toString(BaseConstants.DEFAULT_CHARSET);
        }catch(Exception e){
            throw e;
        }finally{
            if (reader != null) {
                try {
                    reader.close();
                } catch (Exception e) {
                    LOGGER.trace(e.getMessage(), e);
                }
            }
            if (writer != null) {
                try {
                    writer.close();
                } catch (Exception e) {
                    LOGGER.trace(e.getMessage(), e);
                }
            }
        }

        request.setAttribute(REAL_GRID_CUD_REQUEST_STRING_CACHE, result);

        return result;
    }

    protected static ObjectMapper getConfiguredObjectMapper() {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.setDateFormat(new ISO8601DateFormat());
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        return objectMapper;
    }

    protected static void setCurrentUserInfo(HttpServletRequest request, HttpServletResponse response,
            BaseCommonEntity resolvedObject) throws IllegalAccessException, InvocationTargetException {
        LoginRequest loginRequest = null;
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (authentication != null && authentication.isAuthenticated()) {
	        loginRequest = (LoginRequest) authentication.getPrincipal();
		}

        BeanUtils.setProperty(resolvedObject, "sysRegId", loginRequest.getLoginId());
        BeanUtils.setProperty(resolvedObject, "sysModId", loginRequest.getLoginId());
    }

    protected static JsonNode getFormPayload(NativeWebRequest webRequest) throws Exception {
        String jsonRequest = RealgridCUDResolver.readJSONString(webRequest);
        JsonNode json = RealgridCUDResolver.getConvertedJson(webRequest, jsonRequest);
        JsonNode formPayload = json.get("formPayload");

        return formPayload;
    }
}
