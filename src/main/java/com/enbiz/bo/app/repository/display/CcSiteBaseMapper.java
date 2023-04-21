package com.enbiz.bo.app.repository.display;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.display.CcSiteBaseRequest;
import com.enbiz.bo.app.dto.response.display.CcSiteBaseResponse;
import com.enbiz.bo.app.dto.response.popup.CcSitePopupResponse;
import com.enbiz.bo.app.entity.CcSiteBase;

import java.util.List;

@Repository
@Lazy
public interface CcSiteBaseMapper {

    /**
     * 사이트관리 _ 사이트명 셀렉트박스 조회
     * @return
     * @throws Exception
     */
    List<CcSiteBaseResponse> getSiteNmList() throws Exception;

    /**
     * 사이트관리 목록
     * @param ccSiteBaseRequest
     * @return
     * @throws Exception
     */
    List<CcSiteBaseResponse> getSiteBaseList(CcSiteBaseRequest ccSiteBaseRequest) throws Exception;

    /**
     * 사이트관리 목록 count
     * @param ccSiteBaseRequest
     * @return
     */
    int getSiteBaseListCount(CcSiteBaseRequest ccSiteBaseRequest);

    /**
     * 사이트 팝업 목록 조회
     * @return
     * @throws Exception
     */
    List<CcSitePopupResponse> getSitePopupList() throws Exception;

}
