package com.enbiz.bo.app.service.popup;

import java.util.List;

import com.enbiz.bo.app.dto.request.popup.StZipNoPopupRequest;
import com.enbiz.bo.app.dto.response.popup.StZipNoPopupResponse;

/**
 * 우편번호 팝업 서비스
 */
public interface ZipCodeMgmtPopupService {

    /**
     * 우편번호 팝업 목록 조회
     * @param req
     * @return
     * @throws Exception
     */
    List<StZipNoPopupResponse> getZipNoPopupList(StZipNoPopupRequest req);

    /**
     * 우편번호 팝업 목록 조회 건수
     * @param req
     * @return
     * @throws Exception
     */
    int getZipNoPopupListCount(StZipNoPopupRequest req);

}
