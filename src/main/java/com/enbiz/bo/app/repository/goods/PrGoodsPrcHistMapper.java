package com.enbiz.bo.app.repository.goods;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.goods.GoodsPriceHistoryRequest;
import com.enbiz.bo.app.dto.response.goods.GoodsPriceHistoryResponse;
import com.enbiz.bo.app.entity.PrGoodsPrcHist;

/**
 * 상품 가격 이력 DAO
 */
@Repository
@Lazy
public interface PrGoodsPrcHistMapper {

    /**
     * 일반상품 상세 > 상품 가격 이력 조회
     * @param goodsNo
     * @return
     */
    PrGoodsPrcHist getGoodsPrcHist(String goodsNo);

    /**
     * 일반상품 상세 > 상품 가격 이력 목록 수 조회
     * @param request
     * @return
     */
    int getGoodsPrcHistListCount(GoodsPriceHistoryRequest request);

    /**
     * 일반상품 상세 > 상품 가격 이력 목록 조회
     * @param request
     * @return
     */
    List<GoodsPriceHistoryResponse> getGoodsPrcHistList(GoodsPriceHistoryRequest request);

    /**
     * 일반상품 상세 > 가격 변경 예약건 유무 조회
     * @param goodsNo
     * @return
     */
    boolean checkGoodsReservedPriceHistoryYn(String goodsNo);
}
