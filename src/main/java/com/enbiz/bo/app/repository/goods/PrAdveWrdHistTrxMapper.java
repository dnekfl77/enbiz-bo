package com.enbiz.bo.app.repository.goods;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.PrAdveWrdHist;

/**
 * 상품홍보문구이력 Trx DAO
 */
@Repository
@Lazy
public interface PrAdveWrdHistTrxMapper {

    /**
     * 일반상품 상세 >
     * 홍보문구 등록
     * @param prAdveWrdHist
     */
    void insertPrAdveWrdHist(PrAdveWrdHist prAdveWrdHist);

    /**
     * 홍보문구관리 > 홍보문구 수정
     * @param prAdveWrdHist
     */
    void updatePrAdveWrdHist(PrAdveWrdHist prAdveWrdHist);

    /**
     * 일반상품 상세 > 홍보문구 전체삭제
     * @param goodsNo
     */
    void deleteAllAdvertisingWord(String goodsNo);

}
