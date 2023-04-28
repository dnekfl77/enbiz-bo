package com.enbiz.bo.app.service.system;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.request.realgrid.RealGridCUDRequest;
import com.enbiz.bo.app.dto.request.system.GroupCodeRequest;
import com.enbiz.bo.app.dto.request.system.StandardCodeMlRequest;
import com.enbiz.bo.app.dto.request.system.StandardCodeRequest;
import com.enbiz.bo.app.dto.response.system.GroupCodeResponse;
import com.enbiz.bo.app.dto.response.system.StandardCodeMlResponse;
import com.enbiz.bo.app.dto.response.system.StandardCodeResponse;
import com.enbiz.common.base.rest.Response;
import com.enbiz.common.base.rest.RestApiUtil;

import lombok.RequiredArgsConstructor;

@Service
@Lazy
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
@RequiredArgsConstructor
public class CommonCodeMgmtServiceImpl implements CommonCodeMgmtService {
	private final RestApiUtil restApiUtil;

	@Value("${app.apiUrl.bo}")
	private String boApiUrl;

	@Override
	public List<GroupCodeResponse> getGroupCodeList(GroupCodeRequest groupCodeRequest) throws Exception {
    	return restApiUtil.get(boApiUrl+ "/api/bo/system/commonCodeMgmt/getGroupCodeList", groupCodeRequest, new ParameterizedTypeReference<Response<List<GroupCodeResponse>>>() {}).getPayload();
	}

	@Override
	public int getGroupCodeListCount(GroupCodeRequest groupCodeRequest) throws Exception {
    	return restApiUtil.get(boApiUrl+ "/api/bo/system/commonCodeMgmt/getGroupCodeListCount", groupCodeRequest, new ParameterizedTypeReference<Response<Integer>>() {}).getPayload();
	}
	
	@Override
	public void saveGroupCode(RealGridCUDRequest<GroupCodeRequest> realGridCUD) throws Exception {
    	restApiUtil.post(boApiUrl+ "/api/bo/system/commonCodeMgmt/saveGroupCode", realGridCUD, new ParameterizedTypeReference<Response<String>>() {}).getPayload();
	}

	@Override
	public List<StandardCodeResponse> getStandardCodeList(StandardCodeRequest standardCodeRequest) throws Exception {
		return restApiUtil.get(boApiUrl+ "/api/bo/system/commonCodeMgmt/getStandardCodeList", standardCodeRequest, new ParameterizedTypeReference<Response<List<StandardCodeResponse>>>() {}).getPayload();
	}

	@Override
	public int getStandardCodeListCount(StandardCodeRequest standardCodeRequest) throws Exception {
		return restApiUtil.get(boApiUrl+ "/api/bo/system/commonCodeMgmt/getStandardCodeListCount", standardCodeRequest, new ParameterizedTypeReference<Response<Integer>>() {}).getPayload();
	}

	@Override
	public void saveStandardCode(RealGridCUDRequest<StandardCodeRequest> realGridCUD) throws Exception {
		restApiUtil.post(boApiUrl+ "/api/bo/system/commonCodeMgmt/saveStandardCode", realGridCUD, new ParameterizedTypeReference<Response<String>>() {}).getPayload();
	}
	
	@Override
	public List<StandardCodeMlResponse> getStandardCodeMlList(StandardCodeMlRequest standardCodeMlRequest) throws Exception {
		return restApiUtil.post(boApiUrl+ "/api/bo/system/commonCodeMgmt/getStandardCodeMlList", standardCodeMlRequest, new ParameterizedTypeReference<Response<List<StandardCodeMlResponse>>>() {}).getPayload();
	}

	@Override
	public int getStandardCodeMlListCount(StandardCodeMlRequest standardCodeMlRequest) throws Exception {
		return restApiUtil.post(boApiUrl+ "/api/bo/system/commonCodeMgmt/getStandardCodeMlListCount", standardCodeMlRequest, new ParameterizedTypeReference<Response<Integer>>() {}).getPayload();
	}
	
	@Override
	public void saveStandardCodeMl(RealGridCUDRequest<StandardCodeMlRequest> realGridCUD) throws Exception {
		restApiUtil.post(boApiUrl+ "/api/bo/system/commonCodeMgmt/saveStandardCodeMl", realGridCUD, new ParameterizedTypeReference<Response<String>>() {}).getPayload();
	}
}
