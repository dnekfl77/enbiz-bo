package com.enbiz.bo.app.service.system;

import java.util.Collections;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.login.CurrentUser;
import com.enbiz.bo.app.dto.request.system.UserDetailRequest;
import com.enbiz.bo.app.dto.request.system.UserListRequest;
import com.enbiz.bo.app.dto.request.system.UserRightGroupRequest;
import com.enbiz.bo.app.dto.response.system.UserDetailResponse;
import com.enbiz.bo.app.dto.response.system.UserListResponse;
import com.enbiz.bo.app.dto.response.system.UserMenuRtInfoResponse;
import com.enbiz.bo.app.dto.response.system.UserRightGroupResponse;
import com.enbiz.bo.app.entity.StRtInfo;
import com.enbiz.bo.app.entity.StUserBase;
import com.enbiz.common.base.constant.BaseConstants;
import com.enbiz.common.base.rest.Response;
import com.enbiz.common.base.rest.RestApiUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Lazy
@Slf4j
@RequiredArgsConstructor
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class UserMgmtServiceImpl implements UserMgmtService{

	private final RestApiUtil restApiUtil;
    private final StUserChgLogService stUserChgLogService;
    
	@Value("${app.apiUrl.bo}")
	private String boApiUrl;
    
    @Autowired
	private PasswordEncoder passwordEncoder;

    /**
     * 사용자메뉴 검색 조건에 부합하는 사용자 목록 수 조회
     * @param userListRequest
     * @return 사용자 목록
     */
    @Override
    public int getUserListInUserMenuCount(UserListRequest userListRequest) throws Exception {
    	return restApiUtil.get(boApiUrl+ "/api/bo/system/userMgmt/getUserListInUserMenuCount", userListRequest, new ParameterizedTypeReference<Response<Integer>>() {}).getPayload();    	
    }

    /**
     * 사용자메뉴 검색 조건에 부합하는 사용자 목록 조회
     * @param userListRequest
     * @return 사용자 목록
     */
    @Override
    public List<UserListResponse> getUserListInUserMenu(UserListRequest userListRequest) throws Exception  {
    	return restApiUtil.get(boApiUrl+ "/api/bo/system/userMgmt/getUserListInUserMenu", userListRequest, new ParameterizedTypeReference<Response<List<UserListResponse>>>() {}).getPayload();
    }

    @Override
    public UserDetailResponse getUserDetail(String userId) throws Exception {
        return restApiUtil.get(boApiUrl+ "/api/bo/system/userMgmt/getUserDetail", Collections.singletonMap("userId", userId), new ParameterizedTypeReference<Response<UserDetailResponse>>() {}).getPayload();
    }

    @Override
    public int getUserCount(String userId) throws Exception {
        //return userMapper.getUserCount(userId);
    	return restApiUtil.get(boApiUrl+ "/api/bo/system/userMgmt/getUserCount", Collections.singletonMap("userId", userId), new ParameterizedTypeReference<Response<Integer>>() {}).getPayload();
    }

    @Override
    //@Transactional(rollbackFor = Exception.class)
    public UserDetailResponse unlockPassword(String userId) throws Exception {
        StUserBase param = new StUserBase();
        param.setUserId(userId);
        param.setPwdLockYn(BaseConstants.N);
        param.setPwdCntnFailCnt(0L);
        restApiUtil.get(boApiUrl+ "/api/bo/system/userMgmt/modifyUpdatePwdUnlock", param, new ParameterizedTypeReference<Response<String>>() {}).getPayload();
        return getUserDetail(userId);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public UserDetailResponse initializePassword(String userId) throws Exception {
        
        return restApiUtil.post(boApiUrl+ "/api/bo/system/userMgmt/modifyInitializePassword", userId, new ParameterizedTypeReference<Response<UserDetailResponse>>() {}).getPayload();
    }

    private StUserBase makeInitPasswdParam(String userId, String encryptedPasswd) {
    	CurrentUser currentUser = (CurrentUser)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String sessionId = currentUser.getLoginId();
        StUserBase userBase = new StUserBase();
        userBase.setUserId(userId);
        userBase.setPwd(encryptedPasswd);
        userBase.setPwdIniYn(BaseConstants.Y);
        userBase.setSysModId(sessionId);
        userBase.setPwdLockYn(BaseConstants.N);
        userBase.setPwdCntnFailCnt(0L);
        return userBase;
    }

    @Override
    public List<UserMenuRtInfoResponse> getUserMenuRtInfoList(String userId) throws Exception {
    	return restApiUtil.get(boApiUrl+ "/api/bo/system/userMgmt/getUserMenuRtInfoList", userId, new ParameterizedTypeReference<Response<List<UserMenuRtInfoResponse>>>() {}).getPayload();
    }

    @Override
    public UserDetailResponse saveUser(UserDetailRequest request) throws Exception{
        return restApiUtil.post(boApiUrl+ "/api/bo/system/userMgmt/saveUser", request, new ParameterizedTypeReference<Response<UserDetailResponse>>() {}).getPayload();
    }

    @Override
    public List<UserRightGroupResponse> getUserRightGroupInfo(UserRightGroupRequest UserRightGroupRequest) throws Exception {
    	return restApiUtil.get(boApiUrl+ "/api/bo/system/userMgmt/getUserRightGroupInfo", UserRightGroupRequest, new ParameterizedTypeReference<Response<List<UserRightGroupResponse>>>() {}).getPayload();
    }

    @Override
    public int getUserRightGroupListCount(UserRightGroupRequest request) throws Exception  {
    	return restApiUtil.get(boApiUrl+ "/api/bo/system/userMgmt/getUserRightGroupListCount", request, new ParameterizedTypeReference<Response<Integer>>() {}).getPayload();
    }

    public String createRandomPasswd() {
        ThreadLocalRandom rnd =ThreadLocalRandom.current();
        StringBuffer rdStr =new StringBuffer();
        String[] chars = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z".split(",");
        for (int i=0;i<5;i++){
            rdStr.append(chars[rnd.nextInt(chars.length)]);
        }
        rdStr.append(rnd.nextInt(10));
        rdStr.append(rnd.nextInt(10));
        rdStr.append(rnd.nextInt(10));
        String[] spChars = "!,@,#,$".split(",");
        for (int i=0;i<2;i++){
            rdStr.append(spChars[rnd.nextInt(spChars.length)]);
        }
        return rdStr.toString();
    }
}
