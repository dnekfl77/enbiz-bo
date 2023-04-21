package com.enbiz.bo.app.service.marketing;

import java.util.List;

import com.enbiz.bo.app.dto.request.marketing.PromotionCudRequest;
import com.enbiz.bo.app.dto.request.marketing.PromotionRequest;
import com.enbiz.bo.app.dto.response.marketing.PromotionDetailResponse;
import com.enbiz.bo.app.dto.response.marketing.PromotionResponse;

public interface PromotionMgmtService {

    /**
     * 프로모션 관리 목록 조회
     *
     * @param request
     * @return
     * @throws Exception
     */
    List<PromotionResponse> getPromotionList(PromotionRequest request) throws Exception;

    /**
     * 프로모션 관리 목록수 조회
     *
     * @param request
     * @return
     * @throws Exception
     */
    int getPromotionListCount(PromotionRequest request) throws Exception;

    /**
     * 프로모션 등록 및 업데이트
     *
     * @param request
     * @throws Exception
     */
    void savePromotion(PromotionCudRequest request) throws Exception;

    /**
     * 프로모션 상세 정보 가져오기
     *
     * @param request
     * @return
     * @throws Exception
     */
    PromotionDetailResponse getPromotion(String promoNo) throws Exception;


    /**
     * 프로모션 삭제
     *
     * @param promoNo
     * @throws Exception
     */
    void deletePromotion(String promoNo) throws Exception;
}
