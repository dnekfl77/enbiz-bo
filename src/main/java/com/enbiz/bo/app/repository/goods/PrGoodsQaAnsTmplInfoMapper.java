package com.enbiz.bo.app.repository.goods;

import java.util.List;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.goods.GoodsQATemplateMgmtRequest;
import com.enbiz.bo.app.dto.response.goods.GoodsQATemplateMgmtResponse;
import com.enbiz.bo.app.entity.PrGoodsQaAnsTmplInfo;

/**
 * 상품Q&A답변 템플릿정보 DAO
 */
@Repository
@Lazy
public interface PrGoodsQaAnsTmplInfoMapper {

    /**
     * 상품Q&A관리 > 상품Q&A상세 > 상품QA 답변 템플릿 목록 조회
     * @return
     */
    List<PrGoodsQaAnsTmplInfo> getGoodsAllQAAnsTmplList();

    /**
     * 상품Q&A관리 > 상품Q&A답변 템플릿관리 > 상품Q&A답변 템플릿 목록 수 조회
     * @param request
     * @return
     */
    int getGoodsQAAnsTmplListCount(GoodsQATemplateMgmtRequest request);

    /**
     * 상품Q&A관리 > 상품Q&A답변 템플릿관리 > 상품Q&A답변 템플릿 목록 조회
     * @param request
     * @return
     */
    List<GoodsQATemplateMgmtResponse> getGoodsQAAnsTmplList(GoodsQATemplateMgmtRequest request);

    /**
     * 상품Q&A관리 > 상품Q&A답변 템플릿관리 > 상품Q&A답변 템플릿 정보 조회
     * @param ansTmplNo
     * @return
     */
    PrGoodsQaAnsTmplInfo getGoodsQAAnsTmplInfo(String ansTmplNo);

}
