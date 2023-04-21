package com.enbiz.bo.app.service.common;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;

import com.enbiz.bo.app.dto.request.login.LoginRequest;
import com.enbiz.common.base.rest.Response;
import com.enbiz.common.base.rest.RestApiUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Lazy
@Slf4j
@RequiredArgsConstructor
public class AdminGroupServiceImpl implements AdminGroupService {
	
	private final RestApiUtil restApiUtil;
	
	@Value("${app.apiUrl.bo}")
	private String boApiUrl;

    @Override
    public int getAdminGroups(LoginRequest loginRequest) throws Exception {
    	return restApiUtil.get(boApiUrl+ "/api/bo/common/common/getAdminGroups", loginRequest, new ParameterizedTypeReference<Response<Integer>>() {}).getPayload();
    }
}
