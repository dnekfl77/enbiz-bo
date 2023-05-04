package com.enbiz.bo.app.service.system;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.request.realgrid.RealGridCUDRequest;
import com.enbiz.bo.app.dto.request.system.UserDeptRequest;
import com.enbiz.bo.app.dto.response.system.UserDeptResponse;
import com.enbiz.common.base.rest.Response;
import com.enbiz.common.base.rest.RestApiUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Lazy
@Slf4j
@RequiredArgsConstructor
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class UserDeptMgmtServiceImpl implements UserDeptMgmtService{

	private final RestApiUtil restApiUtil;

	@Value("${app.apiUrl.bo}")
	private String boApiUrl;
    
    /**
     * 부서 계층구조 목록 조회
     */
    @Override
    public List<UserDeptResponse> getUserDeptListWithHierarchy() throws Exception {
    	return restApiUtil.get(boApiUrl+ "/api/bo/system/userDeptMgmt/getUserDeptListWithHierarchy", null, new ParameterizedTypeReference<Response<List<UserDeptResponse>>>() {}).getPayload();
    }

    /**
     * 부서 목록 수 조회
     */
    @Override
    public int getUserDeptListCount(UserDeptRequest request) throws Exception {
    	return restApiUtil.get(boApiUrl+ "/api/bo/system/userDeptMgmt/getUserDeptListCount", request, new ParameterizedTypeReference<Response<Integer>>() {}).getPayload();
    }

    /**
     * 부서 목록 조회
     */
    @Override
    public List<UserDeptResponse> getUserDeptList(UserDeptRequest request) throws Exception {
    	return restApiUtil.get(boApiUrl+ "/api/bo/system/userDeptMgmt/getUserDeptList", request, new ParameterizedTypeReference<Response<List<UserDeptResponse>>>() {}).getPayload();
    }
    /**
     * 부서 목록 저장
     */
    @Override
    public void saveUserDeptList(RealGridCUDRequest<UserDeptRequest> realGridCUD) throws Exception {
    	restApiUtil.post(boApiUrl+ "/api/bo/system/userDeptMgmt/saveUserDeptList", realGridCUD, new ParameterizedTypeReference<Response<String>>() {}).getPayload();
    }
}
