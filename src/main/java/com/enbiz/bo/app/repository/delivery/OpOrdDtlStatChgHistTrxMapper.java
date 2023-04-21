package com.enbiz.bo.app.repository.delivery;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.OpOrdDtlStatChgHist;

@Repository
@Lazy
public interface OpOrdDtlStatChgHistTrxMapper {

    /**
     * 변경이력 추가
     * @param opOrdDtlStatChgHist
     */
    void insertOpOrdDtlStatChgHist(OpOrdDtlStatChgHist opOrdDtlStatChgHist);
}
