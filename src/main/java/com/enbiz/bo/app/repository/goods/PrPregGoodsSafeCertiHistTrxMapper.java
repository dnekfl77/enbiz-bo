package com.enbiz.bo.app.repository.goods;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.PrPregGoodsBase;
import com.enbiz.bo.app.entity.PrPregGoodsSafeCertiHist;

/**
 * 가등록 상품안전인증이력 Trx DAO
 */
@Repository
@Lazy
public interface PrPregGoodsSafeCertiHistTrxMapper {

    /**
     * 임시 일반상품 등록,상세 > 임시 상품안전인증정보 등록
     * @param prPregGoodsSafeCertiHist
     */
    void insertPregGoodsSafeCertiHist(PrPregGoodsSafeCertiHist prPregGoodsSafeCertiHist);

    /**
     * 상품승인관리 > 임시 일반상품 상품안전인증이력 승인처리
     * @param prPregGoodsBase
     */
    void applyPregGoodsSafeCertiHist(PrPregGoodsBase prPregGoodsBase);

    /**
     * 임시 일반상품 상세, 상품임시저장관리 > 임시 상품안전인증이력 삭제
     * @param pregGoodsNo
     */
    void deletePregGoodsSafeCertiHist(String pregGoodsNo);

}
