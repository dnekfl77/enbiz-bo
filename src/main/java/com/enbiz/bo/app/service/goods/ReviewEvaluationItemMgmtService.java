package com.enbiz.bo.app.service.goods;

import java.util.List;

import com.enbiz.bo.app.dto.request.goods.ReviewEvaluationItemMgmtRequest;
import com.enbiz.bo.app.dto.response.display.PrStdCtgResponse;
import com.enbiz.bo.app.dto.response.goods.ReviewEvaluationItemMgmtResponse;
import com.enbiz.bo.app.entity.PrEvltItemCd;
import com.enbiz.bo.app.entity.PrEvltValInfo;
import com.enbiz.bo.app.entity.PrStdCtgEvltItemInfo;

/**
 *  리뷰평가항목관리 Service
 */
public interface ReviewEvaluationItemMgmtService {

    /**
     * 평가항목-표준분류 매핑관리 > 표준분류목록 조회
     * @return
     * @throws Exception
     */
    List<PrStdCtgResponse> getStandardCategoryList() throws Exception;

    /**
     * 평가항목-표준분류 매핑관리 > 평가항목매핑목록 수 조회
     * @param request
     * @return
     * @throws Exception
     */
    int getReviewEvaluationItemListCountByCategory(ReviewEvaluationItemMgmtRequest request) throws Exception;

    /**
     * 평가항목-표준분류 매핑관리 > 평가항목매핑목록 조회
     * @param request
     * @return
     * @throws Exception
     */
    List<ReviewEvaluationItemMgmtResponse> getReviewEvaluationItemListByCategory(ReviewEvaluationItemMgmtRequest request) throws Exception;

    /**
     * 평가항목-표준분류 매핑관리 > 평가항목매핑목록 저장
     * @param createList
     * @param updateList
     * @param deleteList
     * @throws Exception
     */
    void saveReviewEvaluationItemListByCategory(List<PrStdCtgEvltItemInfo> createList, List<PrStdCtgEvltItemInfo> updateList, List<PrStdCtgEvltItemInfo> deleteList) throws Exception;

    /**
     * 평가항목-표준분류 매핑관리 > 평가항목조회팝업 > 추가대상 평가항목목록 수 조회
     * @param request
     * @return
     * @throws Exception
     */
    int getReviewEvaluationItemListCountForAdd(ReviewEvaluationItemMgmtRequest request) throws Exception;

    /**
     * 평가항목-표준분류 매핑관리 > 평가항목조회팝업 > 추가대상 평가항목목록 조회
     * @param request
     * @return
     * @throws Exception
     */
    List<ReviewEvaluationItemMgmtResponse> getReviewEvaluationItemListForAdd(ReviewEvaluationItemMgmtRequest request) throws Exception;

    /**
     * 평가항목-표준분류 매핑관리 > 평가항목상세팝업 > 평가항목,평가값 목록조회
     * @param evltItemNo
     * @return
     * @throws Exception
     */
    List<ReviewEvaluationItemMgmtResponse> getReviewEvaluationItemValueList(String evltItemNo) throws Exception;

    /**
     * 평가항목관리 > 평가항목 목록 수 조회
     * @param request
     * @return
     * @throws Exception
     */
    int getReviewEvaluationItemListCount(ReviewEvaluationItemMgmtRequest request) throws Exception;

    /**
     * 평가항목관리 > 평가항목 목록 수 조회
     * @param request
     * @return
     * @throws Exception
     */
    List<ReviewEvaluationItemMgmtResponse> getReviewEvaluationItemList(ReviewEvaluationItemMgmtRequest request) throws Exception;

    /**
     * 평가항목관리 > 평가항목 목록 저장
     * @param createList
     * @param updateList
     * @throws Exception
     */
    void saveReviewEvaluationItemList(List<PrEvltItemCd> createList, List<PrEvltItemCd> updateList) throws Exception;

    /**
     * 평가항목관리 > 매핑된 표준분류 목록 조회
     * @param evltItemNo
     * @return
     * @throws Exception
     */
    List<ReviewEvaluationItemMgmtResponse> getMappedCategoryListToEvaluationItem(String evltItemNo) throws Exception;

    /**
     * 평가항목관리 > 평가값 목록 수 조회
     * @param request
     * @return
     * @throws Exception
     */
    int getReviewEvaluationValueListCount(ReviewEvaluationItemMgmtRequest request) throws Exception;

    /**
     * 평가항목관리 > 평가값 목록 조회
     * @param request
     * @return
     * @throws Exception
     */
    List<ReviewEvaluationItemMgmtResponse> getReviewEvaluationValueList(ReviewEvaluationItemMgmtRequest request) throws Exception;

    /**
     * 평가항목관리 > 평가값 목록 저장
     * @param createList
     * @param updateList
     * @param deleteList
     * @throws Exception
     */
    void saveReviewEvaluationValueList(List<PrEvltValInfo> createList, List<PrEvltValInfo> updateList, List<PrEvltValInfo> deleteList) throws Exception;

}
