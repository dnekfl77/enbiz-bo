package com.enbiz.bo.app.repository.goods;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.PrPregGoodsBase;
import com.enbiz.bo.app.entity.PrPregGoodsPayMeanInfo;

/**
 * 가등록 상품결제수단정보 Trx DAO
 */
@Repository
@Lazy
public interface PrPregGoodsPayMeanInfoTrxMapper {

    /**
     * 임시 일반상품 등록,수정 > 임시 상품결제수단정보 등록
     * @param prPregGoodsPayMeanInfo
     */
    void insertPregGoodsPayMeanInfo(PrPregGoodsPayMeanInfo prPregGoodsPayMeanInfo);

    /**
     * 상품승인관리 > 임시 일반상품 상품결제수단정보 승인처리
     * @param prPregGoodsBase
     */
    void applyPregGoodsPayMeanInfo(PrPregGoodsBase prPregGoodsBase);

    /**
     * 임시 일반상품 상세, 상품임시저장관리 > 임시 상품결제수단정보 삭제
     * @param pregGoodsNo
     */
    void deletePregGoodsPayMeanInfo(String pregGoodsNo);

}
