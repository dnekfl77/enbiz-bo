package com.enbiz.bo.app.repository.goods;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.PrPregGoodsBase;
import com.enbiz.bo.app.entity.PrPregItmOptnInfo;

/**
 * 가등록 단품옵션정보 Trx DAO
 */
@Repository
@Lazy
public interface PrPregItmOptnInfoTrxMapper {

    /**
     * 임시 일반상품 등록,상세 > 가등록 상품 단품 옵션 등록
     * @param prPregItmOptnInfo
     */
    void insertPregItmOptnInfo(PrPregItmOptnInfo prPregItmOptnInfo);

    /**
     * 상품승인관리 > 임시 일반상품 단품옵션정보 승인처리
     * @param prPregGoodsBase
     */
    void applyPregItmOptnInfo(PrPregGoodsBase prPregGoodsBase);

    /**
     * 임시 일반상품 상세, 상품임시저장관리 > 임시 단품옵션정보 삭제
     * @param pregGoodsNo
     */
    void deletePregItmOptnInfo(String pregGoodsNo);


}
