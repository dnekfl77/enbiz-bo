package com.enbiz.bo.app.service.system;

import java.util.List;

import com.enbiz.bo.app.dto.request.realgrid.RealGridCUDRequest;
import com.enbiz.bo.app.dto.request.system.GroupCodeRequest;
import com.enbiz.bo.app.dto.request.system.StandardCodeMlRequest;
import com.enbiz.bo.app.dto.request.system.StandardCodeRequest;
import com.enbiz.bo.app.dto.response.system.GroupCodeResponse;
import com.enbiz.bo.app.dto.response.system.StandardCodeMlResponse;
import com.enbiz.bo.app.dto.response.system.StandardCodeResponse;

public interface CommonCodeMgmtService {
	/**
     * 그룹코드 목록 조회
     * @param groupCodeRequest
     * @return 그룹코드 목록
     * @throws Exception
     */
	List<GroupCodeResponse> getGroupCodeList(GroupCodeRequest groupCodeRequest) throws Exception;
	
	/**
     * 그룹코드 목록 수 조회
     * @param  groupCodeRequest
     * @return 그룹코드 목록 수
     * @throws Exception
     */
	int getGroupCodeListCount(GroupCodeRequest groupCodeRequest) throws Exception;
	
	/**
	 * 그룹코드 저장 처리
	 * @param realGridCUD
	 * @throws Exception
	 */
	void saveGroupCode(RealGridCUDRequest<GroupCodeRequest> realGridCUD) throws Exception;


    /**
     * 기준코드 목록 조회
     * @param  standardCodeRequest
     * @return 기준코드 목록
     * @throws Exception
     */
	List<StandardCodeResponse> getStandardCodeList(StandardCodeRequest standardCodeRequest) throws Exception;
	
	/**
     * 기준코드 목록 수 조회
     * @param  standardCodeRequest
     * @return 기준코드 목록 수
     * @throws Exception
     */
	int getStandardCodeListCount(StandardCodeRequest standardCodeRequest) throws Exception;

	/**
	 * 기준코드 저장 처리
	 * @param realGridCUD
	 * @throws Exception
	 */
    void saveStandardCode(RealGridCUDRequest<StandardCodeRequest> realGridCUD) throws Exception;
    
    /**
     * 기준코드 다국어 조회
     * @param standardCodeMlRequest
     * @return
     * @throws Exception
     */
    List<StandardCodeMlResponse> getStandardCodeMlList(StandardCodeMlRequest standardCodeMlRequest) throws Exception;
    
    /**
     * 기준코드 다국어 수 조회
     * @param standardCodeMlRequest
     * @return
     * @throws Exception
     */
    int getStandardCodeMlListCount(StandardCodeMlRequest standardCodeMlRequest) throws Exception;
    
    /**
     * 기준코드 다국어 저장
     * @param realGridCUD
     * @throws Exception
     */
    void saveStandardCodeMl(RealGridCUDRequest<StandardCodeMlRequest> realGridCUD) throws Exception;
    
}
