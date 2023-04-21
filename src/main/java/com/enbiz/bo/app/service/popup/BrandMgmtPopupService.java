package com.enbiz.bo.app.service.popup;

import java.util.List;

import com.enbiz.bo.app.dto.request.popup.PrBrandMstRequest;
import com.enbiz.bo.app.dto.response.popup.PrBrandMstResponse;

/**
 * 브랜드 팝업 관리 서비스
 */
public interface BrandMgmtPopupService {

    /**
     * 브랜드 목록 수 조회
     * @param prBrandMstRequest
     * @return 브랜드 목록 수
     * @throws Exception
     */
    int getBrandListCount(PrBrandMstRequest prBrandMstRequest) throws Exception;

    /**
     * 브랜드 목록 조회
     * @param prBrandMstRequest
     * @return 브랜드 목록
     * @throws Exception
     */
    List<PrBrandMstResponse> getBrandList(PrBrandMstRequest prBrandMstRequest) throws Exception;
}
