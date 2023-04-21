package com.enbiz.bo.app.repository.payment;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.OpPgByPayMean;
import com.enbiz.bo.app.entity.StStdCd;

@Repository
@Lazy
public interface OpPgByPayMeanTrxMapper {

    /**
     * PG사 업데이트
     */
    void updateStStdCd(StStdCd stStdCd);

    /**
     * 결제수단 입력
     */
    void insertMethodsOfPaymentList(OpPgByPayMean opPgByPayMean);

    /**
     * 결제수단 수정
     */
    void updateMethodsOfPaymentList(OpPgByPayMean opPgByPayMean);
}
