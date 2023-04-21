package com.enbiz.bo.app.service.goods;

import java.util.List;

import com.enbiz.bo.app.dto.request.goods.PrGoodsRevInfoRequest;
import com.enbiz.bo.app.dto.response.goods.PrGoodsRevInfoResponse;

public interface DisplayGoodsReviewPopupService {

    /**
     * 전시대상 상품리뷰 목록 조회
     * @param request
     * @return
     * @throws Exception
     */
    public List<PrGoodsRevInfoResponse> getDisplayGoodsReviewList(PrGoodsRevInfoRequest request) throws Exception;

    /**
     *  전시대상 상품리뷰 목록 조회 수
     * @param request
     * @throws Exception
     */
    public int getDisplayGoodsReviewListCount(PrGoodsRevInfoRequest request) throws Exception;

}
