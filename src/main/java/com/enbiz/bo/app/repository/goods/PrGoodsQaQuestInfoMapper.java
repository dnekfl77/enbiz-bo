package com.enbiz.bo.app.repository.goods;

import java.util.List;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.goods.GoodsQAMgmtRequest;
import com.enbiz.bo.app.dto.response.goods.GoodsQADetailResponse;
import com.enbiz.bo.app.dto.response.goods.GoodsQAMgmtResponse;
import com.enbiz.bo.app.entity.PrGoodsQaQuestInfo;

/**
 * 상품Q&A 질문정보 DAO
 */
@Repository
@Lazy
public interface PrGoodsQaQuestInfoMapper {

    /**
     * 상품Q&A관리 > 상품Q&A목록 수 조회
     * @param request
     * @return
     */
    int getGoodsQAListCount(GoodsQAMgmtRequest request);

    /**
     * 상품Q&A관리 > 상품Q&A목록 조회
     * @param request
     * @return
     */
    List<GoodsQAMgmtResponse> getGoodsQAList(GoodsQAMgmtRequest request);

    /**
     * 상품Q&A관리 > 상품Q&A 미처리 현황 조회
     * @param request
     * @return
     */
    List<GoodsQAMgmtResponse> getUnProcessedStatus(GoodsQAMgmtRequest request);

    /**
     * 상품Q&A관리 > 상품Q&A상세 > 상품QA 질문정보 조회
     * @param questNo
     * @return
     */
    GoodsQADetailResponse getGoodsQAQuestInfo(String questNo);

}
