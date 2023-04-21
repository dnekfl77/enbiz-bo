package com.enbiz.bo.app.repository.customerservice;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.CsCnslTypInfo;

@Repository
@Lazy
public interface CsCnslTypInfoTrxMapper {
    /**
     * 상담유형관리 등록
     * @param csCnslTypInfo
     */
    void insertConsultationType(CsCnslTypInfo csCnslTypInfo);

    /**
     * 상담유형관리 수정
     * @param csCnslTypInfo
     */
    void updateConsultationType(CsCnslTypInfo csCnslTypInfo);
}
