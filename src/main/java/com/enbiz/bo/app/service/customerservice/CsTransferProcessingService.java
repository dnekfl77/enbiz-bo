package com.enbiz.bo.app.service.customerservice;

import java.util.List;

import com.enbiz.bo.app.dto.request.customerservice.CsCcnTransInfoUpdateRequest;
import com.enbiz.bo.app.dto.request.customerservice.CsTransferInfoDetailRequest;
import com.enbiz.bo.app.dto.request.customerservice.CsTransferInfoRequest;
import com.enbiz.bo.app.dto.response.customerservice.CsCcnTransInfoDtlPopResponse;
import com.enbiz.bo.app.dto.response.customerservice.CsTransferInfoDetailResponse;
import com.enbiz.bo.app.dto.response.customerservice.CsTransferInfoResponse;

/**
 * 업무이관처리 서비스
 */
public interface CsTransferProcessingService {
	
	/**
     * 업무이관관리 목록수 조회
     */
	public int getCsTransferMgmtCount(CsTransferInfoRequest request);
	
	/**
     * 업무이관관리 상세
     */
	public CsTransferInfoDetailResponse getCsTransferDetail(CsTransferInfoDetailRequest request);
	
	/**
     * 업무이관관리 답변 내역 update
     */
	public void saveCsTransferAnswerInfo(CsCcnTransInfoUpdateRequest request) throws Exception;
	
	/**
     * 업무이관상세 팝업
     */
	public CsCcnTransInfoDtlPopResponse getCsTransferDetailPopup(CsTransferInfoDetailRequest request);
	
	/**
     * 업무이관상세 팝업 접수취소
     */
	public void cancelCsTransfer(CsTransferInfoDetailRequest request) throws Exception;
	
	/**
     * 업무이관관리 목록 조회
     */
	public List<CsTransferInfoResponse> getCsTransferMgmtList(CsTransferInfoRequest request);

}
