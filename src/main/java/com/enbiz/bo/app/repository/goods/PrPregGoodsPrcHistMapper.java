package com.enbiz.bo.app.repository.goods;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.PrPregGoodsPrcHist;

/**
 * 가등록 상품가격이력 DAO
 */
@Repository
@Lazy
public interface PrPregGoodsPrcHistMapper {

    /**
     * 임시 일반상품 상세 > 임시 상품가격이력 조회
     * @param pregGoodsNo
     * @return
     */
    PrPregGoodsPrcHist getPregGoodsPriceHist(String pregGoodsNo);


}
