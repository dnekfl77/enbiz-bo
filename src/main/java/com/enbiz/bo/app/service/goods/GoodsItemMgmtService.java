package com.enbiz.bo.app.service.goods;

import java.util.List;

import com.enbiz.bo.app.dto.request.goods.GoodsItemMgmtRequest;
import com.enbiz.bo.app.dto.request.goods.GoodsItemMgmtSaveRequest;
import com.enbiz.bo.app.dto.response.goods.GoodsItemMgmtResponse;

/**
 * 단품관리 Service
 */
public interface GoodsItemMgmtService {

    /**
     * 단품 관리 목록 조회
     * @return GoodsItemListResponse
     * @throws Exception
     */
    List<GoodsItemMgmtResponse> getGoodsItemList(GoodsItemMgmtRequest request) throws Exception;

    /**
     * 단품 관리 목록 수 조회
     * @param request
     * @return
     * @throws Exception
     */
    int getGoodsItemListCount(GoodsItemMgmtRequest request) throws Exception;

    /**
     * 단품 관리 목록 저장
     * @param updateList
     * @throws Exception
     */
    void saveGoodsItemList(List<GoodsItemMgmtSaveRequest> updateList) throws Exception;
}
