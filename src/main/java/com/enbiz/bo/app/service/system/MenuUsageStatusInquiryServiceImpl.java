package com.enbiz.bo.app.service.system;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;

import com.enbiz.bo.app.dto.request.system.RtTargetBaseLogRequest;
import com.enbiz.bo.app.dto.response.system.RtTargetBaseLogResponse;
import com.enbiz.common.base.rest.Response;
import com.enbiz.common.base.rest.RestApiComponent;

import lombok.RequiredArgsConstructor;

/**
 * 메뉴별 사용 현황 조회 service
 */
@Service
@Lazy
@RequiredArgsConstructor
public class MenuUsageStatusInquiryServiceImpl implements MenuUsageStatusInquiryService {

	private final RestApiComponent restApiComponent;

	@Value("${app.apiUrl.bo}")
	private String boApiUrl;

	@Override
	public int getMenuUseStatusListCount(RtTargetBaseLogRequest rtTargetBaseLogRequest) throws Exception {
		return restApiComponent.get(boApiUrl + "/api/bo/system/menuUsageStatusInquiry/getMenuUseStatusListCount", rtTargetBaseLogRequest, new ParameterizedTypeReference<Response<Integer>>() {}).getPayload();
	}

	@Override
	public List<RtTargetBaseLogResponse> getMenuUseStatusList(RtTargetBaseLogRequest rtTargetBaseLogRequest) throws Exception {
		return restApiComponent.get(boApiUrl + "/api/bo/system/menuUsageStatusInquiry/getMenuUseStatusList", rtTargetBaseLogRequest, new ParameterizedTypeReference<Response<List<RtTargetBaseLogResponse>>>() {}).getPayload();
	}

	@Override
	public int getUserMenuUseStatusListCount(RtTargetBaseLogRequest rtTargetBaseLogRequest) throws Exception {
		return restApiComponent.get(boApiUrl + "/api/bo/system/menuUsageStatusInquiry/getUserMenuUseStatusListCount", rtTargetBaseLogRequest, new ParameterizedTypeReference<Response<Integer>>() {}).getPayload();
	}

	@Override
	public List<RtTargetBaseLogResponse> getUserMenuUseStatusList(RtTargetBaseLogRequest rtTargetBaseLogRequest) throws Exception {
		return restApiComponent.get(boApiUrl + "/api/bo/system/menuUsageStatusInquiry/getUserMenuUseStatusList", rtTargetBaseLogRequest, new ParameterizedTypeReference<Response<List<RtTargetBaseLogResponse>>>() {}).getPayload();
	}
}
