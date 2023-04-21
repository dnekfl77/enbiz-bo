package com.enbiz.bo.app.repository.display;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.PrSitePopupInfo;

@Repository
@Lazy
public interface PrSitePopupInfoTrxMapper {

    /**
     * 팝업 관리 목록 삭제
     */
    void deleteSitePopupList(String popupNo);

    /**
     * 팝업 대상 목록 삭제
     */
    void deleteSitePopupTgtScrnList(String popupNo);

    /**
     * 팝업 채널 적용 목록 삭제
     */
    void deleteSitePopupChlAplyInfoList(String popupNo);

    /**
     * 팝업 등록
     * @return
     */
    void prSitePopupInfoInsert(PrSitePopupInfo prSitePopupInfo);

    /**
     * 팝업 수정
     * @return
     */
    void prSitePopupInfoUpdate(PrSitePopupInfo prSitePopupInfo);

}
