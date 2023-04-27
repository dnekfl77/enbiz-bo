package com.enbiz.bo.app.service.code;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;

import com.enbiz.bo.app.dto.code.CodeReqDto;
import com.enbiz.bo.app.dto.code.CodeResDto;
import com.enbiz.bo.app.entity.StStdCd;
import com.enbiz.common.base.rest.Response;
import com.enbiz.common.base.rest.RestApiUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Lazy
@Slf4j
@RequiredArgsConstructor
public class CodeService {
	private final RestApiUtil restApiUtil;
	@Value("${app.apiUrl.bo}")
	private String boApiUrl;

    /**
     * 공통코드 조회
     * @param grpCds
     * @return
     * @throws Exception 
     */
    public Map<String, List<StStdCd>> getStStdCd(String grpCds) throws Exception {
		return this.restApiUtil.get(boApiUrl+ "/api/bo/common/code/getStStdCd", Collections.singletonMap("grpCds", grpCds), new ParameterizedTypeReference<Response<Map<String, List<StStdCd>>>>() {}).getPayload();
    }
    
    /**
     * 공통코드 역순 조회
     * @param grpCds
     * @return
     * @throws Exception 
     */
    public Map<String, List<StStdCd>> getReverseStStdCd(String grpCds) throws Exception {
    	return this.restApiUtil.get(boApiUrl+ "/api/bo/common/code/getReverseStStdCd", grpCds, new ParameterizedTypeReference<Response<Map<String, List<StStdCd>>>>() {}).getPayload();
    }

    public Map<String, List<CodeResDto>> getForwardCdCdNmFromStStdCdByArrayGrpCd(String grpCds) throws Exception {
		return this.restApiUtil.get(boApiUrl+ "/api/bo/common/code/getForwardCdCdNmFromStStdCdByArrayGrpCd", grpCds, new ParameterizedTypeReference<Response<Map<String, List<CodeResDto>>>>() {}).getPayload();
    }

    public Map<String, List<CodeResDto>> getReverseCdCdNmFromStStdCdByArrayGrpCd(String grpCds) throws Exception {
    	return this.restApiUtil.get(boApiUrl+ "/api/bo/common/code/getReverseCdCdNmFromStStdCdByArrayGrpCd", grpCds, new ParameterizedTypeReference<Response<Map<String, List<CodeResDto>>>>() {}).getPayload();
    }

    public Map<String, List<CodeResDto>> getForwardCdCdNmFromCcSiteBaseByEmpty() throws Exception {
    	return this.restApiUtil.get(boApiUrl+ "/api/bo/common/code/getForwardCdCdNmFromCcSiteBaseByEmpty", null, new ParameterizedTypeReference<Response<Map<String, List<CodeResDto>>>>() {}).getPayload();
    }

    public Map<String, List<CodeResDto>> getForwardCdCdNmFromStStdCdByGrpCdRef1Val(CodeReqDto params) throws Exception {
    	return this.restApiUtil.get(boApiUrl+ "/api/bo/common/code/getForwardCdCdNmFromStStdCdByGrpCdRef1Val", params, new ParameterizedTypeReference<Response<Map<String, List<CodeResDto>>>>() {}).getPayload();
    }

    public Map<String, List<CodeResDto>> getForwardCdCdNmByMixedCode(List<CodeReqDto> params) throws Exception {
    	return this.restApiUtil.post(boApiUrl+ "/api/bo/common/code/getForwardCdCdNmByMixedCode", params, new ParameterizedTypeReference<Response<Map<String, List<CodeResDto>>>>() {}).getPayload();
    }
}
