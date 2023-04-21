package com.enbiz.bo.app.repository.goods;

import java.util.List;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.goods.ReviewDetailRequest;
import com.enbiz.bo.app.dto.response.goods.ReviewDetailResponse;

/**
 * 상품리뷰 댓글정보 DAO
 */
@Repository
@Lazy
public interface PrGooodRevReplyInfoMapper {

    /**
     * 리뷰상세 > 리뷰 답글 목록 수 조회
     * @param request
     * @return
     */
    int getReviewReplyListCount(ReviewDetailRequest request);

    /**
     * 리뷰상세 > 리뷰 답글 목록 조회
     * @param request
     * @return
     */
    List<ReviewDetailResponse> getReviewReplyList(ReviewDetailRequest request);

}
