package com.enbiz.bo.app.service.popup;

import java.util.List;

import com.enbiz.bo.app.dto.request.popup.GoodsPopupRequest;
import com.enbiz.bo.app.dto.response.popup.GoodsPopupResponse;

/**
 * 상품 조회 팝업 서비스
 */
public interface GoodsMgmtPopupService {

    /**
     * 상품 목록 수 조회
     * @param goodsPopupRequest
     * @return 상품 목록 수
     * @throws Exception
     */
    int getGoodsListCount(GoodsPopupRequest goodsPopupRequest) throws Exception;

    /**
     * 상품 목록 조회
     * @param goodsPopupRequest
     * @return 상품목록
     * @throws Exception
     */
    List<GoodsPopupResponse> getGoodsList(GoodsPopupRequest goodsPopupRequest) throws Exception;
}
