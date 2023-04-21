package com.enbiz.bo.app.service.goods;

import java.util.List;

import com.enbiz.bo.app.dto.request.goods.GoodsMgmtRequest;
import com.enbiz.bo.app.dto.response.goods.GoodsMgmtResponse;

/**
 * 상품관리 Service
 */
public interface GoodsMgmtService {

    /**
     * 상품 목록 수 조회
     * @param request
     * @return
     * @throws Exception
     */
    int getGoodsListCount(GoodsMgmtRequest request) throws Exception;

    /**
     * 상품 목록 조회
     * @param request
     * @return
     * @throws Exception
     */
    List<GoodsMgmtResponse> getGoodsList(GoodsMgmtRequest request) throws Exception;

}
