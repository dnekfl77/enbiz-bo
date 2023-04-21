package com.enbiz.bo.app.service.system;

import java.util.List;

import com.enbiz.bo.app.dto.request.realgrid.RealGridCUDRequest;
import com.enbiz.bo.app.dto.request.system.GroupCodeRequest;
import com.enbiz.bo.app.dto.request.system.StandardCodeRequest;
import com.enbiz.bo.app.dto.response.system.GroupCodeResponse;
import com.enbiz.bo.app.dto.response.system.StandardCodeResponse;

public interface CommonCodeMgmtService {
	 /**
     * 그룹코드 목록 조회
     * @param GroupCodeRequest
     * @return 그룹코드 목록
     * @throws Exception
     */
	List<GroupCodeResponse> getGroupCodeList(GroupCodeRequest GroupCodeRequest) throws Exception;
	/**
     * 그룹코드 목록 수 조회
     * @param  GroupCodeRequest
     * @return 그룹코드 목록 수
     * @throws Exception
     */
	int getGroupCodeListCount(GroupCodeRequest GroupCodeRequest) throws Exception;
	
    /**
     * 그룹코드 신규 등록
     * @param createList 신규 목록
     * @throws Exception
     */
    void registGroupCode(List<GroupCodeRequest> createList) throws Exception;

    /**
     * 그룹코드 수정
     * @param updateList 수정 목록
     * @throws Exception
     */
    void modifyGroupCode(List<GroupCodeRequest> updateList) throws Exception;

	/**
     * 그룹코드 저장 처리
     * @param createList 신규 목록
     * @param updateList 수정 목록
     * @throws Exception
     */
//    void saveGroupCode(List<GroupCodeRequest> createList, List<GroupCodeRequest> updateList) throws Exception;
	void saveGroupCode(RealGridCUDRequest<GroupCodeRequest> realGridCUD) throws Exception;


    /**
     * 기준코드 목록 조회
     * @param  StandardCodeRequest
     * @return 기준코드 목록
     * @throws Exception
     */
	List<StandardCodeResponse> getStandardCodeList(StandardCodeRequest StandardCodeRequest);
	/**
     * 기준코드 목록 수 조회
     * @param  StandardCodeRequest
     * @return 기준코드 목록
     * @throws Exception
     */
	int getStandardCodeListCount(StandardCodeRequest StandardCodeRequest);
	
    /**
     * 기준코드 신규 등록
     * @param createList 신규 목록
     * @throws Exception
     */
    void registStandardCode(List<StandardCodeRequest> createList) throws Exception;

    /**
     * 기준코드 상세 수정 처리
     * @param updateList 수정 목록
     * @throws Exception
     */
    void modifyStandardCode(List<StandardCodeRequest> updateList) throws Exception;

	/**
     * 기준코드 저장 처리
     * @param createList 신규 목록
     * @param updateList 수정 목록
     * @throws Exception
     */
    void saveStandardCode(List<StandardCodeRequest> createList, List<StandardCodeRequest> updateList) throws Exception;
    
}
