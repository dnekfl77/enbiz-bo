package com.enbiz.bo.app.repository.customerservice;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.customerservice.CsCpPayRequest;
import com.enbiz.bo.app.dto.request.customerservice.CsCustomerCompensRequest;
import com.enbiz.bo.app.dto.response.customerservice.CsCompensDetailResponse;
import com.enbiz.bo.app.dto.response.customerservice.CsCustomerCompensResponse;
import com.enbiz.bo.app.entity.CsCustomerCompensAcceptInfo;


/**
 * 고객보상접수정보
 */
@Repository
@Lazy
public interface CsCustCpnsAccpInfoMapper {

    /**
     * 고객보상접수 지급완료여부
     */
    String getCpnsPayYn(String ccnNo) throws Exception;

    /**
     * 고객보상 목록 조회
     */
    List<CsCustomerCompensResponse> getCustomerCompensList(CsCustomerCompensRequest request) throws Exception;

    /**
     * 고객보상 목록수 조회
     */
    int getCustomerCompensListCount(CsCustomerCompensRequest request) throws Exception;

    /**
     * 고객보상신청번호 List -> 고객 보상접수정보 조회
     */
    List<CsCustomerCompensAcceptInfo> getCustomerCompensInfo(String[] custCpnsAplyNoList) throws Exception;

    /**
     * 고객보상 상세 화면 데이터 조회
     */
    CsCompensDetailResponse getCustomerCompensDetail(String custCpnsAplyNo) throws Exception;

    /**
     * 고객보상 지급목록 조회
     */
    List<CsCustomerCompensResponse> customerCpPayManagementList(CsCpPayRequest request) throws Exception;

    /**
     * 고객보상 지급목록수 조회
     */
    int customerCpPayManagementListCount(CsCpPayRequest request) throws Exception;

}
