package com.enbiz.bo.app.repository.goods;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.PrPregGoodsBase;
import com.enbiz.bo.app.entity.PrPregRelGoodsInfo;

/**
 * 가등록 관계상품정보
 */
@Repository
@Lazy
public interface PrPregRelGoodsInfoTrxMapper {

    /**
     * 임시 묶음상품 등록, 상세 > 관계상품 추가
     * @param prPregRelGoodsInfo
     */
    void insertPrPregRelGoods(PrPregRelGoodsInfo prPregRelGoodsInfo);

    /**
     * 임시 묶음상품 등록, 상세 > 관계상품정보 수정
     * @param prPregRelGoodsInfo
     */
    void updatePrPregRelGoodsInfo(PrPregRelGoodsInfo prPregRelGoodsInfo);

    /**
     * 임시 묶음상품 등록, 상세 > 관계상품 삭제
     * @param prPregRelGoodsInfo
     */
    void deletePrPregRelGoods(PrPregRelGoodsInfo prPregRelGoodsInfo);

    /**
     * 상품승인관리 > 임시 묶음상품 관계상품정보 승인처리
     * @param prPregGoodsBase
     */
    void applyPrPregRelGoodsInfo(PrPregGoodsBase prPregGoodsBase);

    /**
     * 상품임시저장관리 > 임시 묶음상품 관계상품 전체 삭제
     * @param pregBaseGoodsNo
     */
    void deleteAllPrPregRelGoods(String pregBaseGoodsNo);

}
