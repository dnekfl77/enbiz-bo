package com.enbiz.bo.app.repository.display;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.display.CcCmAgmtPolcInfoRequest;
import com.enbiz.bo.app.dto.response.display.CcCmAgmtPolcInfoResponse;

import java.util.List;

@Repository
@Lazy
public interface CcCmAgmtPolcInfoMapper {

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
     */
    int getTermsConditionsListCount(CcCmAgmtPolcInfoRequest ccCmAgmtPolcInfoRequest) throws Exception;

    /**
     * 약관/이용안내 상세 조회
     * @param ccCmAgmtPolcInfoRequest
     * @return
     * @throws Exception
     */
    CcCmAgmtPolcInfoResponse getAgmtUtilGuideByCmAgmtSeq(CcCmAgmtPolcInfoRequest ccCmAgmtPolcInfoRequest) throws Exception;
}
