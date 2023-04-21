package com.enbiz.bo.app.service.goods;

import java.util.List;

import com.enbiz.bo.app.dto.request.goods.WebStockMgmtRequest;
import com.enbiz.bo.app.dto.response.goods.WebStockMgmtResponse;
import com.enbiz.bo.app.entity.PrItmBase;

/**
 * 웹재고관리(위수탁) Service
 */
public interface WebStockMgmtService {

    /**
     * 웹재고관리 목록 수 조회
     * @param request
     * @return
     * @throws Exception
     */
    int getWebStockListCount(WebStockMgmtRequest request) throws Exception;

    /**
     * 웹재고관리 목록 조회
     * @param request
     * @return
     * @throws Exception
     */
    List<WebStockMgmtResponse> getWebStockList(WebStockMgmtRequest request) throws Exception;

    /**
     * 웹재고관리 목록 수정
     * @param updateList
     * @throws Exception
     */
    void modifyWebStockList(List<PrItmBase> updateList) throws Exception;


}
