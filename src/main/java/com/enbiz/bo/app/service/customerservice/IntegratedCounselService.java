package com.enbiz.bo.app.service.customerservice;

import java.util.List;

import com.enbiz.bo.app.dto.request.customerservice.CsCounselTemplateInfoRequest;
import com.enbiz.bo.app.dto.request.customerservice.CsCustomerCompensAcceptInfoRequest;
import com.enbiz.bo.app.dto.request.customerservice.CsCustomerCounselInfoSuperRequest;
import com.enbiz.bo.app.dto.request.customerservice.IntegratedCounselRequest;
import com.enbiz.bo.app.dto.response.customerservice.CsCounselTemplateInfoResponse;
import com.enbiz.bo.app.dto.response.customerservice.CsRelatedResponse;
import com.enbiz.bo.app.dto.response.customerservice.CsTransferTypeCodeResponse;
import com.enbiz.bo.app.dto.response.customerservice.IntegratedCounselResponse;
import com.enbiz.bo.app.dto.response.customerservice.IntegratedCsDetailResponse;

/**
 * 통합관리 서비스
 */
public interface IntegratedCounselService {
	
	/**
	 * 상담내역 리스트 전체수 조회
	 * @param IntegratedCounselRequest
	 * @return
	 * @throws Exception
	 */
	public int integratedCounselListCount(IntegratedCounselRequest IntegratedCounselRequest) throws Exception;
	
	/**
	 * 상담내역 리스트 조회
	 * @param IntegratedCounselRequest
	 * @return
	 * @throws Exception
	 */
	public List<IntegratedCounselResponse> integratedCounselList(IntegratedCounselRequest IntegratedCounselRequest) throws Exception;
	
	/**
	 * CS 이관유형코드 조회
	 * @return
	 */
	public List<CsTransferTypeCodeResponse> getCsTransferTypeCodeList();
	
	/**
	 * 상담 저장
	 * @param CsCustomerCounselInfoSuperRequest
	 * @throws Exception
	 */
	public void saveCustomerCounselInfo(CsCustomerCounselInfoSuperRequest CsCustomerCounselInfoSuperRequest) throws Exception;
	
	/**
     * 고객 data 가져오기
     */
    public CsRelatedResponse getCsOrderGoodsData(String ccnNo) throws Exception;
    
    /**
     * 고객보상등록
     * @param request
     * @throws Exception
     */
    public void registCustomerCompens(CsCustomerCompensAcceptInfoRequest request) throws Exception;
    
    /**
     * 관련상담 list 조회
     */
    public CsRelatedResponse getRelatedConsultation(String ccnNo) throws Exception;
    
    /**
     * [처리내역 등록위한 기초데이터]
     * @param ccnNo
     * @return
     * @throws Exception
     */
    public IntegratedCsDetailResponse getProcessingDetails(String ccnNo) throws Exception;
    
    
    /**
     * 처리내역 등록
     */
    public void saveCustomerCounselProcessInfo(CsCustomerCounselInfoSuperRequest CsCustomerCounselInfoSuperRequest) throws Exception;
    
    /**
     * [상담 템플리 가져오기]
     */
    public List<CsCounselTemplateInfoResponse> getCsCounselTemplateInfo(CsCounselTemplateInfoRequest request) throws Exception;
    
    /**
     * [통합상담관리 상세 조회]
     */
    public IntegratedCsDetailResponse integratedCounselDetail(String ccnNo) throws Exception;

}
