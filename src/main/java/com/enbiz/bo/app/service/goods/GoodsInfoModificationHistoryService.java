package com.enbiz.bo.app.service.goods;

import java.util.List;

import com.enbiz.bo.app.dto.request.goods.GoodsInfoModificationHistoryRequest;
import com.enbiz.bo.app.dto.response.goods.GoodsInfoModificationHistoryResponse;

/**
 * 상품정보수정이력조회 Service
 */
public interface GoodsInfoModificationHistoryService {

    /**
     * 상품정보수정이력조회 > 상품정보 수정이력 목록 수 조회
     * @param request
     * @return
     * @throws Exception
     */
    int getGoodsInfoModificationHistoryListCount(GoodsInfoModificationHistoryRequest request) throws Exception;

    /**
     * 상품정보수정이력조회 > 상품정보수정이력 목록 조회
     * @param request
     * @return
     * @throws Exception
     */
    List<GoodsInfoModificationHistoryResponse> getGoodsInfoModificationHistoryList(GoodsInfoModificationHistoryRequest request) throws Exception;

    /**
     * 상품정보수정이력조회 > 수정상품정보 목록 수 조회
     * @param request
     * @return
     * @throws Exception
     */
    int getModifiedGoodsListCount(GoodsInfoModificationHistoryRequest request) throws Exception;

    /**
     * 상품정보수정이력조회 > 수정상품정보 목록 조회
     * @param request
     * @return
     * @throws Exception
     */
    List<GoodsInfoModificationHistoryResponse> getModifiedGoodsList(GoodsInfoModificationHistoryRequest request) throws Exception;

}
