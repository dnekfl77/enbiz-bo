package com.enbiz.bo.app.service.goods;

import java.util.List;

import com.enbiz.bo.app.dto.request.goods.ReviewDetailRequest;
import com.enbiz.bo.app.dto.request.goods.ReviewMgmtRequest;
import com.enbiz.bo.app.dto.response.goods.ReviewDetailResponse;
import com.enbiz.bo.app.dto.response.goods.ReviewMgmtResponse;
import com.enbiz.bo.app.entity.PrGoodsRevAtchFile;
import com.enbiz.bo.app.entity.PrGoodsRevEvlt;

/**
 * 리뷰관리 Service
 */
public interface ReviewMgmtService {

    /**
     * 리뷰 목록 수 조회
     * @param request
     * @return
     * @throws Exception
     */
    int getReviewListCount(ReviewMgmtRequest request) throws Exception;

    /**
     * 리뷰 목록 조회
     * @param request
     * @return
     * @throws Exception
     */
    List<ReviewMgmtResponse> getReviewList(ReviewMgmtRequest request) throws Exception;

    /**
     * 리뷰 전시상태 일괄변경
     * @param request
     * @throws Exception
     */
    void modifyMultipleReviewsDisplayState(ReviewMgmtRequest request) throws Exception;

    /**
     * 리뷰상세 > 리뷰 정보 조회
     * @param revNo
     * @return
     * @throws Exception
     */
    ReviewDetailResponse getReviewInfo(String revNo) throws Exception;

    /**
     * 리뷰상세 > 리뷰 첨부파일 조회
     * @param revNo
     * @return
     * @throws Exception
     */
    List<PrGoodsRevAtchFile> getReviewAttachedFileList(String revNo) throws Exception;

    /**
     * 리뷰상세 > 리뷰 평가항목별 답변 목록 조회
     * @param revNo
     * @return
     * @throws Exception
     */
    List<PrGoodsRevEvlt> getReviewEvaluationList(String revNo) throws Exception;

    /**
     * 리뷰상세 > 리뷰 답글 목록 수 조회
     * @param request
     * @return
     * @throws Exception
     */
    int getReviewReplyListCount(ReviewDetailRequest request) throws Exception;

    /**
     * 리뷰상세 > 리뷰 답글 목록 조회
     * @param request
     * @return
     * @throws Exception
     */
    List<ReviewDetailResponse> getReviewReplyList(ReviewDetailRequest request) throws Exception;

    /**
     * 리뷰상세 > 리뷰전시상태 변경
     * @param request
     * @throws Exception
     */
    void modifyReviewDisplayState(ReviewDetailRequest request) throws Exception;

    /**
     * 리뷰상세 > 사진전시상태 변경
     * @param request
     * @throws Exception
     */
    void modifyReviewPhotoDisplayState(ReviewDetailRequest request) throws Exception;

    /**
     * 리뷰상세 > 답글 목록 전시상태 변경
     * @param request
     * @throws Exception
     */
    void modifyRepliesDisplayState(ReviewDetailRequest request) throws Exception;

    /**
     * 리뷰상세 > 리뷰 답글 등록 팝업 > 리뷰 답글 등록
     * @param request
     * @throws Exception
     */
    void registReviewReply(ReviewDetailRequest request) throws Exception;

}
