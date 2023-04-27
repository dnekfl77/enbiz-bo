package com.enbiz.bo.app.service.popup;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;

import com.enbiz.bo.app.dto.request.popup.StRtTgtMenuRequest;
import com.enbiz.bo.app.dto.response.popup.StRtTgtMenuResponse;
import com.enbiz.common.base.rest.Response;
import com.enbiz.common.base.rest.RestApiComponent;

import lombok.RequiredArgsConstructor;

/**
 * 권한대상 관리
 * munu , 화면 , Request , 버튼
 */
@Service
@Lazy
@RequiredArgsConstructor
public class MenuMgmtPopupServiceImpl implements MenuMgmtPopupService {

	private final RestApiComponent restApiComponent;

    @Value("${app.apiUrl.bo}")
	private String boApiUrl;

    @Override
    public List<StRtTgtMenuResponse> getMenuList(StRtTgtMenuRequest stRtTgtMenuRequest) {
    	return restApiComponent.get(boApiUrl+ "/api/bo/main/main/getMenuList", stRtTgtMenuRequest, new ParameterizedTypeReference<Response<List<StRtTgtMenuResponse>>>() {}).getPayload();
    }
}
