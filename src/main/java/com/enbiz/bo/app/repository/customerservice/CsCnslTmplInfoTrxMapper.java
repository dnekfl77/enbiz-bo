package com.enbiz.bo.app.repository.customerservice;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.CsCnslTmplInfo;

@Repository
@Lazy
public interface CsCnslTmplInfoTrxMapper {
    /**
     * 상담 템플릿 리스트 삭제
     * @param csCnslTmplInfo
     * @return
     */
    void deleteCsCnslTmplInfoList(CsCnslTmplInfo csCnslTmplInfo);

    /**
     * 상담 템플릿 관리 > 템플릿 등록
     * @param csCnslTmplInfo
     * @return
     */
    void insertCsCnslTmplInfo(CsCnslTmplInfo csCnslTmplInfo);

    /**
     * 상담 템플릿 관리 > 템플릿 수정
     * @param csCnslTmplInfo
     * @return
     */
    void updateCsCnslTmplInfo(CsCnslTmplInfo csCnslTmplInfo);
}
