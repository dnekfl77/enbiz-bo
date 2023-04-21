package com.enbiz.bo.app.controller.marketing;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.context.annotation.Lazy;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.enbiz.bo.app.controller.BaseController;
import com.enbiz.bo.app.dto.ajax.JSONResponseEntity;
import com.enbiz.bo.app.dto.request.system.NoticeMessageInfoRequest;
import com.enbiz.bo.app.dto.request.system.NoticeMessageInfoSaveRequest;
import com.enbiz.bo.app.dto.response.display.CcSiteBaseResponse;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.dto.response.system.NoticeMessageInfoResponse;
import com.enbiz.bo.app.entity.StStdCd;
import com.enbiz.bo.app.service.code.CodeService;
import com.enbiz.bo.app.service.display.SiteMgmtService;
import com.enbiz.bo.app.service.marketing.NoticeMessageMgmtService;
import com.enbiz.common.base.exception.MessageResolver;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 알림메세지 관리
 */
@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class NoticeMessageMgmtController extends BaseController {

    private final NoticeMessageMgmtService noticeMessageMgmtService;
    private final SiteMgmtService siteMgmtService;
    private final CodeService codeService;

    /**
     * 알림메시지 관리 화면 호출
     *
     * @return 알림메시지 관리 화면
     * @throws Exception
     */
    @GetMapping("/system/noticeMessageMgmt.noticeMessageMgmtView.do")
    public String notiMessageListPage(HttpServletResponse response, Model model) throws Exception {
        Map<String, List<StStdCd>> codeList = codeService.getStStdCd("CH008");
        model.addAttribute("codeList", codeList);
        return "views/system/noticeMessageMgmtView";
    }

    /**
     * 알림메시지 목록 조회
     *
     * @param NoticeMessageInfoRequest
     * @return realGridListResponse
     * @throws Exception
     */
    @GetMapping(value = "/system/noticeMessageMgmt.getNoticeMessageList.do", produces = "application/json;charset=UTF-8")
    @ResponseBody
    public RealGridListResponse getNotiMsgList(NoticeMessageInfoRequest NoticeMessageInfoRequest) throws Exception {
        int totalCount = noticeMessageMgmtService.getNoticeMessageListCount(NoticeMessageInfoRequest);
        List<NoticeMessageInfoResponse> stNtcList = noticeMessageMgmtService.getNoticeMessageList(NoticeMessageInfoRequest);
        RealGridListResponse response = new RealGridListResponse(stNtcList, totalCount);
        return response;
    }

    /**
     * 알림메시지 관리 화면 호출
     *
     * @return 알림메시지 popup
     * @throws Exception
     *
     */
    @GetMapping("/system/noticeMessageMgmt.noticeMessageSaveView.do")
    public String notiMessagePopup(HttpServletRequest request, Model model, NoticeMessageInfoRequest NoticeMessageInfoRequest) throws Exception {
        NoticeMessageInfoResponse stNtcInfo = noticeMessageMgmtService.getNoticeMessageInfo(NoticeMessageInfoRequest).stream().findFirst().orElse(new NoticeMessageInfoResponse());
        Map<String, List<StStdCd>> codeList = codeService.getStStdCd("CH008");
        List<CcSiteBaseResponse> siteNmList = siteMgmtService.getSiteNmList();
        model.addAttribute("codeList", codeList);
        model.addAttribute("stNtcInfo", stNtcInfo);
        model.addAttribute("siteNmList", siteNmList);
        return "views/popup/noticeMessageSaveView";
    }

    /**
     * 알림메시지 등록 수정
     *
     * @return ResponseEntity<String>
     * @throws Exception
     */
    @PostMapping(value = "/system/noticeMessageMgmt.saveNoticeMessageInfo.do", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public JSONResponseEntity<Void> notiMessageSave(NoticeMessageInfoSaveRequest NoticeMessageInfoRequest) throws Exception {
    	noticeMessageMgmtService.saveNoticeMessageInfo(NoticeMessageInfoRequest);
        return new JSONResponseEntity<Void>(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
    }

}
