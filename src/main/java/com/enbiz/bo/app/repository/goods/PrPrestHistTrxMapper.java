package com.enbiz.bo.app.repository.goods;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.PrPrestHist;

@Repository
@Lazy
public interface PrPrestHistTrxMapper {

    /**
     * 일반상품 상세 >
     * 증정품 등록
     * @param prPrestHist
     */
    void insertPrPrestHist(PrPrestHist prPrestHist);

    /**
     * 증정품 수정
     * @param prPrestHist
     */
    void updatePrPrestHist(PrPrestHist prPrestHist);

    /**
     * 증정품 삭제
     * @param prPrestHist
     */
    void deletePrPrestHist(PrPrestHist prPrestHist);

    /**
     * 일반상품 상세 >
     * 증정품 전체삭제
     * @param goodsNo
     */
    void deleteAllPrPrestHist(String goodsNo);

}
