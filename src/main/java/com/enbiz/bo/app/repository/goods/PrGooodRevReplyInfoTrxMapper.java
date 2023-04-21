package com.enbiz.bo.app.repository.goods;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.PrGoodsRevReplyInfo;

/**
 * 상품리뷰 댓글정보 Trx DAO
 */
@Repository
@Lazy
public interface PrGooodRevReplyInfoTrxMapper {

    /**
     * 리뷰상세 > 리뷰 답글 전시상태 변경
     * @param prGoodsRevReplyInfo
     */
    void updateReplySeqDispStatCd(PrGoodsRevReplyInfo prGoodsRevReplyInfo);

    /**
     * 리뷰상세 > 리뷰 답글 등록 팝업 > 리뷰 답글 등록
     * @param prGoodsRevReplyInfo
     */
    void insertReviewReply(PrGoodsRevReplyInfo prGoodsRevReplyInfo);

}
