package com.enbiz.bo.app.service.popup;

import java.util.List;

import com.enbiz.bo.app.dto.response.popup.CcSitePopupResponse;

/**
 * 사이트 팝업 서비스
 */
public interface SiteManagementPopService {

    /**
     * 사이트 팝업 목록 조회
     * @return
     * @throws Exception
     */
    List<CcSitePopupResponse> getSitePopupList() throws Exception;
}
