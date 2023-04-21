package com.enbiz.bo.app.repository.display;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.PrSitePopupChlAplyInfo;

@Repository
@Lazy
public interface PrSitePopupChlAplyInfoTrxMapper {
    /**
     * 채널적용정보 등록
     */
    void insertSitePopupChlAplyInfo(PrSitePopupChlAplyInfo prSitePopupChlAplyInfo);

    /**
     * 채널적용정보 수정
     */
    void updateSitePopupChlAplyInfo(PrSitePopupChlAplyInfo prSitePopupChlAplyInfo);

    /**
     * 채널적용정보 삭제
     */
    void deleteSitePopupChlAplyInfo(PrSitePopupChlAplyInfo prSitePopupChlAplyInfo);
}
