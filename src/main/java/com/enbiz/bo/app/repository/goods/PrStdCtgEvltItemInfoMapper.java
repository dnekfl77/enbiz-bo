package com.enbiz.bo.app.repository.goods;

import java.util.List;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.goods.ReviewEvaluationItemMgmtRequest;
import com.enbiz.bo.app.dto.response.goods.ReviewEvaluationItemMgmtResponse;

/**
 * 표준카테고리평가항목정보 DAO
 */
@Repository
@Lazy
public interface PrStdCtgEvltItemInfoMapper {

    /**
     * 리뷰평가항목관리 > 평가항목-표준분류 매핑관리  > 표준카테고리별 평가항목 목록 수 조회
     * @param request
     * @return
     */
    int getStdCtgEvltItemListCount(ReviewEvaluationItemMgmtRequest request);

    /**
     * 리뷰평가항목관리 > 평가항목-표준분류 매핑관리  > 표준카테고리별 평가항목 목록 조회
     * @param request
     * @return
     */
    List<ReviewEvaluationItemMgmtResponse> getStdCtgEvltItemList(ReviewEvaluationItemMgmtRequest request);

    /**
     * 리뷰평가항목관리 > 평가항목관리 > 평가항목에 매핑된 표준분류 유무 조회
     * @param evltItemNo
     * @return
     */
    boolean checkEvltItemMappingStdCtg(String evltItemNo);

    /**
     * 리뷰평가항목관리 > 평가항목관리 > 매핑된 표준분류 목록 조회
     * @param evltItemNo
     * @return
     */
    List<ReviewEvaluationItemMgmtResponse> getMappingStdCtgList(String evltItemNo);

}
