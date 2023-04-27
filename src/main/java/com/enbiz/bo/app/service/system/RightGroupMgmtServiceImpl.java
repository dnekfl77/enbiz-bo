package com.enbiz.bo.app.service.system;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.request.realgrid.RealGridCUDRequest;
import com.enbiz.bo.app.dto.request.system.RightGroupBaseRequest;
import com.enbiz.bo.app.dto.request.system.RightTargetBaseMenuRequest;
import com.enbiz.bo.app.dto.response.system.RightGroupBaseResponse;
import com.enbiz.bo.app.dto.response.system.RightTargetBaseMenuResponse;
import com.enbiz.common.base.rest.Response;
import com.enbiz.common.base.rest.RestApiUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
@Service
@Lazy
@Slf4j
@RequiredArgsConstructor
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class RightGroupMgmtServiceImpl implements RightGroupMgmtService {

	private final RestApiUtil restApiUtil;

	@Value("${app.apiUrl.bo}")
	private String boApiUrl;
	

	@Override
	public List<RightGroupBaseResponse> getRightGroupBaseList(RightGroupBaseRequest RightGroupBaseRequest) throws Exception {
		return restApiUtil.get(boApiUrl+ "/api/bo/system/rightGroupMgmt/getRightGroupBaseList", RightGroupBaseRequest, new ParameterizedTypeReference<Response<List<RightGroupBaseResponse>>>() {}).getPayload();
	}

	@Override
	public int getRightGroupBaseListCount(RightGroupBaseRequest RightGroupBaseRequest) throws Exception {
		return restApiUtil.get(boApiUrl+ "/api/bo/system/rightGroupMgmt/getRightGroupBaseListCount", RightGroupBaseRequest, new ParameterizedTypeReference<Response<Integer>>() {}).getPayload();
	}

	@Override
	public void saveRightGroupBaseList(RealGridCUDRequest<RightGroupBaseRequest> realGridCUD) throws Exception {
		restApiUtil.post(boApiUrl+ "/api/bo/system/rightGroupMgmt/saveRightGroupBaseList", realGridCUD, new ParameterizedTypeReference<Response<String>>() {}).getPayload();
	}

	@Override
	public List<RightTargetBaseMenuResponse> getRightTargetBaseMenuList(RightTargetBaseMenuRequest stRtTgtMenuRequest) throws Exception {
		return restApiUtil.get(boApiUrl+ "/api/bo/system/rightGroupMgmt/getRightTargetBaseMenuList", stRtTgtMenuRequest, new ParameterizedTypeReference<Response<List<RightTargetBaseMenuResponse>>>() {}).getPayload();
	}

	@Override
	public int getRightTargetBaseMenuListCount(RightTargetBaseMenuRequest stRtTgtMenuRequest) throws Exception {
		return restApiUtil.get(boApiUrl+ "/api/bo/system/rightGroupMgmt/getRightTargetBaseMenuListCount", stRtTgtMenuRequest, new ParameterizedTypeReference<Response<Integer>>() {}).getPayload();
	}

	@Override
	public void saveRightTargetBaseMenu(List<RightTargetBaseMenuRequest> updateList) throws Exception {
		restApiUtil.post(boApiUrl+ "/api/bo/system/rightGroupMgmt/saveRightTargetBaseMenu", updateList, new ParameterizedTypeReference<Response<String>>() {}).getPayload();
	}

	@Override
	public List<RightTargetBaseMenuResponse> getRightGroupButtonList(RightTargetBaseMenuRequest stRtTgtMenuRequest) throws Exception {
		return restApiUtil.get(boApiUrl+ "/api/bo/system/rightGroupMgmt/getRightGroupButtonList", stRtTgtMenuRequest, new ParameterizedTypeReference<Response<List<RightTargetBaseMenuResponse>>>() {}).getPayload();
	}

	@Override
	public int getRightGroupButtonListCount(RightTargetBaseMenuRequest stRtTgtMenuRequest) throws Exception {
		return restApiUtil.get(boApiUrl+ "/api/bo/system/rightGroupMgmt/getRightGroupButtonListCount", stRtTgtMenuRequest, new ParameterizedTypeReference<Response<Integer>>() {}).getPayload();
	}
}
