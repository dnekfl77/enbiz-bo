package com.enbiz.bo.app.service.customerservice;

import java.util.List;

import com.enbiz.bo.app.dto.request.customerservice.CsCpPayRequest;
import com.enbiz.bo.app.dto.response.customerservice.CsCustomerCompensResponse;

/**
 * 고객보상지급관리 서비스
 */
public interface CustomerCompensPayMgmtService {
	/**
     * 고객보상 지급목록 조회
     */
    public List<CsCustomerCompensResponse> getCustomerCompensPayList(CsCpPayRequest request) throws Exception;
    
    /**
     * 고객보상 지급목록수 조회
     */
    public int getCustomerCompensPayListCount(CsCpPayRequest request ) throws Exception;
}
