package com.enbiz.bo.app.service.goods;

import java.util.List;

import com.enbiz.bo.app.dto.request.goods.GoodsQADetailRequest;
import com.enbiz.bo.app.dto.request.goods.GoodsQAMgmtRequest;
import com.enbiz.bo.app.dto.response.goods.GoodsQADetailResponse;
import com.enbiz.bo.app.dto.response.goods.GoodsQAMgmtResponse;
import com.enbiz.bo.app.entity.PrGoodsQaAnsInfo;
import com.enbiz.bo.app.entity.PrGoodsQaAnsTmplInfo;

/**
 * 상품Q&A목록 Service
 */
public interface GoodsQAMgmtService {

    /**
     * 상품Q&A목록 수 조회
     * @param request
     * @return
     * @throws Exception
     */
    int getGoodsQAListCount(GoodsQAMgmtRequest request) throws Exception;

    /**
     * 상품Q&A목록 조회
     * @param request
     * @return
     * @throws Exception
     */
    List<GoodsQAMgmtResponse> getGoodsQAList(GoodsQAMgmtRequest request) throws Exception;

    /**
     * 상품Q&A 미처리 현황 조회
     * @param request
     * @return
     * @throws Exception
     */
    List<GoodsQAMgmtResponse> getUnProcessedGoodsQA(GoodsQAMgmtRequest request) throws Exception;

    /**
     * 상품Q&A 일괄 전시상태 변경
     * @param request
     * @throws Exception
     */
    void modifyMultipleQADisplayState(GoodsQAMgmtRequest request) throws Exception;

    /**
     * 상품Q&A상세 > 상품QA 질문정보 조회
     * @param questNo
     * @return
     * @throws Exception
     */
    GoodsQADetailResponse getGoodsQuestionInfo(String questNo) throws Exception;

    /**
     * 상품Q&A상세 > 상품QA 답변목록 조회
     * @param questNo
     * @return
     * @throws Exception
     */
    List<PrGoodsQaAnsInfo> getGoodsAnswerList(String questNo) throws Exception;

    /**
     * 상품Q&A상세 > 상품QA 답변 템플릿 목록 조회
     * @return
     * @throws Exception
     */
    List<PrGoodsQaAnsTmplInfo> getGoodsAllQATemplateList() throws Exception;

    /**
     * 상품Q&A상세 > 상품QA 답변 추가/수정
     * @param request
     * @throws Exception
     */
    void saveGoodsAnswer(GoodsQADetailRequest request) throws Exception;

    /**
     * 상품Q&A상세 > 질문 전시상태 변경
     * @param request
     * @throws Exception
     */
    void modifyQADisplayState(GoodsQADetailRequest request) throws Exception;

    /**
     * 상품Q&A상세 > 고객센터이관팝업 > 고객센터이관
     * @param request
     * @throws Exception
     */
    void transferGoodsQuestion(GoodsQADetailRequest request) throws Exception;

}
