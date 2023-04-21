package com.enbiz.bo.app.repository.goods;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.PrPregGoodsBase;
import com.enbiz.bo.app.entity.PrPregGoodsPrcHist;

/**
 * 가등록 상품가격이력 Trx DAO
 */
@Repository
@Lazy
public interface PrPregGoodsPrcHistTrxMapper {

    /**
     * 임시 일반상품 등록 > 임시 상품가격이력 등록
     * @param prPregGoodsPrcHist
     */
    void insertPregGoodsPriceHist(PrPregGoodsPrcHist prPregGoodsPrcHist);

    /**
     * 임시 일반상품 상세 > 임시 상품가격이력 수정
     * @param prPregGoodsPrcHist
     */
    void updatePregGoodsPriceHist(PrPregGoodsPrcHist prPregGoodsPrcHist);

    /**
     * 상품승인관리 > 임시 일반상품 상품가격이력 승인처리
     * @param prPregGoodsBase
     */
    void applyPregGoodsPrcHist(PrPregGoodsBase prPregGoodsBase);

    /**
     * 상품임시저장관리 > 임시 상품가격이력 삭제
     * @param pregGoodsNo
     */
    void deletePregGoodsPrcHist(String pregGoodsNo);

}
