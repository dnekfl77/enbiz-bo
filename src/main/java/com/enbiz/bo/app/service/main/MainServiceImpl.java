package com.enbiz.bo.app.service.main;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;

import com.enbiz.bo.app.dto.request.login.LoginRequest;
import com.enbiz.bo.app.dto.request.menu.TopMenuRequest;
import com.enbiz.bo.app.dto.request.messaging.ReceiveMessage;
import com.enbiz.bo.app.dto.response.menu.LeftMenuResponse;
import com.enbiz.bo.app.dto.response.menu.TopMenuResponse;
import com.enbiz.common.base.rest.Response;
import com.enbiz.common.base.rest.RestApiComponent;

import lombok.RequiredArgsConstructor;

@Service
@Lazy
@RequiredArgsConstructor
public class MainServiceImpl implements MainService {

	private final RestApiComponent restApiComponent;

    @Value("${app.apiUrl.bo}")
	private String boApiUrl;

    @Override
    public List<TopMenuResponse> getTopMenuList(LoginRequest loginRequest) throws Exception {
    	return restApiComponent.get(boApiUrl+ "/api/bo/main/main/getTopMenuList", loginRequest, new ParameterizedTypeReference<Response<List<TopMenuResponse>>>() {}).getPayload();
    }

    @Override
    public List<LeftMenuResponse> getLeftMenuList(TopMenuRequest params) throws Exception {
    	return restApiComponent.get(boApiUrl+ "/api/bo/main/main/getLeftMenuList", params, new ParameterizedTypeReference<Response<List<LeftMenuResponse>>>() {}).getPayload();
    }

    @Override
    public ReceiveMessage getAlarmMessage(LoginRequest loginRequest) {
    	return restApiComponent.get(boApiUrl+ "/api/bo/main/main/getAlarmMessage", loginRequest, new ParameterizedTypeReference<Response<ReceiveMessage>>() {}).getPayload();
    }
}
