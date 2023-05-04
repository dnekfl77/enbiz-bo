package com.enbiz.bo.app.service.system;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.login.CurrentUser;
import com.enbiz.bo.app.dto.request.menu.TopMenuRequest;
import com.enbiz.bo.app.dto.request.realgrid.RealGridCUDRequest;
import com.enbiz.bo.app.dto.request.system.UserFavoriteMenuRequest;
import com.enbiz.bo.app.dto.response.menu.LeftMenuResponse;
import com.enbiz.bo.app.dto.response.system.UserFavoriteMenuResponse;
import com.enbiz.bo.app.entity.StUserFvtInfo;
import com.enbiz.common.base.Validator;
import com.enbiz.common.base.exception.MessageResolver;
import com.enbiz.common.base.rest.Response;
import com.enbiz.common.base.rest.RestApiUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
/**
 * 즐겨찾기관리 서비스 IMPL
 */
@Service
@Lazy
@Slf4j
@RequiredArgsConstructor
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class UserFavoriteMenuServiceImpl implements UserFavoriteMenuMgmtService {
	
	private final RestApiUtil restApiUtil;
	
	@Value("${app.apiUrl.bo}")
	private String boApiUrl;

	@Override
	public List<UserFavoriteMenuResponse> getUserFavoriteMenuList(UserFavoriteMenuRequest userFavoriteMenuRequest) throws Exception {
		return this.restApiUtil.get(boApiUrl+ "/api/bo/system/userFavoriteMenuMgmt/getUserFavoriteMenuList", userFavoriteMenuRequest, new ParameterizedTypeReference<Response<List<UserFavoriteMenuResponse>>>() {}).getPayload();
	}

	@Override
	public int getUserFavoriteMenuListCount(UserFavoriteMenuRequest userFavoriteMenuRequest) throws Exception {
		return this.restApiUtil.get(boApiUrl+ "/api/bo/system/userFavoriteMenuMgmt/getUserFavoriteMenuListCount", userFavoriteMenuRequest, new ParameterizedTypeReference<Response<Integer>>() {}).getPayload();
	}

	@Override
	public int checkDuplicateUserFavoriteMenu(UserFavoriteMenuRequest UserFavoriteMenuRequest) throws Exception {
		return restApiUtil.get(boApiUrl+ "/api/bo/main/main/checkDuplicateUserFavoriteMenu", UserFavoriteMenuRequest, new ParameterizedTypeReference<Response<Integer>>() {}).getPayload();
	}

	@Override
	public void registUserFavoriteMenu(UserFavoriteMenuRequest UserFavoriteMenuRequest) throws Exception {
		restApiUtil.post(boApiUrl+ "/api/bo/main/main/registUserFavoriteMenu", UserFavoriteMenuRequest, new ParameterizedTypeReference<Response<String>>() {}).getPayload();
	}


	@Override
	public void saveUserFavoriteMenu(RealGridCUDRequest<StUserFvtInfo> realGridCUD) throws Exception {
		this.restApiUtil.post(boApiUrl+ "/api/bo/system/userFavoriteMenuMgmt/saveUserFavoriteMenu", realGridCUD, new ParameterizedTypeReference<Response<String>>() {}).getPayload();
	}

	@Override
	public List<LeftMenuResponse> getFavoriteMenu(TopMenuRequest topMenuRequest) throws Exception {
		return restApiUtil.get(boApiUrl+ "/api/bo/main/main/getFavoriteMenu", topMenuRequest, new ParameterizedTypeReference<Response<List<LeftMenuResponse>>>() {}).getPayload();
	}

}
