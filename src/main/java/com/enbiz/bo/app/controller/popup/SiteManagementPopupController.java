package com.enbiz.bo.app.controller.popup;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.enbiz.bo.app.controller.BaseController;
import com.enbiz.bo.app.dto.response.popup.CcSitePopupResponse;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.service.popup.SiteManagementPopService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 사이트 팝업
 */
@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class SiteManagementPopupController extends BaseController {

    private final SiteManagementPopService siteManagementPopService;

    /**
     * 사이트 조회 팝업
     * @param model
     * @return
     * @throws Exception
     */
    @GetMapping("/popup/siteManagement.siteListPopup.do")
    public String siteListPopup(Model model) throws Exception {

        List<CcSitePopupResponse> sitePopupList = siteManagementPopService.getSitePopupList();
        RealGridListResponse response = new RealGridListResponse(sitePopupList, sitePopupList.size());
        model.addAttribute("sitePopupList", response.toJsonString());

        return "views/popup/siteListPopup";
    }

}
