package com.enbiz.bo.app.repository.goods;

import java.util.List;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.PrGoodsRevEvlt;

/**
 * 상품리뷰평가 DAO
 */
@Repository
@Lazy
public interface PrGoodsRevEvltMapper {

    /**
     * 리뷰상세 > 리뷰 평가항목별 답변 목록 조회
     * @param revNo
     * @return
     */
    List<PrGoodsRevEvlt> getReviewEvaluationList(String revNo);
}
