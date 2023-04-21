package com.enbiz.bo.app.repository.customerservice;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.CsCcnPrgsStatHist;

/**
 * 고객상담진행상태이력
 */
@Repository
@Lazy
public interface CsCcnPrgsStatHistTrxMapper {

    /**
     * 고객상담진행상태이력 insert
     */
    void postCsCcnPrgsStatHist(CsCcnPrgsStatHist csCcnPrgsStatHist) throws Exception;
}
