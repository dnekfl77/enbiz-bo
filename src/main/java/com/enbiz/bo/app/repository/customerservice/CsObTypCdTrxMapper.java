package com.enbiz.bo.app.repository.customerservice;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.CsObTypCd;

@Repository
@Lazy
public interface CsObTypCdTrxMapper {
    /**
     * OB유형 등록
     * @return
     * @throws Exception
     */
    void insertCsObTypeCode(CsObTypCd csObTypCd) throws Exception;

    /**
     * OB유형 업데이트
     * @return
     * @throws Exception
     */
    void updateCsObTypeCode(CsObTypCd csObTypCd) throws Exception;
}
