package com.enbiz.bo.app.service.goods;

import java.util.List;

import com.enbiz.bo.app.dto.request.goods.GoodsQATemplateMgmtRequest;
import com.enbiz.bo.app.dto.response.goods.GoodsQATemplateMgmtResponse;
import com.enbiz.bo.app.entity.PrGoodsQaAnsTmplInfo;

/**
 * 상품Q&A답변 템플릿관리 Service
 */
public interface GoodsQATemplateMgmtService {

    /**
     * 상품Q&A답변 템플릿 목록 수 조회
     * @param request
     * @return
     * @throws Exception
     */
    int getGoodsQATemplateListCount(GoodsQATemplateMgmtRequest request) throws Exception;

    /**
     * 상품Q&A답변 템플릿 목록 조회
     * @param request
     * @return
     * @throws Exception
     */
    List<GoodsQATemplateMgmtResponse> getGoodsQATemplateList(GoodsQATemplateMgmtRequest request) throws Exception;

    /**
     * 상품Q&A답변 템플릿 정보 조회
     * @param ansTmplNo
     * @return
     * @throws Exception
     */
    PrGoodsQaAnsTmplInfo getGoodsQATemplateInfo(String ansTmplNo) throws Exception;

    /**
     * 상품Q&A답변 템플릿 목록 저장
     * @param createList
     * @param updateList
     * @param deleteList
     * @throws Exception
     */
    void saveGoodsQATemplateList(List<PrGoodsQaAnsTmplInfo> createList, List<PrGoodsQaAnsTmplInfo> updateList, List<PrGoodsQaAnsTmplInfo> deleteList) throws Exception;

}
