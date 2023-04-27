package com.enbiz.bo.app.service.system;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;

import com.enbiz.bo.app.dto.request.realgrid.RealGridCUDRequest;
import com.enbiz.bo.app.dto.request.system.GroupCodeRequest;
import com.enbiz.bo.app.dto.request.system.StandardCodeRequest;
import com.enbiz.bo.app.dto.response.system.GroupCodeResponse;
import com.enbiz.bo.app.dto.response.system.StandardCodeResponse;
import com.enbiz.common.base.rest.Response;
import com.enbiz.common.base.rest.RestApiComponent;

import lombok.RequiredArgsConstructor;

@Service
@Lazy
@RequiredArgsConstructor
public class CommonCodeMgmtServiceImpl implements CommonCodeMgmtService {

	private final RestApiComponent restApiComponent;

	@Value("${app.apiUrl.bo}")
	private String boApiUrl;

	@Override
	public List<GroupCodeResponse> getGroupCodeList(GroupCodeRequest groupCodeRequest) throws Exception {
    	return restApiComponent.get(boApiUrl+ "/api/bo/system/commonCodeMgmt/getGroupCodeList", groupCodeRequest, new ParameterizedTypeReference<Response<List<GroupCodeResponse>>>() {}).getPayload();
	}

	@Override
	public int getGroupCodeListCount(GroupCodeRequest groupCodeRequest) throws Exception {
    	return restApiComponent.get(boApiUrl+ "/api/bo/system/commonCodeMgmt/getGroupCodeListCount", groupCodeRequest, new ParameterizedTypeReference<Response<Integer>>() {}).getPayload();
	}

	@Override
	public List<StandardCodeResponse> getStandardCodeList(StandardCodeRequest standardCodeRequest) {
    	return restApiComponent.get(boApiUrl+ "/api/bo/system/commonCodeMgmt/getStandardCodeList", standardCodeRequest, new ParameterizedTypeReference<Response<List<StandardCodeResponse>>>() {}).getPayload();
	}

	@Override
	public int getStandardCodeListCount(StandardCodeRequest standardCodeRequest) {
    	return restApiComponent.get(boApiUrl+ "/api/bo/system/commonCodeMgmt/getStandardCodeListCount", standardCodeRequest, new ParameterizedTypeReference<Response<Integer>>() {}).getPayload();
	}

	@Override
	public void saveGroupCode(RealGridCUDRequest<GroupCodeRequest> realGridCUD) throws Exception {
    	restApiComponent.post(boApiUrl+ "/api/bo/system/commonCodeMgmt/saveGroupCode", realGridCUD, new ParameterizedTypeReference<Response<String>>() {}).getPayload();
	}

	@Override
	public void registGroupCode(List<GroupCodeRequest> createList) throws Exception {
    	restApiComponent.post(boApiUrl+ "/api/bo/system/commonCodeMgmt/registGroupCode", createList, new ParameterizedTypeReference<Response<Integer>>() {}).getPayload();
	}

	@Override
	public void modifyGroupCode(List<GroupCodeRequest> updateList) throws Exception {
    	restApiComponent.post(boApiUrl+ "/api/bo/system/commonCodeMgmt/modifyGroupCode", updateList, new ParameterizedTypeReference<Response<Integer>>() {}).getPayload();
	}

	@Override
	public void registStandardCode(List<StandardCodeRequest> createList) throws Exception {
    	restApiComponent.post(boApiUrl+ "/api/bo/system/commonCodeMgmt/registStandardCode", createList, new ParameterizedTypeReference<Response<Integer>>() {}).getPayload();
	}

	@Override
	public void modifyStandardCode(List<StandardCodeRequest> updateList) throws Exception {
    	restApiComponent.post(boApiUrl+ "/api/bo/system/commonCodeMgmt/modifyStandardCode", updateList, new ParameterizedTypeReference<Response<Integer>>() {}).getPayload();
	}

	@Override
	public void saveStandardCode(List<StandardCodeRequest> createList, List<StandardCodeRequest> updateList) throws Exception {
		registStandardCode(createList);
		modifyStandardCode(updateList);
	}


}
