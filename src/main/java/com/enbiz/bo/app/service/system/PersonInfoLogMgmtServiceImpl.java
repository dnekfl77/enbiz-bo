package com.enbiz.bo.app.service.system;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;

import com.enbiz.bo.app.entity.StIndInfoQryLog;
import com.enbiz.common.base.rest.Response;
import com.enbiz.common.base.rest.RestApiUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 개인정보 관련 메뉴 로그 기록
 */
@Service
@Lazy
@Slf4j
@RequiredArgsConstructor
public class PersonInfoLogMgmtServiceImpl implements PersonInfoLogMgmtService {
	
	private final RestApiUtil restApiUtil;
	
	@Value("${app.apiUrl.bo}")
	private String boApiUrl;

    @Override
    public void insertStIndInfoQryLog(StIndInfoQryLog stIndInfoQryLog) throws Exception {
    	restApiUtil.post(boApiUrl+ "/api/bo/common/common/insertStIndInfoQryLog", stIndInfoQryLog, new ParameterizedTypeReference<Response<String>>() {}).getPayload();
    }

}
