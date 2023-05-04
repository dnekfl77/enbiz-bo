package com.enbiz.bo.app.service.system;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.request.system.RtTargetBaseLogRequest;
import com.enbiz.bo.app.dto.response.system.RtTargetBaseLogResponse;
import com.enbiz.common.base.rest.Response;
import com.enbiz.common.base.rest.RestApiUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 메뉴별 사용 현황 조회 service
 */
@Service
@Lazy
@Slf4j
@RequiredArgsConstructor
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class MenuUsageStatusInquiryServiceImpl implements MenuUsageStatusInquiryService {
	private final RestApiUtil restApiUtil;
	
	@Value("${app.apiUrl.bo}")
	private String boApiUrl;

	@Override
	public int getMenuUseStatusListCount(RtTargetBaseLogRequest RtTargetBaseLogRequest) throws Exception {
		return restApiUtil.get(boApiUrl + "/api/bo/system/menuUsageStatusInquiry/getMenuUseStatusListCount", RtTargetBaseLogRequest, new ParameterizedTypeReference<Response<Integer>>() {}).getPayload();
	}

	@Override
	public List<RtTargetBaseLogResponse> getMenuUseStatusList(RtTargetBaseLogRequest RtTargetBaseLogRequest) throws Exception {
		return restApiUtil.get(boApiUrl + "/api/bo/system/menuUsageStatusInquiry/getMenuUseStatusList", RtTargetBaseLogRequest, new ParameterizedTypeReference<Response<List<RtTargetBaseLogResponse>>>() {}).getPayload();
	}

	@Override
	public int getUserMenuUseStatusListCount(RtTargetBaseLogRequest RtTargetBaseLogRequest) throws Exception {
		return restApiUtil.get(boApiUrl + "/api/bo/system/menuUsageStatusInquiry/getUserMenuUseStatusListCount", RtTargetBaseLogRequest, new ParameterizedTypeReference<Response<Integer>>() {}).getPayload();
	}

	@Override
	public List<RtTargetBaseLogResponse> getUserMenuUseStatusList(RtTargetBaseLogRequest RtTargetBaseLogRequest) throws Exception {
		return restApiUtil.get(boApiUrl + "/api/bo/system/menuUsageStatusInquiry/getUserMenuUseStatusList", RtTargetBaseLogRequest, new ParameterizedTypeReference<Response<List<RtTargetBaseLogResponse>>>() {}).getPayload();
	}  
}
