package com.enbiz.bo.app.repository.goods;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.PrPregGoodsBase;

/**
 * 가등록 상품기본 Trx DAO
 */
@Repository
@Lazy
public interface PrPregGoodsBaseTrxMapper {

    /**
     * 임시 일반,묶음상품 등록 > 임시 일반,묶음상품 등록
     * @param prPregGoodsBase
     */
    void insertPregGoods(PrPregGoodsBase prPregGoodsBase);

    /**
     * 임시 일반상품 상세 > 임시 일반상품 수정
     * @param prPregGoodsBase
     */
    void updatePregGoodsInfo(PrPregGoodsBase prPregGoodsBase);

    /**
     * 임시 묶음상품 상세 > 임시 묶음상품 수정
     * @param prPregGoodsBase
     */
    void updatePkgPregGoodsInfo(PrPregGoodsBase prPregGoodsBase);

    /**
     * 상품임시저장관리 > 임시 상품 삭제
     * @param pregGoodsNo
     */
    void deletePregGoods(String pregGoodsNo);

    /**
     * 상품임시저장관리 > 임시 상품 상태 변경 ( 임시저장 -> 승인대기 )
     * @param prPregGoodsBase
     */
    void requestPregGoodsApproval(PrPregGoodsBase prPregGoodsBase);

    /**
     * 상품승인관리 > 임시 일반상품 상품기본 승인처리
     * @param prPregGoodsBase
     */
    void applyPregGoods(PrPregGoodsBase prPregGoodsBase);

    /**
     * 상품승인관리 > 임시 상품 상태 변경 ( 승인대기 -> 승인완료 )
     * @param prPregGoodsBase
     */
    void approvePregGoods(PrPregGoodsBase prPregGoodsBase);

    /**
     * 상품승인관리 > 임시 상품 승인요청 반려
     * @param prPregGoodsBase
     */
    void returnPregGoods(PrPregGoodsBase prPregGoodsBase);
}
