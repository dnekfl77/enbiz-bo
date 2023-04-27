package com.enbiz.bo.app.service.popup;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;

import com.enbiz.bo.app.dto.request.popup.StZipNoPopupRequest;
import com.enbiz.bo.app.dto.response.popup.StZipNoPopupResponse;
import com.enbiz.common.base.rest.Response;
import com.enbiz.common.base.rest.RestApiComponent;

import lombok.RequiredArgsConstructor;

/**
 * 우편번호 팝업 서비스 Impl
 */
@Service
@Lazy
@RequiredArgsConstructor
public class ZipCodeMgmtPopupServiceImpl implements ZipCodeMgmtPopupService{

	private final RestApiComponent restApiComponent;

    @Value("${app.apiUrl.bo}")
	private String boApiUrl;

    @Override
    public List<StZipNoPopupResponse> getZipNoPopupList(StZipNoPopupRequest req) {
    	return restApiComponent.get(boApiUrl+ "/api/bo/main/system/getZipNoPopupList", req, new ParameterizedTypeReference<Response<List<StZipNoPopupResponse>>>() {}).getPayload();
    }

    @Override
    public int getZipNoPopupListCount(StZipNoPopupRequest req) {
    	return restApiComponent.get(boApiUrl+ "/api/bo/main/system/getZipNoPopupListCount", req, new ParameterizedTypeReference<Response<Integer>>() {}).getPayload();
    }
}
