package com.enbiz.bo.app.repository.customerservice;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.CsCcnTransReqInfo;

/**
 * 고객상담이관요청정보
 */
@Repository
@Lazy
public interface CsCcnTransReqInfoTrxMapper {

    /**
     * 고객상담이관요청정보 insert
     */
    void insertCsCsCcnTransReqInfo(CsCcnTransReqInfo csCcnTransReqInfo) throws Exception;

    /**
     * 업무이관관리 답변 내역 임시저장 update
     */
    void postTempCsTransReqInfo(CsCcnTransReqInfo request);

    /**
     * 업무이관관리 답변 내역 답변처리 update
     */
    void postCompleteCsTransReqInfo(CsCcnTransReqInfo request);

    /**
     * 업무이관관리 접수취소
     */
    void csTransferCancel(CsCcnTransReqInfo request);

}
