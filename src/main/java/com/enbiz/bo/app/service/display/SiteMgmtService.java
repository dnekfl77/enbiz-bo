package com.enbiz.bo.app.service.display;

import java.util.List;

import com.enbiz.bo.app.dto.request.display.CcSiteBaseRequest;
import com.enbiz.bo.app.dto.response.display.CcSiteBaseResponse;
import com.enbiz.bo.app.entity.CcSiteBase;

/**
 * 사이트관리 서비스
 */
public interface SiteMgmtService {

    /**
     * 사이트관리 _ 사이트명 셀렉트박스 조회
     * @return
     * @throws Exception
     */
    List<CcSiteBaseResponse> getSiteNmList() throws Exception;

    /**
     * 사이트관리 목록 조회
     * @param ccSiteBaseRequest
     * @return
     * @throws Exception
     */
    List<CcSiteBaseResponse> getSiteBaseList(CcSiteBaseRequest ccSiteBaseRequest) throws Exception;

    /**
     * 사이트관리 목록 수 조회
     * @param  ccSiteBaseRequest
     * @return 사이트관리 목록 수
     * @throws Exception
     */
    int getSiteBaseListCount(CcSiteBaseRequest ccSiteBaseRequest) throws Exception;

    /**
     * 사이트관리 저장
     * @param createList
     * @param updateList
     * @throws Exception
     */
    void registCUD(List<CcSiteBase> createList, List<CcSiteBase> updateList) throws Exception;

}
