package com.enbiz.bo.app.repository.goods;

import java.util.List;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.goods.PrGoodsRevInfoRequest;
import com.enbiz.bo.app.dto.request.goods.ReviewMgmtRequest;
import com.enbiz.bo.app.dto.response.goods.PrGoodsRevInfoResponse;
import com.enbiz.bo.app.dto.response.goods.ReviewDetailResponse;
import com.enbiz.bo.app.dto.response.goods.ReviewMgmtResponse;

/**
 * 상품리뷰정보 DAO
 */
@Repository
@Lazy
public interface PrGoodsRevInfoMapper {

    /**
     * 전시대상 상품리뷰 조회팝업 > 전시대상 상품리뷰 목록 조회
     * @return
     * @throws Exception
     */
    List<PrGoodsRevInfoResponse> getDisplayGoodsReviewList(PrGoodsRevInfoRequest request);

    /**
     * 전시대상 상품리뷰 조회팝업 > 전시대상 상품리뷰 목록 조회 수
     * @return
     * @throws Exception
     */
    int getDisplayGoodsReviewListCount(PrGoodsRevInfoRequest request);

    /**
     * 리뷰관리 > 리뷰 목록 수 조회
     * @param request
     * @return
     */
    int getReviewListCount(ReviewMgmtRequest request);

    /**
     * 리뷰관리 > 리뷰 목록 조회
     * @param request
     * @return
     */
    List<ReviewMgmtResponse> getReviewList(ReviewMgmtRequest request);

    /**
     * 리뷰관리 > 리뷰 정보 조회
     * @param revNo
     * @return
     */
    ReviewDetailResponse getReviewInfo(String revNo);


}
