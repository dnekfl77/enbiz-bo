package com.enbiz.bo.app.service.goods;

import java.util.List;

import com.enbiz.bo.app.dto.request.goods.GoodsApprovalMgmtRequest;
import com.enbiz.bo.app.dto.response.goods.GoodsApprovalMgmtResponse;

/**
 * 상품 승인 관리 Service
 */
public interface GoodsApprovalMgmtService {

    /**
     * 상품 승인 목록 수 조회
     * @param request
     * @return
     * @throws Exception
     */
    int getGoodsApprovalListCount(GoodsApprovalMgmtRequest request) throws Exception;

    /**
     * 상품 승인 목록 조회
     * @param request
     * @return
     * @throws Exception
     */
    List<GoodsApprovalMgmtResponse> getGoodsApprovalList(GoodsApprovalMgmtRequest request) throws Exception;

    /**
     * 상품 승인
     * @param request
     * @throws Exception
     */
    void approveGoods(GoodsApprovalMgmtRequest request) throws Exception;

    /**
     * 상품 반려
     * @param request
     * @throws Exception
     */
    void returnGoods(GoodsApprovalMgmtRequest request) throws Exception;

}
