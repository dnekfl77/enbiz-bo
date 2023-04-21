package com.enbiz.bo.app.repository.goods;

import java.util.List;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.goods.GoodsInfoModificationHistoryRequest;
import com.enbiz.bo.app.dto.response.goods.GoodsInfoModificationHistoryResponse;

/**
 * 상품기본수정로그 DAO
 */
@Repository
@Lazy
public interface PrGoodsBaseModLogMapper {

    /**
     * 상품정보수정이력조회 > 상품정보 수정이력 목록 수 조회
     * @param request
     * @return
     */
    int getGoodsBaseModLogListCount(GoodsInfoModificationHistoryRequest request);

    /**
     * 상품정보수정이력조회 > 상품정보 수정이력 목록 조회
     * @param request
     * @return
     */
    List<GoodsInfoModificationHistoryResponse> getGoodsBaseModLogList(GoodsInfoModificationHistoryRequest request);

}
