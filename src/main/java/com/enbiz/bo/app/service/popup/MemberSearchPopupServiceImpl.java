package com.enbiz.bo.app.service.popup;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;

import com.enbiz.bo.app.dto.request.popup.MemberSearchRequest;
import com.enbiz.bo.app.dto.response.popup.MemberSearchResponse;
import com.enbiz.common.base.rest.Response;
import com.enbiz.common.base.rest.RestApiComponent;

import lombok.RequiredArgsConstructor;

/**
 * 회원 조회 팝업
 * munu , 화면 , Request , 버튼
 */
@Service
@Lazy
@RequiredArgsConstructor
public class MemberSearchPopupServiceImpl implements MemberSearchPopupService {

	private final RestApiComponent restApiComponent;

    @Value("${app.apiUrl.bo}")
	private String boApiUrl;

    @Override
    public int getMemberListCount(MemberSearchRequest memberSearchRequest) throws Exception {
    	return restApiComponent.get(boApiUrl+ "/api/bo/main/customerMgmt/getMemberListCount", memberSearchRequest, new ParameterizedTypeReference<Response<Integer>>() {}).getPayload();
    }

    @Override
    public List<MemberSearchResponse> getMemberList(MemberSearchRequest memberSearchRequest) throws Exception {
    	return restApiComponent.get(boApiUrl+ "/api/bo/main/customerMgmt/getMemberList", memberSearchRequest, new ParameterizedTypeReference<Response<List<MemberSearchResponse>>>() {}).getPayload();
    }
}
