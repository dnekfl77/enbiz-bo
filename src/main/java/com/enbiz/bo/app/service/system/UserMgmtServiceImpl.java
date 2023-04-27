package com.enbiz.bo.app.service.system;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.request.system.UserCudRequest;
import com.enbiz.bo.app.dto.request.system.UserDetailRequest;
import com.enbiz.bo.app.dto.request.system.UserListRequest;
import com.enbiz.bo.app.dto.response.system.UserDetailResponse;
import com.enbiz.bo.app.dto.response.system.UserListResponse;
import com.enbiz.bo.app.entity.StUserBase;
import com.enbiz.common.base.Validator;
import com.enbiz.common.base.exception.MessageResolver;
import com.enbiz.common.base.rest.Response;
import com.enbiz.common.base.rest.RestApiComponent;

import lombok.RequiredArgsConstructor;

@Service
@Lazy
@RequiredArgsConstructor
public class UserMgmtServiceImpl implements UserMgmtService{

	private final RestApiComponent restApiComponent;

	@Value("${app.apiUrl.bo}")
	private String boApiUrl;

    /**
     * 사용자메뉴 검색 조건에 부합하는 사용자 목록 수 조회
     * @param userListRequest
     * @return 사용자 목록
     */
    @Override
    public int getUserListInUserMenuCount(UserListRequest userListRequest) {
		return restApiComponent.get(boApiUrl + "/api/bo/system/userMgmt/getUserListInUserMenuCount", userListRequest, new ParameterizedTypeReference<Response<Integer>>() {}).getPayload();
    }

    /**
     * 사용자메뉴 검색 조건에 부합하는 사용자 목록 조회
     * @param userListRequest
     * @return 사용자 목록
     */
    @Override
    public List<UserListResponse> getUserListInUserMenu(UserListRequest userListRequest) {
		return restApiComponent.get(boApiUrl + "/api/bo/system/userMgmt/getUserListInUserMenu", userListRequest, new ParameterizedTypeReference<Response<List<UserListResponse>>>() {}).getPayload();
    }

    @Override
    public UserDetailResponse getUserDetail(String userId) {
		return restApiComponent.get(boApiUrl + "/api/bo/system/userMgmt/getUserDetail", new StUserBase().setUserId(userId), new ParameterizedTypeReference<Response<UserDetailResponse>>() {}).getPayload();
    }

    @Override
    public int getUserCount(String userId) {
		return restApiComponent.get(boApiUrl + "/api/bo/system/userMgmt/getUserCount", new StUserBase().setUserId(userId), new ParameterizedTypeReference<Response<Integer>>() {}).getPayload();
    }

    @Override
    public UserDetailResponse unlockPassword(String userId) throws Exception {
		return restApiComponent.get(boApiUrl + "/api/bo/system/userMgmt/unlockPassword", new StUserBase().setUserId(userId), new ParameterizedTypeReference<Response<UserDetailResponse>>() {}).getPayload();
    }

    @Override
    public UserDetailResponse initializePassword(String userId) throws Exception {
		return restApiComponent.post(boApiUrl + "/api/bo/system/userMgmt/initializePassword", new StUserBase().setUserId(userId), new ParameterizedTypeReference<Response<UserDetailResponse>>() {}).getPayload();
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public UserDetailResponse saveUser(UserDetailRequest request) throws Exception{
//    	CurrentUser currentUser = (CurrentUser)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        String sessionId = currentUser.getLoginId();
        UserCudRequest userInfoReq = request.getUserInfo();

        Validator.throwIfEmpty(userInfoReq.getUserId(), MessageResolver.getMessage("userMgmt.err.msg.noParameterError", new String[] {"userId"}));
        Validator.throwIfEmpty(userInfoReq.getUserNm(), MessageResolver.getMessage("userMgmt.err.msg.noParameterError", new String[] {"userNm"}));
        Validator.throwIfEmpty(userInfoReq.getCellTxnoNo(), MessageResolver.getMessage("userMgmt.err.msg.noParameterError", new String[] {"cellTxnoNo"}));
        Validator.throwIfEmpty(userInfoReq.getCellEndNo(), MessageResolver.getMessage("userMgmt.err.msg.noParameterError", new String[] {"cellEndNo"}));
        Validator.throwIfEmpty(userInfoReq.getRtGrpNo(), MessageResolver.getMessage("userMgmt.err.msg.noParameterError", new String[] {"rtGrpNo"}));
        Validator.throwIfEmpty(userInfoReq.getEmailAddr(), MessageResolver.getMessage("userMgmt.err.msg.noParameterError", new String[] {"emailAddr"}));
        Validator.throwIfEmpty(userInfoReq.getJobGrpCd(), MessageResolver.getMessage("userMgmt.err.msg.noParameterError", new String[] {"jobGrpCd"}));
        Validator.throwIfEmpty(userInfoReq.getOcpCd(), MessageResolver.getMessage("userMgmt.err.msg.noParameterError", new String[] {"ocpCd"}));
        Validator.throwIfEmpty(userInfoReq.getWorkStatCd(), MessageResolver.getMessage("userMgmt.err.msg.noParameterError", new String[] {"workStatCd"}));

		return restApiComponent.post(boApiUrl + "/api/bo/system/userMgmt/saveUser", userInfoReq, new ParameterizedTypeReference<Response<UserDetailResponse>>() {}).getPayload();
    }
}
