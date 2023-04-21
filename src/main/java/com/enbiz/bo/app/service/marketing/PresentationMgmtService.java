package com.enbiz.bo.app.service.marketing;

import java.util.List;

import com.enbiz.bo.app.dto.request.marketing.PresentationDuplicateRequest;
import com.enbiz.bo.app.dto.request.marketing.PresentationRequest;
import com.enbiz.bo.app.dto.response.marketing.PresentationResponse;
import com.enbiz.bo.app.entity.PrPrestHist;

/**
 * 증정품 관리 Service
 */
public interface PresentationMgmtService {

    /**
     * 증점품 관리 목록 조회
     * @param request
     * @return
     */
    List<PresentationResponse> getPresentationList(PresentationRequest request) throws Exception;

    /**
     * 증정품 관리 목록수 조회
     * @param request
     * @return
     */
    int getPresentationListCount(PresentationRequest request) throws Exception;

    /**
     * 증정품 이력
     * @param createList 추가 목록
     * @param updateList 수정 목록
     * @param deleteList 삭제 목록
     * @throws Exception
     */
    void savePresentation(List<PrPrestHist> createList, List<PrPrestHist> updateList, List<PrPrestHist> deleteList) throws Exception;

    /**
     * 기간내 중복 증정품  등록 check
     * @param request
     * @return
     * @throws Exception
     */
    List<String> checkDuplicate(List<PresentationDuplicateRequest> request) throws Exception;
}
