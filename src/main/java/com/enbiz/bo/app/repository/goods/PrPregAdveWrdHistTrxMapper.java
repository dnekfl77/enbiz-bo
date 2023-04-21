package com.enbiz.bo.app.repository.goods;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.PrPregAdveWrdHist;
import com.enbiz.bo.app.entity.PrPregGoodsBase;

/**
 * 가등록 상품홍보문구이력 Trx DAO
 */
@Repository
@Lazy
public interface PrPregAdveWrdHistTrxMapper {

    /**
     * 임시 일반상품 등록,상세 > 임시 상품홍보문구이력 등록
     * @param prPregAdveWrdHist
     */
    void insertPregAdveWrdHist(PrPregAdveWrdHist prPregAdveWrdHist);

    /**
     * 상품승인관리 > 임시 일반상품 상품홍보문구이력 승인처리
     * @param prPregGoodsBase
     */
    void applyPregAdveWrdHist(PrPregGoodsBase prPregGoodsBase);

    /**
     * 임시 일반상품 상세, 상품임시저장관리 > 임시 상품홍보문구이력 삭제
     * @param pregGoodsNo
     */
    void deletePregAdveWrdHist(String pregGoodsNo);
}
