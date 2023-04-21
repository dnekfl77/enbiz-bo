package com.enbiz.bo.app.controller.main;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.enbiz.bo.app.controller.BaseController;
import com.enbiz.bo.app.dto.ajax.JSONResponseEntity;
import com.enbiz.bo.app.dto.login.CurrentUser;
import com.enbiz.bo.app.dto.request.dashboard.DashboardNoticeRequest;
import com.enbiz.bo.app.dto.request.login.LoginRequest;
import com.enbiz.bo.app.dto.request.menu.TopMenuRequest;
import com.enbiz.bo.app.dto.request.system.UserFavoriteMenuRequest;
import com.enbiz.bo.app.dto.response.dashboard.DashboardNoticeResponse;
import com.enbiz.bo.app.dto.response.menu.LeftMenuResponse;
import com.enbiz.bo.app.dto.response.menu.TopMenuResponse;
import com.enbiz.bo.app.entity.StStdCd;
import com.enbiz.bo.app.enums.CM004;
import com.enbiz.bo.app.enums.UR005;
import com.enbiz.bo.app.service.code.CodeService;
import com.enbiz.bo.app.service.common.AdminCommonService;
import com.enbiz.bo.app.service.main.MainService;
import com.enbiz.bo.app.service.system.SystemNoticeMgmtService;
import com.enbiz.bo.app.service.system.UserFavoriteMenuMgmtService;
import com.enbiz.bo.base.annotation.SkipAuthorityCheck;
import com.enbiz.common.base.exception.MessageResolver;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class MainController extends BaseController{

    private final MainService mainService;
    private final UserFavoriteMenuMgmtService userFavoriteMenuMgmtService;
    private final SystemNoticeMgmtService systemNoticeMgmtService;
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

    @RequestMapping("/fvtMenu.do")
    public String getFvtMenuPage(Model model, TopMenuRequest topMenuRequest, @AuthenticationPrincipal LoginRequest loginRequest) throws Exception {
        topMenuRequest.setUserId(loginRequest.getLoginId());
        List<LeftMenuResponse> fvtMenuResponseList = userFavoriteMenuMgmtService.getFavoriteMenu(topMenuRequest);
        model.addAttribute("fvtMenuResponseList", fvtMenuResponseList);
        return "fragments/container/la-aside-fvt-cont :: la-aside-fvt-cont";
    }

    @RequestMapping("/dashboard.do")
    public String getDashboardPage(Model model, TopMenuRequest topMenuRequest,
    		@AuthenticationPrincipal LoginRequest currentUser, HttpServletRequest request) throws Exception {

    	/* 대시보드는 한섬플젝에서 바뀔거기때문에 API 만들지 않았음. 
        //상품현황
        int goodsTodayNewCnt = adminCommonService.getDashboardGoodsTodayNewCnt();
        int goodsTodaySoldOutCnt = adminCommonService.getDashboardGoodsTodaySoldOutCnt();
        int goods2WeekSellingCnt = adminCommonService.getDashboardGoods2WeekSellingCnt();
        int goods2WeekSoldOutCnt = adminCommonService.getDashboardGoods2WeekSoldOutCnt();

        //S 공지사항 조회 - 제목, 등록일, 조회수
        String loginId = currentUser.getLoginId();
        String sysGbCd = currentUser.getSysGbCd();

        DashboardNoticeRequest dashboardNoticeRequest = new DashboardNoticeRequest();

        dashboardNoticeRequest.setSysGbCd(sysGbCd);
        dashboardNoticeRequest.setBbGbCd(CM004.NOTICE.getCd());//100:공지사항, 200:자료실, 300:FAQ
        dashboardNoticeRequest.setStrDtm(DateTimeUtil.getToDay());
        dashboardNoticeRequest.setSysRegId(loginId);
        dashboardNoticeRequest.setRowsPerPage(Paging.ROWS_PER_PAGE_4.getValue());
        dashboardNoticeRequest.setPageIdx(Paging.PAGE_INDEX.getValue());

        List<DashboardNoticeResponse> dashboardNoticeResponseList =
                systemNoticeMgmtService.getSystemNoticeInfoListByToday(dashboardNoticeRequest);
        //E 공지사항 조회

        //팝업 공지 조회
        dashboardNoticeRequest.setPopYn("Y");
        List<DashboardNoticeResponse> popupNoticeList =
                systemNoticeMgmtService.getSystemNoticeInfoListByToday(dashboardNoticeRequest);

        Iterator<DashboardNoticeResponse> iter = popupNoticeList.iterator();
        while(iter.hasNext()) {
        	DashboardNoticeResponse popupNotice = iter.next();
        	if (CookieUtil.getValue("pop-notice-"+popupNotice.getBbcNo()) != null) {
        		iter.remove();
        	} else {
        		//첨부파일 조회
        		List<SystemNoticeAttachFileResponse> fileList = systemNoticeMgmtService.getAttachFileList(popupNotice.getBbcNo());
        		popupNotice.setFileList(fileList);
        	}
        }

        //S 업무알림 조회 - 긴급여부, 진행상태, 발신일시
        DashboardAlarmRequest dashboardAlarmRequest = new DashboardAlarmRequest();
        dashboardAlarmRequest.setLoginId(loginId);

        List<DashboardAlarmResponse> dashboardAlarmResponsesList =
                adminCommonService.getDashboardAlarmList(dashboardAlarmRequest);
        //E 업무알림 조회 - 긴급여부, 진행상태, 발신일시

        //S 상품Q&A 미 처리현황 조회
        List<DashboardGoodsQnaIngResponse> dashboardGoodsQnaIngResponseList =
                adminCommonService.getDashboardGoodsQnaIngList();
        //E 상품Q&A 미 처리현황 조회

        //S 위탁업체 상품 승인 현황
        List<DashboardTrustVendorGoodsApprovalResponse> dashboardTrustVendorGoodsApprovalResponseList =
                adminCommonService.getDashboardTrustVendorGoodsApprovalList();
        //E 상품Q&A 미 처리현황 조회

        model.addAttribute("goodsTodayNewCnt", goodsTodayNewCnt);
        model.addAttribute("goodsTodaySoldOutCnt", goodsTodaySoldOutCnt);
        model.addAttribute("goods2WeekSellingCnt", goods2WeekSellingCnt);
        model.addAttribute("goods2WeekSoldOutCnt", goods2WeekSoldOutCnt);
        model.addAttribute("noticeList", dashboardNoticeResponseList);
        model.addAttribute("alarmList", dashboardAlarmResponsesList);
        model.addAttribute("goodsQnaList", dashboardGoodsQnaIngResponseList);
        model.addAttribute("approvalList", dashboardTrustVendorGoodsApprovalResponseList);
        model.addAttribute("popupNotice", popupNoticeList);
        */

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

    @RequestMapping("/main/sysNtcDetailPopup.do")
    public String sysNtcDetailPopup(Model model, String bbcNo, @AuthenticationPrincipal CurrentUser currentUser) throws Exception {

    	String loginId = currentUser.getLoginId();

        DashboardNoticeRequest dashboardNoticeRequest = new DashboardNoticeRequest();
        dashboardNoticeRequest.setSysGbCd(UR005.BACK_OFFICE.getCd());       //11:백오피스, 12:고객센터, 31:파트너, 32:제휴사
        dashboardNoticeRequest.setBbGbCd(CM004.NOTICE.getCd());       //100:공지사항, 200:자료실, 300:FAQ
        dashboardNoticeRequest.setStrDtm(LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd")));
        dashboardNoticeRequest.setSysRegId(loginId);
        dashboardNoticeRequest.setBbcNo(bbcNo);

        DashboardNoticeResponse bbInfo = systemNoticeMgmtService.getSystemNoticeInfoListByTodayDetail(dashboardNoticeRequest);

        Map<String, List<StStdCd>> codeList = codeService.getStStdCd("CM004,CM006");
        model.addAttribute("codeList", codeList);
    	model.addAttribute("bbInfo", bbInfo);
    	model.addAttribute("fileList", systemNoticeMgmtService.getAttachFileList(bbcNo));
    	return "views/popup/sysNtcDetailPopup";
    }

    /**
     * 매뉴 > 우클릭 > 즐겨찾기 추가
     * @param UserFavoriteMenuRequest
     * @return
     * @throws Exception
     */
    @RequestMapping("/main/addBookMark.do")
    @ResponseBody
    @SkipAuthorityCheck
    public JSONResponseEntity<Void> addBookMark(UserFavoriteMenuRequest UserFavoriteMenuRequest) throws Exception {
        JSONResponseEntity<Void> jsonResponseEntity = null;
        int result = userFavoriteMenuMgmtService.checkDuplicateUserFavoriteMenu(UserFavoriteMenuRequest);
        if(result == 0){
        	userFavoriteMenuMgmtService.registUserFavoriteMenu(UserFavoriteMenuRequest);
            jsonResponseEntity = new JSONResponseEntity<Void>(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
            jsonResponseEntity.setSucceeded(true);
        } else {
            jsonResponseEntity = new JSONResponseEntity<Void>(MessageResolver.getMessage("userFavoriteMenuMgmt.message.favorites.check"));
            jsonResponseEntity.setSucceeded(false);
        }
        return jsonResponseEntity;
    }
}
