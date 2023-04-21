package com.enbiz.bo.app.repository.customerservice;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.CsCustomerCompensAcceptInfo;


/**
 * 고객보상접수정보
 */
@Repository
@Lazy
public interface CsCustCpnsAccpInfoTrxMapper {

    /**
     * 고객보상접수정보 등록
     */
    void insertCsCustCpnsAccpInfo(CsCustomerCompensAcceptInfo request) throws Exception;

    /**
     * 고객보상 ( 변경적용 )
     */
    void updateCustomerCompensDetail(CsCustomerCompensAcceptInfo CsCustomerCompensAcceptInfo) throws Exception;

    /**
     *  고객보상 (접수취소)
     */
    void cancelCustomerCompensDetail(CsCustomerCompensAcceptInfo CsCustomerCompensAcceptInfo) throws Exception;

    /**
     *  고객보상 (보상승인)
     */
    void rewardApproveCompensDetail(CsCustomerCompensAcceptInfo CsCustomerCompensAcceptInfo) throws Exception;

    /**
     *  고객보상 (보상반려)
     */
    void rewardPayReturnCustomerCompensDetail(CsCustomerCompensAcceptInfo CsCustomerCompensAcceptInfo) throws Exception;

    /**
     *  고객보상 (지급승인 : 현금)
     */
    void payCashApproveCompensDetail(CsCustomerCompensAcceptInfo CsCustomerCompensAcceptInfo) throws Exception;

    /**
     *  고객보상 (지급승인 : 예치금,적립금)
     */
    void payNoCashApproveCompensDetail(CsCustomerCompensAcceptInfo CsCustomerCompensAcceptInfo) throws Exception;

}
