package com.enbiz.bo.app.service.system;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.request.realgrid.RealGridCUDRequest;
import com.enbiz.bo.app.dto.request.system.IndividualRtInfoRequest;
import com.enbiz.bo.app.dto.request.system.RtTargetBaseRequest;
import com.enbiz.bo.app.dto.response.system.IndividualRtInfoResponse;
import com.enbiz.bo.app.dto.response.system.RtTargetBaseResponse;
import com.enbiz.bo.app.entity.StIndivRtBaseInfo;
import com.enbiz.bo.app.entity.StRtInfo;
import com.enbiz.common.base.rest.Response;
import com.enbiz.common.base.rest.RestApiUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 개별 권한 관리 서비스 IMPL
 */
@Service
@Lazy
@Slf4j
@RequiredArgsConstructor
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class IndividualRightMgmtServiceImpl implements IndividualRightMgmtService {
	private final RestApiUtil restApiUtil;

	@Value("${app.apiUrl.bo}")
	private String boApiUrl;
	
	@Override
	public List<IndividualRtInfoResponse> getIndividualRightList(IndividualRtInfoRequest individualRtInfoRequest) throws Exception {
    	//return restApiUtil.get(boApiUrl + "/api/bo/system/individualRightMgmt/getIndividualRightList", individualRtInfoRequest, new ParameterizedTypeReference<Response<List<IndividualRtInfoResponse>>>() {}).getPayload();
		return restApiUtil.post(boApiUrl + "/api/bo/system/individualRightMgmt/getIndividualRightList", individualRtInfoRequest, new ParameterizedTypeReference<Response<List<IndividualRtInfoResponse>>>() {}).getPayload();
    }
	
	@Override
    public int getIndividualRightListCount(IndividualRtInfoRequest individualRtInfoRequest) throws Exception {
    	return restApiUtil.get(boApiUrl + "/api/bo/system/individualRightMgmt/getIndividualRightListCount", individualRtInfoRequest, new ParameterizedTypeReference<Response<Integer>>() {}).getPayload();
    }
	
	@Override
	public List<RtTargetBaseResponse> getIndividualMenuTreeList(RtTargetBaseRequest rtTargetBaseRequest) throws Exception {
		return this.restApiUtil.get(boApiUrl+ "/api/bo/system/individualRightMgmt/getIndividualMenuTreeList", rtTargetBaseRequest, new ParameterizedTypeReference<Response<List<RtTargetBaseResponse>>>() {}).getPayload();
	}
	
	@Override
	public void saveIndividualRightList(RealGridCUDRequest<StIndivRtBaseInfo> realGridCUD) throws Exception {
		restApiUtil.post(boApiUrl + "/api/bo/system/individualRightMgmt/saveIndividualRightList", realGridCUD, new ParameterizedTypeReference<Response<String>>() {}).getPayload();
	}
	
	@Override
	public void saveIndividualRightButtonGridList(RealGridCUDRequest<StRtInfo> realGridCUD) throws Exception {
		restApiUtil.post(boApiUrl + "/api/bo/system/individualRightMgmt/saveIndividualRightButtonGridList", realGridCUD, new ParameterizedTypeReference<Response<String>>() {}).getPayload();
	}
}