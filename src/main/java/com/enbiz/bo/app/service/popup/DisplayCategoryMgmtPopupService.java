package com.enbiz.bo.app.service.popup;

import java.util.List;

import com.enbiz.bo.app.dto.request.display.PrDispCtgBaseRequest;
import com.enbiz.bo.app.dto.response.display.PrDispCtgBaseResponse;

/**
 * 전시 카테고리 관리 서비스
 */
public interface DisplayCategoryMgmtPopupService {

    /**
     * 사이트 리스트 조회
     * @return
     * @throws Exception
     */
    List<PrDispCtgBaseResponse> getCcSiteBase() throws Exception;

    /**
     * 전시 카테고리 목록 조회
     * @param  prDispCtgBaseRequest
     * @return 전시 카테고리 목록
     * @throws Exception
     */
    List<PrDispCtgBaseResponse> getDisplayCategoryList(PrDispCtgBaseRequest prDispCtgBaseRequest) throws Exception;

    /**
     * 전시 카테고리 목록 수 조회
     * @param  prDispCtgBaseRequest
     * @return 전시 카테고리 목록 수
     * @throws Exception
     */
    int getDisplayCategoryListCount(PrDispCtgBaseRequest prDispCtgBaseRequest) throws Exception;

    /**
     * 전시 카테고리 Tree 목록 조회
     * @param  prDispCtgBaseRequest
     * @return 전시 카테고리 목록
     * @throws Exception
     */
    List<PrDispCtgBaseResponse> getDisplayCategoryTreeList(PrDispCtgBaseRequest prDispCtgBaseRequest) throws Exception;

}
