package com.enbiz.bo.app.repository.customerservice;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.CsCpnsTypCd;

@Repository
@Lazy
public interface CsCpnsTypCdTrxMapper {
    /**
     * 보상유형관리 하위 보상 정보 등록
     * @return
     * @throws Exception
     */
    void insertCsCpnsTypCd(CsCpnsTypCd csCpnsTypCd) throws Exception;

    /**
     * 보상유형관리 하위 보상 정보 등록
     * @return
     * @throws Exception
     */
    void updateCsCpnsTypCd(CsCpnsTypCd csCpnsTypCd) throws Exception;
}
