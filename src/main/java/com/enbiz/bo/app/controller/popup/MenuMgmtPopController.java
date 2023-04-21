package com.enbiz.bo.app.controller.popup;

import java.util.List;

import javax.validation.Valid;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.enbiz.bo.app.controller.BaseController;
import com.enbiz.bo.app.dto.request.popup.StRtTgtMenuRequest;
import com.enbiz.bo.app.dto.response.popup.StRtTgtMenuResponse;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.service.popup.MenuMgmtPopupService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 권한대상 관리
 * munu , 화면 , Request , 버튼
 */
@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class MenuMgmtPopController extends BaseController{

    private final MenuMgmtPopupService stRtTgtBaseService;

    /**
     * 메뉴 팝업 조회
     * @param model
     * @param stRtTgtMenuRequest
     * @return
     * @throws Exception
     */
    @GetMapping("/popup/menuMgmt.menuListPopup.do")
    public String menuListPopup(Model model, @Valid StRtTgtMenuRequest stRtTgtMenuRequest) throws Exception {
        List<StRtTgtMenuResponse> menuList = stRtTgtBaseService.getMenuList(stRtTgtMenuRequest);
        RealGridListResponse response = new RealGridListResponse(menuList, menuList.size());
        model.addAttribute("menuList", response.toJsonString());
        model.addAttribute("requestData", stRtTgtMenuRequest);
        return "views/popup/menuListPopup";
    }

}
