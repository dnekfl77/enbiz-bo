package com.enbiz.bo.app.repository.goods;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.PrPregGoodsBase;
import com.enbiz.bo.app.entity.PrPregGoodsItemInfo;

/**
 * 가등록 상품항목정보 Trx DAO
 */
@Repository
@Lazy
public interface PrPregGoodsItemInfoTrxMapper {

    /**
     * 임시 일반상품 등록,상세 > 임시 상품항목정보 등록
     * @param prPregGoodsItemInfo
     */
    void insertPregGoodsItem(PrPregGoodsItemInfo prPregGoodsItemInfo);

    /**
     * 임시 일반상품 상세 > 임시 상품항목정보 수정
     * @param prPregGoodsItemInfo
     */
    void updatePregGoodsItemInfo(PrPregGoodsItemInfo prPregGoodsItemInfo);

    /**
     * 상품승인관리 > 임시 일반상품 상품항목정보 승인처리
     * @param prPregGoodsBase
     */
    void applyPregGoodsItemInfo(PrPregGoodsBase prPregGoodsBase);

    /**
     * 상품임시저장관리, 임시 일반상품 상세 > 임시 상품항목정보 삭제
     * @param pregGoodsNo
     */
    void deletePregGoodsItemInfo(String pregGoodsNo);
}
