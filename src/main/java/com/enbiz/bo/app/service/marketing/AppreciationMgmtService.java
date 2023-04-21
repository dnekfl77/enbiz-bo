package com.enbiz.bo.app.service.marketing;

import java.util.List;

import com.enbiz.bo.app.dto.request.marketing.AppreciateRequest;
import com.enbiz.bo.app.dto.request.marketing.AppreciationCudRequest;
import com.enbiz.bo.app.dto.response.marketing.AppreciateDetailResponse;
import com.enbiz.bo.app.dto.response.marketing.AppreciateResponse;

/**
 * 사은행사 관리 Service
 */
public interface AppreciationMgmtService {

    /**
     * 사은행사 관리 목록 조회
     *
     * @param request
     * @return
     * @throws Exception
     */
    List<AppreciateResponse> getAppreciationEventList(AppreciateRequest request) throws Exception;

    /**
     * 사은행사 관리 목록수 조회
     *
     * @param request
     * @return
     * @throws Exception
     */
    int getAppreciationEventListCount(AppreciateRequest request) throws Exception;

    /**
     * 사은행사 등록 및 업데이트
     *
     * @param request
     * @throws Exception
     */
    void saveAppreciation(AppreciationCudRequest request) throws Exception;

    /**
     * 사은행사 상세 정보 가져오기
     *
     * @param aeNo
     * @return
     * @throws Exception
     */
    AppreciateDetailResponse getAppreciation(String aeNo) throws Exception;

    /**
     * 사은행사 삭제
     *
     * @param aeNo
     * @throws Exception
     */
    void deleteAppreciation(String aeNo) throws Exception;
}
