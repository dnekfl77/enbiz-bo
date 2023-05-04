package com.enbiz.bo.app.service.system;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.request.system.LoginLogRequest;
import com.enbiz.bo.app.dto.response.system.LoginLogResponse;
import com.enbiz.common.base.rest.Response;
import com.enbiz.common.base.rest.RestApiUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
/**
 * 사용자 접속 이력 조회 service
 */
@Service
@Lazy
@Slf4j
@RequiredArgsConstructor
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class UserAccessHistoryInquiryServiceImpl implements UserAccessHistoryInquiryService {

	private final RestApiUtil restApiUtil;

	@Value("${app.apiUrl.bo}")
	private String boApiUrl;

	@Override
	public int getLastLoginInfoListCount(LoginLogRequest stlogLoginLogRequest) throws Exception {
		return restApiUtil.get(boApiUrl + "/api/bo/system/userAccessHistoryInquiry/getLastLoginInfoListCount", stlogLoginLogRequest, new ParameterizedTypeReference<Response<Integer>>() {}).getPayload();
	}

	@Override
	public List<LoginLogResponse> getLastLoginInfoList(LoginLogRequest stlogLoginLogRequest) throws Exception {
		return restApiUtil.get(boApiUrl + "/api/bo/system/userAccessHistoryInquiry/getLastLoginInfoList", stlogLoginLogRequest, new ParameterizedTypeReference<Response<List<LoginLogResponse>>>() {}).getPayload();
	}

	@Override
	public int getDetailLoginHistoryListCount(LoginLogRequest stlogLoginLogRequest) throws Exception {
		return restApiUtil.get(boApiUrl + "/api/bo/system/userAccessHistoryInquiry/getDetailLoginHistoryListCount", stlogLoginLogRequest, new ParameterizedTypeReference<Response<Integer>>() {}).getPayload();
	}

	@Override
	public List<LoginLogResponse> getDetailLoginHistoryList(LoginLogRequest stlogLoginLogRequest) throws Exception {
		return restApiUtil.get(boApiUrl + "/api/bo/system/userAccessHistoryInquiry/getDetailLoginHistoryList", stlogLoginLogRequest, new ParameterizedTypeReference<Response<List<LoginLogResponse>>>() {}).getPayload();
	}
}
