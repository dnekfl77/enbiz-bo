package com.enbiz.bo.app.repository.display;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.display.PrSitePopupInfoRequest;
import com.enbiz.bo.app.dto.response.display.PrSitePopupInfoResponse;

import java.util.List;

@Repository
@Lazy
public interface PrSitePopupInfoMapper {

    /**
     * 팝업 관리 목록
     * @param prSitePopupInfoRequest
     * @return
     */
    List<PrSitePopupInfoResponse> getSitePopupList(PrSitePopupInfoRequest prSitePopupInfoRequest);

    /**
     * 팝업 관리 목록 수
     * @param prSitePopupInfoRequest
     * @return
     */
    int getSitePopupListCount(PrSitePopupInfoRequest prSitePopupInfoRequest);

    /**
     * 팝업 관리 _ 수정 팝업 화면 _ 상세조회 호출
     * @param prSitePopupInfoRequest
     * @return
     */
    PrSitePopupInfoResponse getSitePopupDetail(PrSitePopupInfoRequest prSitePopupInfoRequest);

}
