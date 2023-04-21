package com.enbiz.bo.app.service.popup;

import java.util.List;

import com.enbiz.bo.app.dto.request.popup.StRtTgtMenuRequest;
import com.enbiz.bo.app.dto.response.popup.StRtTgtMenuResponse;

/**
 * 권한대상 관리
 * munu , 화면 , Request , 버튼
 */
public interface MenuMgmtPopupService {

    /**
     * 메뉴 조회
     * @param StRtTgtMenuResponse
     * @return 메뉴 조회
     * @throws Exception
     */
    List<StRtTgtMenuResponse> getMenuList(StRtTgtMenuRequest stRtTgtMenuRequest);
}
