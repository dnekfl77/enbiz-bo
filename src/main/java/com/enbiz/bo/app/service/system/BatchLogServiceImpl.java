package com.enbiz.bo.app.service.system;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.request.system.StBatchLogRequest;
import com.enbiz.bo.app.dto.response.system.StBatchLogResponse;
import com.enbiz.common.base.rest.Response;
import com.enbiz.common.base.rest.RestApiUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Lazy
@Slf4j
@RequiredArgsConstructor
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class BatchLogServiceImpl implements BatchLogService {
	
	private final RestApiUtil restApiUtil;
	
	@Value("${app.apiUrl.bo}")
	private String boApiUrl;
	
	/**
	 * 배치로그 검색 조건에 부합하는 배치로그 목록 수 조회
	 * @param StBatchLogRequest
	 * @return 배치 목록
	 * @throws Exception 
	 */
	@Override
	public int getBatchLogListCount(StBatchLogRequest stBatchLogRequest) throws Exception {
		return restApiUtil.get(boApiUrl + "/api/bo/system/batchLog/getBatchLogListCount", stBatchLogRequest, new ParameterizedTypeReference<Response<Integer>>() {}).getPayload();
	}
	
	/**
	 * 배치로그 검색 조건에 부합하는 배치로그 목록 조회
	 * @param StMgrBatchBaseRequest
	 * @return StMgrBatchBaseResponse list
	 * @throws Exception 
	 */
	@Override
	public List<StBatchLogResponse> getBatchLogList(StBatchLogRequest stBatchLogRequest) throws Exception {
		return restApiUtil.get(boApiUrl + "/api/bo/system/batchLog/getBatchLogList", stBatchLogRequest, new ParameterizedTypeReference<Response<List<StBatchLogResponse>>>() {}).getPayload();
	}
}