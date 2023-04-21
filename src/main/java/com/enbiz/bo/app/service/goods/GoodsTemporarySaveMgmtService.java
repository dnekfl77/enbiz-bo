package com.enbiz.bo.app.service.goods;

import java.util.List;

import com.enbiz.bo.app.dto.request.goods.GoodsTemporarySaveMgmtRequest;
import com.enbiz.bo.app.dto.response.goods.GoodsTemporarySaveMgmtResponse;

/**
 * 상품임시저장관리 Service
 */
public interface GoodsTemporarySaveMgmtService {

    /**
     * 상품임시저장 목록 수 조회
     * @param request
     * @return 상품임시저장 목록 수
     * @throws Exception
     */
    int getGoodsTemporarySaveListCount(GoodsTemporarySaveMgmtRequest request) throws Exception;

    /**
     * 상품임시저장 목록 조회
     * @param request
     * @return 상품임시저장 목록
     * @throws Exception
     */
    List<GoodsTemporarySaveMgmtResponse> getGoodsTemporarySaveList(GoodsTemporarySaveMgmtRequest request) throws Exception;

    /**
     * 임시 저장 상품 삭제
     * @param request
     * @throws Exception
     */
    void deleteTemporarySaveGoods(GoodsTemporarySaveMgmtRequest request) throws Exception;

    /**
     * 임시 저장 상품 승인 요청
     * @param request
     * @throws Exception
     */
    void requestTemporarySaveGoodsApproval(GoodsTemporarySaveMgmtRequest request) throws Exception;

}
