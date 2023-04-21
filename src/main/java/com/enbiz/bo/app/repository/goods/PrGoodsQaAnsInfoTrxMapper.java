package com.enbiz.bo.app.repository.goods;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.PrGoodsQaAnsInfo;

/**
 * 상품Q&A 답변정보 Trx DAO
 */
@Repository
@Lazy
public interface PrGoodsQaAnsInfoTrxMapper {

    /**
     * 상품Q&A관리 > 상품Q&A상세 > 답변 추가
     * @param prGoodsQaAnsInfo
     */
    void insertGoodsQaAnsInfo(PrGoodsQaAnsInfo prGoodsQaAnsInfo);

    /**
     * 상품Q&A관리 > 상품Q&A상세 > 답변 수정
     * @param prGoodsQaAnsInfo
     */
    void updateGoodsQaAnsInfo(PrGoodsQaAnsInfo prGoodsQaAnsInfo);

}
