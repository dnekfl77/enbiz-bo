package com.enbiz.bo.app.repository.goods;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.PrPregGoodsBase;
import com.enbiz.bo.app.entity.PrPregItmBase;

/**
 * 가등록 단품기본 Trx DAO
 */
@Repository
@Lazy
public interface PrPregItmBaseTrxMapper {

    /**
     * 임시 일반상품 등록, 상세 > 임시 단품기본 등록
     * @param prPregItmBase
     */
    void insertPregItem(PrPregItmBase prPregItmBase);

    /**
     * 상품승인관리 > 임시 일반상품 단품기본 승인처리
     * @param prPregGoodsBase
     */
    void applyPregItmBase(PrPregGoodsBase prPregGoodsBase);

    /**
     * 임시 일반상품 상세,상품임시저장관리 > 임시 단품기본 삭제
     * @param pregGoodsNo
     */
    void deletePregItmBase(String pregGoodsNo);

}

       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
