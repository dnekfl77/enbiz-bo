package com.enbiz.bo.app.service.login;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;

import com.enbiz.bo.app.dto.request.login.LoginRequest;
import com.enbiz.bo.app.dto.request.system.PasswordChangeRequest;
import com.enbiz.bo.app.dto.response.login.LoginResponse;
import com.enbiz.bo.app.entity.StLoginLog;
import com.enbiz.common.base.rest.Response;
import com.enbiz.common.base.rest.RestApiComponent;

import lombok.RequiredArgsConstructor;

@Service
@Lazy
@RequiredArgsConstructor
public class LoginServiceImpl implements LoginService {

	private final RestApiComponent restApiUtil;

	@Value("${app.apiUrl.bo}")
	private String boApiUrl;

    @Override
    public LoginResponse getUserCertification(LoginRequest loginRequest) throws Exception {
    	return restApiUtil.get(boApiUrl+ "/api/bo/login/login/getUserCertification", loginRequest, new ParameterizedTypeReference<Response<LoginResponse>>() {}).getPayload();
    }

    @Override
    public void updateIdUnlock(LoginRequest loginRequest) throws Exception {
    	restApiUtil.put(boApiUrl+ "/api/bo/login/login/updateIdUnlock", loginRequest, new ParameterizedTypeReference<Response<String>>() {}).getPayload();
    }

    /**
     * 3개월 이상 비로그인 잠금 설정
     */
    @Override
    public void updateIdLockYnCheck(LoginRequest loginRequest)  throws Exception {
    	restApiUtil.put(boApiUrl+ "/api/bo/login/login/updateIdLockYnCheck", loginRequest, new ParameterizedTypeReference<Response<String>>() {}).getPayload();
    }

	@Override
    public LoginResponse getStUserBaseExistsLogin(LoginRequest loginRequest) throws Exception {
		return restApiUtil.get(boApiUrl+ "/api/bo/login/login/getStUserBaseExistsLogin", loginRequest, new ParameterizedTypeReference<Response<LoginResponse>>() {}).getPayload();
    }

    @Override
    public void updateLoginSuccess(LoginRequest loginRequest) throws Exception {
    	restApiUtil.put(boApiUrl+ "/api/bo/login/login/updateLoginSuccess", loginRequest, new ParameterizedTypeReference<Response<String>>() {}).getPayload();
    }

    @Override
    public void updateLoginFailCntAdd(LoginRequest loginRequest) throws Exception {
    	restApiUtil.put(boApiUrl+ "/api/bo/login/login/updateLoginFailCntAdd", loginRequest, new ParameterizedTypeReference<Response<String>>() {}).getPayload();
    }

    @Override
    public void insertStLoginLog(StLoginLog stLoginLog) throws Exception {
    	restApiUtil.post(boApiUrl+ "/api/bo/login/login/insertStLoginLog", stLoginLog, new ParameterizedTypeReference<Response<String>>() {}).getPayload();
    }

    @Override
    public void updateStLoginLog(StLoginLog stLoginLog) throws Exception {
    	restApiUtil.put(boApiUrl+ "/api/bo/login/login/updateStLoginLog", stLoginLog, new ParameterizedTypeReference<Response<String>>() {}).getPayload();
    }

    @Override
    public void updatePasswordByPasswordInitialize(PasswordChangeRequest request) throws Exception {
    	restApiUtil.put(boApiUrl+ "/api/bo/login/login/updatePasswordByPasswordInitialize", request, new ParameterizedTypeReference<Response<String>>() {}).getPayload();
    }

	@Override
	public LoginResponse getLoginUser(String loginId) throws Exception {
		return restApiUtil.get(boApiUrl+ "/api/bo/login/login/updatePasswordByPasswordInitialize", loginId, new ParameterizedTypeReference<Response<LoginResponse>>() {}).getPayload();
	}

}