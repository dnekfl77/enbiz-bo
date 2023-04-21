package com.enbiz.bo.app.repository.goods;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.PrPregGoodsBase;
import com.enbiz.bo.app.entity.PrPregPrestHist;

/**
 * 가등록 증정품이력 Trx DAO
 */
@Repository
@Lazy
public interface PrPregPrestHistTrxMapper {

    /**
     * 임시 일반상품 등록,상세 > 임시 증정품이력 등록
     * @param prPregPrestHist
     */
    void insertPregPrestHist(PrPregPrestHist prPregPrestHist);

    /**
     * 상품승인관리 > 임시 일반상품 증정품이력 승인처리
     * @param prPregGoodsBase
     */
    void applyPregPrestHist(PrPregGoodsBase prPregGoodsBase);

    /**
     * 임시 일반상품 상세, 상품임시저장관리 > 임시 증정품이력 삭제
     * @param pregGoodsNo
     */
    void deletePregPrestHist(String pregGoodsNo);
}
