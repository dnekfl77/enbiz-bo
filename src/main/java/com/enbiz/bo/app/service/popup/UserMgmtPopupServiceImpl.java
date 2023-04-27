package com.enbiz.bo.app.service.popup;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;

import com.enbiz.bo.app.dto.request.popup.StUserBaseRequest;
import com.enbiz.bo.app.dto.response.popup.StUserBaseResponse;
import com.enbiz.common.base.rest.Response;
import com.enbiz.common.base.rest.RestApiComponent;

import lombok.RequiredArgsConstructor;

/**
 * 사용자 관리 서비스 IMPL
 */
@Service
@Lazy
@RequiredArgsConstructor
public class UserMgmtPopupServiceImpl implements UserMgmtPopupService {

	private final RestApiComponent restApiComponent;

    @Value("${app.apiUrl.bo}")
	private String boApiUrl;

    @Override
    public int getUserListCount(StUserBaseRequest stUserBaseRequest) throws Exception {
    	return restApiComponent.get(boApiUrl+ "/api/bo/main/system/getUserListCount", stUserBaseRequest, new ParameterizedTypeReference<Response<Integer>>() {}).getPayload();
    }

    @Override
    public List<StUserBaseResponse> getUserList(StUserBaseRequest stUserBaseRequest) throws Exception {
    	return restApiComponent.get(boApiUrl+ "/api/bo/main/system/getUserList", stUserBaseRequest, new ParameterizedTypeReference<Response<List<StUserBaseResponse>>>() {}).getPayload();
    }

    @Override
    public List<StUserBaseResponse> getUserListNoPage(StUserBaseRequest stUserBaseRequest) throws Exception{
    	return restApiComponent.get(boApiUrl+ "/api/bo/main/system/getUserListNoPage", stUserBaseRequest, new ParameterizedTypeReference<Response<List<StUserBaseResponse>>>() {}).getPayload();
    }
}
