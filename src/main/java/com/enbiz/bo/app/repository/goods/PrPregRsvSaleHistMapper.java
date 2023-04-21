package com.enbiz.bo.app.repository.goods;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.PrPregRsvSaleHist;

/**
 * 가등록 예약판매이력 DAO
 */
@Repository
@Lazy
public interface PrPregRsvSaleHistMapper {

    /**
     * 임시 일반상품 상세 > 임시 일반상품 예약판매이력 조회
     * @param pregGoodsNo
     * @return
     */
    PrPregRsvSaleHist getPregRsvSalesHist(String pregGoodsNo);

}


