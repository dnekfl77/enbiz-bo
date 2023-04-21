package com.enbiz.bo.app.repository.delivery;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.LoDeliDtl;

@Repository
@Lazy
public interface LoDeliDtlTrxMapper {

    /**
     * 추가
     * @param loDeliDtl
     */
    void insertLoDeliDtl(LoDeliDtl loDeliDtl);
}
