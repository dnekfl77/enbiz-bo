package com.enbiz.bo.app.repository.goods;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.goods.GoodsPriceHistoryRequest;

/**
 * 상품 가격 이력 Trx DAO
 */
@Repository
@Lazy
public interface PrGoodsPrcHistTrxMapper {

    /**
     * 일반상품 상세 > 가격 변경 예약 팝업 > 가격 이력 중단
     * @param request
     */
    void stopGoodsPriceHist(GoodsPriceHistoryRequest request);

    /**
     * 일반상품 상세 > 가격 변경 예약 팝업 > 가격 이력 추가
     * @param request
     */
    void insertGoodsPriceHist(GoodsPriceHistoryRequest request);

}
