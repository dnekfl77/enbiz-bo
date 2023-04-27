package com.enbiz.bo.app.service.popup;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;

import com.enbiz.bo.app.dto.response.popup.CcSitePopupResponse;
import com.enbiz.common.base.rest.Response;
import com.enbiz.common.base.rest.RestApiComponent;

import lombok.RequiredArgsConstructor;

/**
 * 사이트 팝업 Impl
 */
@Service
@Lazy
@RequiredArgsConstructor
public class SiteManagementPopServiceImpl implements SiteManagementPopService{

	private final RestApiComponent restApiComponent;

    @Value("${app.apiUrl.bo}")
	private String boApiUrl;


    @Override
    public List<CcSitePopupResponse> getSitePopupList() throws Exception{
    	return restApiComponent.get(boApiUrl+ "/api/bo/main/main/getSitePopupList", null, new ParameterizedTypeReference<Response<List<CcSitePopupResponse>>>() {}).getPayload();
    }

}
