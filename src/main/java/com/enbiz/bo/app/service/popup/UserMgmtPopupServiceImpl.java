package com.enbiz.bo.app.service.popup;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.request.popup.StUserBaseRequest;
import com.enbiz.bo.app.dto.response.popup.StUserBaseResponse;
import com.enbiz.common.base.rest.Response;
import com.enbiz.common.base.rest.RestApiUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
/**
 * 사용자 관리 서비스 IMPL
 */
@Service
@Lazy
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
@Slf4j
@RequiredArgsConstructor
public class UserMgmtPopupServiceImpl implements UserMgmtPopupService {

    private final RestApiUtil restApiUtil;

    @Value("${app.apiUrl.bo}")
    private String boApiUrl;

    @Override
    public int getUserListCount(StUserBaseRequest stUserBaseRequest) throws Exception {
        return restApiUtil.get(boApiUrl + "/api/bo/popup/userMgmtPopup/getUserListCount",stUserBaseRequest,new ParameterizedTypeReference<Response<Integer>>() {}).getPayload();
    }

    @Override
    public List<StUserBaseResponse> getUserList(StUserBaseRequest stUserBaseRequest) throws Exception {
        return restApiUtil.get(boApiUrl + "/api/bo/popup/userMgmtPopup/getUserList",stUserBaseRequest,new ParameterizedTypeReference<Response<List<StUserBaseResponse>>>() {}).getPayload();
    }

    @Override
    public List<StUserBaseResponse> getUserListNoPage(StUserBaseRequest stUserBaseRequest) throws Exception{
        return restApiUtil.get(boApiUrl + "/api/bo/popup/userMgmtPopup/getUserListNoPage",stUserBaseRequest,new ParameterizedTypeReference<Response<List<StUserBaseResponse>>>() {}).getPayload();
    }
}
