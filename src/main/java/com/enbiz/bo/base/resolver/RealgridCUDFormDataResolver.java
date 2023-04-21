package com.enbiz.bo.base.resolver;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.core.MethodParameter;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import com.enbiz.bo.base.annotation.RealGridCUDResponse;
import com.enbiz.common.base.entity.BaseCommonEntity;
import com.enbiz.common.base.util.ObjectMapperUtils;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

public class RealgridCUDFormDataResolver implements HandlerMethodArgumentResolver {

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        RealGridCUDResponse ann = parameter.getMethodAnnotation(RealGridCUDResponse.class);
        Class<?> parameterType = parameter.getParameterType();
        return ann != null && BaseCommonEntity.class.isAssignableFrom(parameterType);
    }

    @Override
    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer,
            NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {

        HttpServletRequest request = (HttpServletRequest) webRequest.getNativeRequest();
        HttpServletResponse response = (HttpServletResponse) webRequest.getNativeResponse();

        JsonNode formPayload = RealgridCUDResolver.getFormPayload(webRequest);
        ObjectMapper objectMapper = RealgridCUDResolver.getConfiguredObjectMapper();

        BaseCommonEntity resolvedObject = (BaseCommonEntity) ObjectMapperUtils.treeToValue(objectMapper, formPayload,
                parameter.getParameterType());

        RealgridCUDResolver.setCurrentUserInfo(request, response, resolvedObject);

        return resolvedObject;
    }
}
