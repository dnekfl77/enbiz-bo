package com.enbiz.bo.app.repository.payment;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.payment.OpCmsnInfoRequest;
import com.enbiz.bo.app.entity.OpCmsnInfo;

@Repository
@Lazy
public interface OpCmsnInfoTrxMapper {

    /**
     * 결제수수료관리 상세 등록
     * @param opCmsnInfo
     */
    void insertClearingCommissionDetail(OpCmsnInfo opCmsnInfo);

    /**
     * 결제수수료관리 상세 수정
     * @param opCmsnInfoRequest
     */
    void updateClearingCommissionDetail(OpCmsnInfoRequest opCmsnInfoRequest);

    /**
     * 결제수수료관리 상세 삭제
     * @param opCmsnInfo
     */
    void deleteClearingCommissionDetail(OpCmsnInfo opCmsnInfo);

}
