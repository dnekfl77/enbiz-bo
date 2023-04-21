package com.enbiz.bo.app.repository.display;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.CcCmAgmtPolcInfo;

@Repository
@Lazy
public interface CcCmAgmtPolcInfoTrxMapper {

    /**
     * 약관/이용안내 등록/수정 팝업 _ 등록
     * @param ccCmAgmtPolcInfo
     * @throws Exception
     */
    void insertCcCmAgmtPolcInfo(CcCmAgmtPolcInfo ccCmAgmtPolcInfo) throws Exception;

    /**
     * 약관/이용안내 등록/수정 팝업 _ 수정
     * @param ccCmAgmtPolcInfo
     * @throws Exception
     */
    void updateCcCmAgmtPolcInfo(CcCmAgmtPolcInfo ccCmAgmtPolcInfo) throws Exception;
}
