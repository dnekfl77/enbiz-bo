package com.enbiz.bo.app.repository.goods;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.PrPregGoodsBase;
import com.enbiz.bo.app.entity.PrPregRsvSaleHist;

/**
 * 가등록 예약판매이력 Trx DAO
 */
@Repository
@Lazy
public interface PrPregRsvSaleHistTrxMapper {

    /**
     * 임시 일반상품 등록 > 임시 일반상품 예약판매이력 등록
     * @param prPregRsvSaleHist
     */
    void insertPregRsvSalesHist(PrPregRsvSaleHist prPregRsvSaleHist);

    /**
     * 임시 일반상품 상세 > 임시 일반상품 예약판매이력 수정
     * @param prPregRsvSaleHist
     */
    void updatePregRsvSalesHist(PrPregRsvSaleHist prPregRsvSaleHist);

    /**
     * 상품승인관리 > 임시 일반상품 예약판매이력 승인처리
     * @param prPregGoodsBase
     */
    void applyPregRsvSaleHist(PrPregGoodsBase prPregGoodsBase);

    /**
     * 상품임시저장관리 > 임시 일반상품 예약판매이력 삭제
     * @param pregGoodsNo
     */
    void deletePregRsvSaleHist(String pregGoodsNo);
}
