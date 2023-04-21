package com.enbiz.bo.app.repository.goods;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.marketing.PresentationDuplicateRequest;
import com.enbiz.bo.app.dto.request.marketing.PresentationRequest;
import com.enbiz.bo.app.dto.response.marketing.PresentationResponse;
import com.enbiz.bo.app.entity.PrPrestHist;

@Repository
@Lazy
public interface PrPrestHistMapper {

    /**
     * 증점품관리 > 증정품 목록 조회
     * @param request
     * @return
     */
    List<PresentationResponse> getPresentationList(PresentationRequest request) throws Exception;

    /**
     * 증정품관리 > 증정품 목록 수 조회
     * @param request
     * @return
     */
    int getPresentationListCount(PresentationRequest request) throws Exception;

    /**
     * 증정품관리 > 기간내 중복 증정품 등록 check
     * @param request
     * @return
     * @throws Exception
     */
    boolean checkDuplicate(PresentationDuplicateRequest request) throws Exception;

    /**
     * 일반상품 상세 > 증정품 목록 조회
     * @param goodsNo
     * @return
     */
    List<PrPrestHist> getPresentList(String goodsNo);

}
