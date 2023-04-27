package com.enbiz.bo.app.service.common;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;

import com.enbiz.bo.app.dto.request.login.LoginRequest;
import com.enbiz.common.base.rest.Response;
import com.enbiz.common.base.rest.RestApiComponent;

import lombok.RequiredArgsConstructor;

@Service
@Lazy
@RequiredArgsConstructor
public class AdminGroupServiceImpl implements AdminGroupService {

	private final RestApiComponent restApiComponent;

	@Value("${app.apiUrl.bo}")
	private String boApiUrl;

    @Override
    public int getAdminGroups(LoginRequest loginRequest) throws Exception {
    	return restApiComponent.get(boApiUrl+ "/api/bo/common/common/getAdminGroups", loginRequest, new ParameterizedTypeReference<Response<Integer>>() {}).getPayload();
    }
}
