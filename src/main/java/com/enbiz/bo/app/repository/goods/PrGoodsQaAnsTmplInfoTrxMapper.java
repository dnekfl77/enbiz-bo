package com.enbiz.bo.app.repository.goods;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.PrGoodsQaAnsTmplInfo;

/**
 * 상품QA답변 템플릿정보 Trx DAO
 */
@Repository
@Lazy
public interface PrGoodsQaAnsTmplInfoTrxMapper {

    /**
     * 상품Q&A관리 > 상품Q&A답변 템플릿관리 > 상품Q&A답변 템플릿 정보 등록
     * @param prGoodsQaAnsTmplInfo
     */
    void insertPrGoodsQaAnsTmplInfo(PrGoodsQaAnsTmplInfo prGoodsQaAnsTmplInfo);

    /**
     * 상품Q&A관리 > 상품Q&A답변 템플릿관리 > 상품Q&A답변 템플릿 정보 수정
     * @param prGoodsQaAnsTmplInfo
     */
    void updatePrGoodsQaAnsTmplInfo(PrGoodsQaAnsTmplInfo prGoodsQaAnsTmplInfo);

    /**
     * 상품Q&A관리 > 상품Q&A답변 템플릿관리 > 상품Q&A답변 템플릿 정보 삭제
     * @param prGoodsQaAnsTmplInfo
     */
    void deletePrGoodsQaAnsTmplInfo(PrGoodsQaAnsTmplInfo prGoodsQaAnsTmplInfo);

}
