package com.enbiz.bo.app.repository.customerservice;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.CsCustTelPrmsInfo;

/**
 * 고객전화약속정보
 */
@Repository
@Lazy
public interface CsCustTelPrmsInfoTrxMapper {
    /**
     * 고객전화약속정보 insert
     */
    void insertCsCustTelPrmsInfo(CsCustTelPrmsInfo csCustTelPrmsInfo) throws Exception;

}
