package com.enbiz.bo.app.repository.goods;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.goods.ReviewEvaluationItemMgmtRequest;
import com.enbiz.bo.app.dto.response.goods.ReviewEvaluationItemMgmtResponse;
import com.enbiz.bo.app.entity.PrEvltItemCd;

/**
 * 평가항목코드 DAO
 */
@Repository
@Lazy
public interface PrEvltItemCdMapper {

    /**
     * 리뷰평가항목관리 > 평가항목조회팝업 > 추가대상 평가항목목록 수 조회
     * @param request
     * @return
     */
    int getEvltItemListCountForAdd(ReviewEvaluationItemMgmtRequest request);

    /**
     * 리뷰평가항목관리 > 평가항목조회팝업 > 추가대상 평가항목목록 조회
     * @param request
     * @return
     */
    List<ReviewEvaluationItemMgmtResponse> getEvltItemListForAdd(ReviewEvaluationItemMgmtRequest request);

    /**
     * 리뷰평가항목관리 > 평가항목관리 > 평가항목 목록 수 조회
     * @param request
     * @return
     */
    int getEvltItemListCount(ReviewEvaluationItemMgmtRequest request);

    /**
     * 리뷰평가항목관리 > 평가항목관리 > 평가항목 목록 조회
     * @param request
     * @return
     */
    List<ReviewEvaluationItemMgmtResponse> getEvltItemList(ReviewEvaluationItemMgmtRequest request);

    /**
     * 리뷰평가항목관리 > 평가항목관리 > 평가항목명 중복 여부 확인
     * @param prEvltItemCd
     * @return
     */
    boolean checkDuplicatedEvltItemNm(PrEvltItemCd prEvltItemCd);


}
