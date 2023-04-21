package com.enbiz.bo.app.repository.goods;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.PrGoodsQaQuestInfo;

/**
 * 상품Q&A 질문정보 Trx DAO
 */
@Repository
@Lazy
public interface PrGoodsQaQuestInfoTrxMapper {

    /**
     * 상품Q&A관리 > 상품Q&A 전시상태 변경
     * @param prGoodsQaQuestInfo
     */
    void updateQuestDispStatCd(PrGoodsQaQuestInfo prGoodsQaQuestInfo);

    /**
     * 상품Q&A관리 > 상품Q&A상세 > 상품Q&A 처리상태 변경
     * @param prGoodsQaQuestInfo
     */
    void updateProcStatCd(PrGoodsQaQuestInfo prGoodsQaQuestInfo);

    /**
     * 상품Q&A관리 > 상품Q&A상세 > 고객센터이관팝업 > 고객센터이관
     * @param prGoodsQaQuestInfo
     */
    void updateMvotYn(PrGoodsQaQuestInfo prGoodsQaQuestInfo);

}
