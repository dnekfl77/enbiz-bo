package com.enbiz.bo.app.repository.customerservice;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.CsCcnProcAempHist;

/**
 * 고객상담처리담당자이력
 */
@Repository
@Lazy
public interface CsCcnProcAempHistTrxMapper {

    /**
     * 고객상담처리담당자이력 insert
     */
    void insertCsCcnProcAempHist(CsCcnProcAempHist csCcnProcAempHist) throws Exception;
}
