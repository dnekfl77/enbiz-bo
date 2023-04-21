package com.enbiz.bo.app.repository.goods;

import java.util.List;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.goods.ReviewEvaluationItemMgmtRequest;
import com.enbiz.bo.app.dto.response.goods.ReviewEvaluationItemMgmtResponse;

/**
 * 평가값정보 DAO
 */
@Repository
@Lazy
public interface PrEvltValInfoMapper {

    /**
     * 리뷰평가항목관리 > 평가항목상세팝업 > 평가항목,평가값 목록조회
     * @param evltItemNo
     * @return
     */
    List<ReviewEvaluationItemMgmtResponse> getEvltItemValueList(String evltItemNo);

    /**
     * 리뷰평가항목관리 > 평가항목관리 > 평가값 목록 수 조회
     * @param request
     * @return
     */
    int getEvltValueListCount(ReviewEvaluationItemMgmtRequest request);

    /**
     * 리뷰평가항목관리 > 평가항목관리 > 평가값 목록 조회
     * @param request
     * @return
     */
    List<ReviewEvaluationItemMgmtResponse> getEvltValueList(ReviewEvaluationItemMgmtRequest request);

}
