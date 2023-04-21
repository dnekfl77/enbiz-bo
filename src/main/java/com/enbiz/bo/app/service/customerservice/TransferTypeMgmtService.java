package com.enbiz.bo.app.service.customerservice;

import java.util.List;

import com.enbiz.bo.app.dto.request.customerservice.CsMvotTypeCodeRequest;
import com.enbiz.bo.app.dto.response.customerservice.CsTransferTypeCodeResponse;
import com.enbiz.bo.app.entity.CsMvotTypCd;

/**
 * 이관유형관리 서비스
 */
public interface TransferTypeMgmtService {
	
	/**
     * 이관유형 목록 조회
     * @param CsMvotTypeCodeRequest
     * @return
     * @throws Exception
     */
	public List<CsTransferTypeCodeResponse> getTransferTypeList(CsMvotTypeCodeRequest CsMvotTypeCodeRequest) throws Exception;
	
	/**
     * 이관유형 목록 조회 수
     * @param CsMvotTypeCodeRequest
     * @throws Exception
     */
	public int getTransferTypeListCount(CsMvotTypeCodeRequest CsMvotTypeCodeRequest) throws Exception;
	
	/**
     * 이관유형 저장
     * @param createList
     * @throws Exception
     */
	public void saveList(List<CsMvotTypCd> createList, List<CsMvotTypCd> updateList) throws Exception;
	
	/**
     * 이관유형명의 중복여부 확인
     * @param CsMvotTypeCodeRequest
     * @throws Exception
     */
	public boolean checkCsMvotTypeName(CsMvotTypeCodeRequest CsMvotTypeCodeRequest) throws Exception;
}
