package com.enbiz.bo.app.repository.marketing;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.marketing.AppreciateRequest;
import com.enbiz.bo.app.dto.response.marketing.AppreciateAplyInfoResponse;
import com.enbiz.bo.app.dto.response.marketing.AppreciateDetailResponse;
import com.enbiz.bo.app.dto.response.marketing.AppreciateFvrInfoResponse;
import com.enbiz.bo.app.dto.response.marketing.AppreciateMediaInfoResponse;
import com.enbiz.bo.app.dto.response.marketing.AppreciateResponse;

@Repository
@Lazy
public interface CcAeBaseMapper {

    /**
     * 사은행사 관리 조회
     * @param request
     * @return
     * @throws Exception
     */
    List<AppreciateResponse> getAppreciationEventList(AppreciateRequest request) throws Exception;

    /**
     *  사은행사 관리 수 조회
     * @param request
     * @return
     * @throws Exception
     */
    int getAppreciationEventListCount(AppreciateRequest request) throws Exception;

    /**
     * 사은행사 상세 조회
     * @param aeNo
     * @return
     * @throws Exception
     */
    AppreciateDetailResponse getAppreciation(String aeNo) throws Exception;

    /**
     * 사은행사 적용정보
     * @return
     * @throws Exception
     */
    List<AppreciateAplyInfoResponse> getAplyInfo(String aeNo) throws Exception;

    /**
     * 사은행사 미디어 매체
     * @param aeNo
     * @return
     * @throws Exception
     */
    List<AppreciateMediaInfoResponse> getMediaInfo(String aeNo) throws Exception;

    /**
     * 사은행사 혜택정보
     * @param aeNo
     * @return
     * @throws Exception
     */
    List<AppreciateFvrInfoResponse> getFvrInfo(String aeNo) throws Exception;
}
