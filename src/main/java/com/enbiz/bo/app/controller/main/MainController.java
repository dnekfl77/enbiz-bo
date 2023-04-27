package com.enbiz.bo.app.controller.main;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.enbiz.bo.app.controller.BaseController;
import com.enbiz.bo.app.dto.request.login.LoginRequest;
import com.enbiz.bo.app.dto.request.menu.TopMenuRequest;
import com.enbiz.bo.app.dto.response.menu.LeftMenuResponse;
import com.enbiz.bo.app.dto.response.menu.TopMenuResponse;
import com.enbiz.bo.app.service.code.CodeService;
import com.enbiz.bo.app.service.common.AdminCommonService;
import com.enbiz.bo.app.service.main.MainService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class MainController extends BaseController{

    private final MainService mainService;
    private final AdminCommonService adminCommonService;
    private final CodeService codeService;

    @RequestMapping("/")
    public String getIndexPage(HttpServletRequest request, Model model) throws Exception {
        return "index";
    }

    @RequestMapping("/main.do")
    public String getMainPage(HttpServletRequest request, Model model, @AuthenticationPrincipal LoginRequest loginRequest)
            throws Exception {
        List<TopMenuResponse> topMenuResponseList = mainService.getTopMenuList(loginRequest);
        model.addAttribute("topMenuResponseList", topMenuResponseList);
        model.addAttribute("userResponseDto", loginRequest);
        return "views/main/mainPage";
    }

    @RequestMapping("/leftMenu.do")
    public String getLeftMenuPage(Model model, TopMenuRequest topMenuRequest,
    		@AuthenticationPrincipal LoginRequest loginRequest) throws Exception {

        topMenuRequest.setJobGrpCd(loginRequest.getJobGrpCd());
        topMenuRequest.setUserGbCd(loginRequest.getUserGbCd());
        topMenuRequest.setSysGbCd(loginRequest.getSysGbCd());
        topMenuRequest.setRtGrpNo(loginRequest.getRtGrpNo());
        topMenuRequest.setUserId(loginRequest.getLoginId());

        List<LeftMenuResponse> leftMenuResponseList = mainService.getLeftMenuList(topMenuRequest);
        model.addAttribute("leftMenuResponseList", leftMenuResponseList);

        return "fragments/container/la-aside-base-cont :: la-aside-base-cont";
    }

    @RequestMapping("/dashboard.do")
    public String getDashboardPage(Model model, TopMenuRequest topMenuRequest,
    		@AuthenticationPrincipal LoginRequest currentUser, HttpServletRequest request) throws Exception {
        return "views/dashboard/dashboard_temp";
    }

    /**
     * 공통팝업 call 페이지 호출
     *
     * @return 공통팝업 호출 화면 jsp
     * @throws Exception
     */
    @RequestMapping("/popupCallPage.do")
    public String popupCallPage(Model model) throws Exception {
        return "views/popup/popupCallPage";
    }
}
