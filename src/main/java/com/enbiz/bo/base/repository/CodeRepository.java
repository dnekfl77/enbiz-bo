package com.enbiz.bo.base.repository;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.core.env.Environment;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import com.enbiz.bo.app.dto.request.login.LoginRequest;
import com.enbiz.common.base.context.ApplicationContextWrapper;
import com.enbiz.common.base.rest.Response;
import com.enbiz.common.base.rest.RestApiComponent;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
@RequiredArgsConstructor
public class CodeRepository {
	public static String getButtonByPageRole() throws Exception {
		LoginRequest loginRequest = (LoginRequest) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		RestApiComponent restApiUtil = ApplicationContextWrapper.getBean(RestApiComponent.class);
		Environment environment = ApplicationContextWrapper.getBean(Environment.class);
		String boApiUrl = environment.getProperty("app.apiUrl.bo");
		return restApiUtil.get(boApiUrl + "/api/bo/common/code/getButtonByPageRoleList", loginRequest, new ParameterizedTypeReference<Response<String>>() {
		}).getPayload();
	}
}
