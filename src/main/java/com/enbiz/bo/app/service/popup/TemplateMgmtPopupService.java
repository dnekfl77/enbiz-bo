package com.enbiz.bo.app.service.popup;

import java.util.List;

import com.enbiz.bo.app.dto.request.display.PrTmplBaseRequest;
import com.enbiz.bo.app.dto.response.display.PrTmplBaseResponse;

/**
 * 템플릿 관리 서비스
 */
public interface TemplateMgmtPopupService {

    /**
     * 템플릿 목록 조회
     * @param  prTmplBaseRequest
     * @return 전시 카테고리 목록
     * @throws Exception
     */
    List<PrTmplBaseResponse> getTemplateList(PrTmplBaseRequest prTmplBaseRequest) throws Exception;

    /**
     * 템플릿 목록 수 조회
     * @param  prTmplBaseRequest
     * @return 전시 카테고리 목록 수
     * @throws Exception
     */
    int getTemplateListCount(PrTmplBaseRequest prTmplBaseRequest) throws Exception;

}
