package com.enbiz.bo.app.service.display;

import java.util.List;

import com.enbiz.bo.app.dto.request.display.CcCmAgmtPolcInfoRequest;
import com.enbiz.bo.app.dto.response.display.CcCmAgmtPolcInfoResponse;
import com.enbiz.bo.app.entity.CcCmAgmtPolcInfo;

/**
 * 약관&이용안내관리 서비스
 */
public interface TermsConditionsMgmtService {

    /**
     * 약관&이용안내 목록 조회
     * @param ccCmAgmtPolcInfoRequest
     * @return
     * @throws Exception
     */
    List<CcCmAgmtPolcInfoResponse> getTermsConditionsList(CcCmAgmtPolcInfoRequest ccCmAgmtPolcInfoRequest) throws Exception;

    /**
     * 약관&이용안내 목록 수 조회
     * @param ccCmAgmtPolcInfoRequest
     * @return
     * @throws Exception
     */
    int getTermsConditionsListCount(CcCmAgmtPolcInfoRequest ccCmAgmtPolcInfoRequest) throws Exception;

    /**
     * 약관/이용안내 상세 조회
     * @param ccCmAgmtPolcInfoRequest
     * @return
     * @throws Exception
     */
    CcCmAgmtPolcInfoResponse getAgmtUtilGuideByCmAgmtSeq(CcCmAgmtPolcInfoRequest ccCmAgmtPolcInfoRequest) throws Exception;

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
