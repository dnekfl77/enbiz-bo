package com.enbiz.bo.app.repository.customerservice;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.CsCustInqTypCd;

@Repository
@Lazy
public interface CsCustInqTypCdTrxMapper {
    /**
     * 고객문의유형코드 insert
     * @param csCustInqTypCd
     */
    void insertInquiryType(CsCustInqTypCd csCustInqTypCd);

    /**
     * 고객문의유형코드 update
     * @param csCustInqTypCd
     */
    void updateInquiryType(CsCustInqTypCd csCustInqTypCd);
}
