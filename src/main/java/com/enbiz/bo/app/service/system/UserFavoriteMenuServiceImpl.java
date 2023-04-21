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
import com.enbiz.bo.app.dto.request.system.UserFavoriteMenuRequest;
import com.enbiz.bo.app.dto.response.menu.LeftMenuResponse;
import com.enbiz.bo.app.dto.response.system.UserFavoriteMenuResponse;
import com.enbiz.bo.app.entity.StUserFvtInfo;
import com.enbiz.bo.app.repository.system.StUserFvtInfoMapper;
import com.enbiz.bo.app.repository.system.StUserFvtInfoTrxMapper;
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

	private final StUserFvtInfoMapper stUserFvtInfoMapper;
	private final StUserFvtInfoTrxMapper stUserFvtInfoTrxMapper;
	
	@Value("${app.apiUrl.bo}")
	private String boApiUrl;

	@Override
	public List<UserFavoriteMenuResponse> getUserFavoriteMenuList(UserFavoriteMenuRequest userFavoriteMenuRequest) {
		return stUserFvtInfoMapper.getUserFavoriteMenuList(userFavoriteMenuRequest);
	}

	@Override
	public int getUserFavoriteMenuListCount(UserFavoriteMenuRequest userFavoriteMenuRequest) {
		return stUserFvtInfoMapper.getUserFavoriteMenuListCount(userFavoriteMenuRequest);
	}

	@Override
	public int checkDuplicateUserFavoriteMenu(UserFavoriteMenuRequest UserFavoriteMenuRequest) throws Exception {
		return restApiUtil.get(boApiUrl+ "/api/bo/main/main/checkDuplicateUserFavoriteMenu", UserFavoriteMenuRequest, new ParameterizedTypeReference<Response<Integer>>() {}).getPayload();
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
	public void registUserFavoriteMenu(UserFavoriteMenuRequest UserFavoriteMenuRequest) throws Exception {
		restApiUtil.post(boApiUrl+ "/api/bo/main/main/registUserFavoriteMenu", UserFavoriteMenuRequest, new ParameterizedTypeReference<Response<String>>() {}).getPayload();
	}

	@Override
	public void modifyUserFavoriteMenu(List<StUserFvtInfo> updateList) throws Exception {
		CurrentUser currentUser = (CurrentUser)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		for (StUserFvtInfo stUserFvtInfo : updateList) {
			stUserFvtInfo.setUserId(currentUser.getLoginId());
			Validator.throwIfEmpty(stUserFvtInfo.getUserId()       , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{"사용자ID"}));
			Validator.throwIfEmpty(stUserFvtInfo.getRtTgtSeq()     , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{"매뉴번호"}));
			Validator.throwIfEmpty(stUserFvtInfo.getSortSeq()      , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{"정렬순서"}));
			Validator.throwIfEmpty(stUserFvtInfo.getUseYn()        , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{"사용여부"}));
			stUserFvtInfoTrxMapper.updateStUserFvtInfo(stUserFvtInfo);
		}
	}

	@Override
	public void deleteUserFavoriteMenu(List<StUserFvtInfo> deleteList) throws Exception {
		CurrentUser currentUser = (CurrentUser)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		for (StUserFvtInfo stUserFvtInfo : deleteList) {
			stUserFvtInfo.setUserId(currentUser.getLoginId());
			Validator.throwIfEmpty(stUserFvtInfo.getUserId()       , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{"사용자ID"}));
			Validator.throwIfEmpty(stUserFvtInfo.getRtTgtSeq()     , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{"매뉴번호"}));
			stUserFvtInfoTrxMapper.deleteStUserFvtInfo(stUserFvtInfo);
		}
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
	public void saveUserFavoriteMenu(List<StUserFvtInfo> updateList, List<StUserFvtInfo> deleteList) throws Exception {
		modifyUserFavoriteMenu(updateList);
		deleteUserFavoriteMenu(deleteList);
	}

	@Override
	public List<LeftMenuResponse> getFavoriteMenu(TopMenuRequest topMenuRequest) throws Exception {
		return restApiUtil.get(boApiUrl+ "/api/bo/main/main/getFavoriteMenu", topMenuRequest, new ParameterizedTypeReference<Response<List<LeftMenuResponse>>>() {}).getPayload();
	}

}
