package com.enbiz.bo.app.repository.goods;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.PrPregAssocGoodsInfo;
import com.enbiz.bo.app.entity.PrPregGoodsBase;

/**
 * 가등록 연관상품정보 Trx DAO
 */
@Repository
@Lazy
public interface PrPregAssocGoodsInfoTrxMapper {

    /**
     * 임시 일반상품 등록,상세 > 임시 연관상품 등록
     * @param prPregAssocGoodsInfo
     */
    void insertPregAssocGoods(PrPregAssocGoodsInfo prPregAssocGoodsInfo);

    /**
     * 임시 일반상품 등록,상세 > 임시 연관상품 수정
     * @param prPregAssocGoodsInfo
     */
    void updatePregAssocGoodsInfo(PrPregAssocGoodsInfo prPregAssocGoodsInfo);

    /**
     * 임시 일반상품 등록,상세 > 임시 연관상품 삭제
     * @param prPregAssocGoodsInfo
     */
    void deletePregAssocGoods(PrPregAssocGoodsInfo prPregAssocGoodsInfo);

    /**
     * 상품승인관리 > 임시 일반상품 연관상품 승인처리
     * @param prPregGoodsBase
     */
    void applyPregAssocGoodsInfo(PrPregGoodsBase prPregGoodsBase);

    /**
     * 임시상품저장관리 > 임시 연관상품 전체 삭제
     * @param pregGoodsNo
     */
    void deleteAllPregAssocGoods(String pregGoodsNo);


}
