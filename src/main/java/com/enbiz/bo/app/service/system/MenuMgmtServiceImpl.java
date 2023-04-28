package com.enbiz.bo.app.service.system;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.request.realgrid.RealGridCUDRequest;
import com.enbiz.bo.app.dto.request.system.RtTargetBaseCudRequest;
import com.enbiz.bo.app.dto.request.system.RtTargetBaseRequest;
import com.enbiz.bo.app.dto.response.system.RtTargetBaseResponse;
import com.enbiz.bo.app.entity.StRtTgtBase;
import com.enbiz.common.base.Validator;
import com.enbiz.common.base.exception.MessageResolver;
import com.enbiz.common.base.rest.Response;
import com.enbiz.common.base.rest.RestApiUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
/**
 * 메뉴관리 서비스 IMPL
 */
@Service
@Lazy
@Slf4j
@RequiredArgsConstructor
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class MenuMgmtServiceImpl implements MenuMgmtService{
	private final RestApiUtil restApiUtil;
	@Value("${app.apiUrl.bo}")
	private String boApiUrl;

    @Override
    public List<RtTargetBaseResponse> getMenuMgmtTreeList(RtTargetBaseRequest RtTargetBaseRequest) throws Exception {
        Validator.throwIfEmpty(RtTargetBaseRequest.getSysGbCd()        , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{"시스템구분코드"}));
        return this.restApiUtil.get(boApiUrl+ "/api/bo/system/menuMgmt/getMenuMgmtTreeList", RtTargetBaseRequest, new ParameterizedTypeReference<Response<List<RtTargetBaseResponse>>>() {}).getPayload();
    }

    @Override
    public RtTargetBaseResponse getMenuInfo(RtTargetBaseRequest RtTargetBaseRequest) throws Exception {
        return this.restApiUtil.get(boApiUrl+ "/api/bo/system/menuMgmt/getMenuInfo", RtTargetBaseRequest, new ParameterizedTypeReference<Response<RtTargetBaseResponse>>() {}).getPayload();
    }

    @Override
    public int getSubMenuListCount(RtTargetBaseRequest RtTargetBaseRequest) throws Exception {
        return this.restApiUtil.get(boApiUrl+ "/api/bo/system/menuMgmt/getSubMenuListCount", RtTargetBaseRequest, new ParameterizedTypeReference<Response<Integer>>() {}).getPayload();
    }

    @Override
    public List<RtTargetBaseResponse> getSubMenuList(RtTargetBaseRequest RtTargetBaseRequest) throws Exception {
        return this.restApiUtil.get(boApiUrl+ "/api/bo/system/menuMgmt/getSubMenuList", RtTargetBaseRequest, new ParameterizedTypeReference<Response<List<RtTargetBaseResponse>>>() {}).getPayload();
    }

    @Override
    public void registMenuInfo(RtTargetBaseCudRequest RtTargetBaseCudRequest) throws Exception {
        this.restApiUtil.post(boApiUrl+ "/api/bo/system/menuMgmt/registMenuInfo", RtTargetBaseCudRequest, new ParameterizedTypeReference<Response<String>>() {}).getPayload();
    }

    @Override
    public void modifyMenuInfo(RtTargetBaseCudRequest RtTargetBaseCudRequest) throws Exception {
        this.restApiUtil.post(boApiUrl+ "/api/bo/system/menuMgmt/modifyMenuInfo", RtTargetBaseCudRequest, new ParameterizedTypeReference<Response<String>>() {}).getPayload();
    }

    @Override
    public void saveSubMenu(RealGridCUDRequest<StRtTgtBase> realGridCUD) throws Exception {
    	this.restApiUtil.post(boApiUrl+ "/api/bo/system/menuMgmt/saveSubMenu", realGridCUD, new ParameterizedTypeReference<Response<String>>() {}).getPayload();
    }

    @Override
    public int getSubMenuCheck(RtTargetBaseRequest RtTargetBaseRequest) throws Exception {
        return this.restApiUtil.get(boApiUrl+ "/api/bo/system/menuMgmt/getSubMenuCheck", RtTargetBaseRequest, new ParameterizedTypeReference<Response<Integer>>() {}).getPayload();
    }

    @Override
    public int getRtInfoCheck(RtTargetBaseRequest RtTargetBaseRequest) throws Exception {
        return this.restApiUtil.get(boApiUrl+ "/api/bo/system/menuMgmt/getRtInfoCheck", RtTargetBaseRequest, new ParameterizedTypeReference<Response<Integer>>() {}).getPayload();
    }
    
    @Override
    public void modifyMenuRight(Map<String, Object> list) throws Exception {
    	this.restApiUtil.post(boApiUrl + "/api/bo/system/menuMgmt/modifyMenuRight", list, new ParameterizedTypeReference<Response<String>>() {}).getPayload();
    }
    
    @Override
    public void saveMenuRightIndiv(Map<String, Object> list) throws Exception {
    	this.restApiUtil.post(boApiUrl + "/api/bo/system/menuMgmt/saveMenuRightIndiv", list, new ParameterizedTypeReference<Response<String>>() {}).getPayload();
    }
}
