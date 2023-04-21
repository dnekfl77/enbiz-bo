package com.enbiz.bo.app.repository.customerservice;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.customerservice.CsTransferInfoDetailRequest;
import com.enbiz.bo.app.dto.request.customerservice.CsTransferInfoRequest;
import com.enbiz.bo.app.dto.response.customerservice.CsCcnTransInfoDtlPopResponse;
import com.enbiz.bo.app.dto.response.customerservice.CsTransferInfoDetailResponse;
import com.enbiz.bo.app.dto.response.customerservice.CsTransferInfoResponse;

/**
 * 고객상담이관요청정보
 */
@Repository
@Lazy
public interface CsCcnTransReqInfoMapper {

    /**
     * 업무이관관리 목록 조회
     */
    List<CsTransferInfoResponse> getCsTransferManagement(CsTransferInfoRequest request);

    /**
     * 업무이관관리 목록수 조회
     */
    int getCsTransferManagementCount(CsTransferInfoRequest request);

    /**
     * 업무이관관리 상세 조회
     */
    CsTransferInfoDetailResponse csTransferHistory(CsTransferInfoDetailRequest request);

    /**
     * 업무이관상세 팝업
     */
    CsCcnTransInfoDtlPopResponse csTransferDetailHistoryPop(CsTransferInfoDetailRequest request);
}
