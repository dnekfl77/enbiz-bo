package com.enbiz.bo.app.controller.display;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.enbiz.bo.app.controller.BaseController;
import com.enbiz.bo.app.dto.ajax.JSONResponseEntity;
import com.enbiz.bo.app.dto.request.display.CcCmAgmtPolcInfoRequest;
import com.enbiz.bo.app.dto.request.login.LoginRequest;
import com.enbiz.bo.app.dto.response.display.CcCmAgmtPolcInfoResponse;
import com.enbiz.bo.app.dto.response.display.CcSiteBaseResponse;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.entity.CcCmAgmtPolcInfo;
import com.enbiz.bo.app.entity.StStdCd;
import com.enbiz.bo.app.service.code.CodeService;
import com.enbiz.bo.app.service.display.SiteMgmtService;
import com.enbiz.bo.app.service.display.TermsConditionsMgmtService;
import com.enbiz.common.base.exception.MessageResolver;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 약관&이용안내 관리
 */
@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class termsConditionsMgmtController extends BaseController {

    private final SiteMgmtService siteMgmtService;
    private final TermsConditionsMgmtService termsConditionsMgmtService;
    private final CodeService codeService;

    /**
     * 약관&이용안내관리 화면 호출
     * @return 약관&이용안내관리 화면 jsp
     * @throws Exception
     */
    @GetMapping(value="/display/termsConditionsMgmt.termsConditionsMgmtView.do")
    public String termsConditionsMgmtView(Model model) throws Exception {
        Map<String, List<StStdCd>> codeList = codeService.getStStdCd("CH005,CH010");
        List<CcSiteBaseResponse> siteNmList = siteMgmtService.getSiteNmList();
        model.addAttribute("codeList", codeList);
        model.addAttribute("siteNmList", siteNmList);
        return "views/display/termsConditionsMgmtView";
    }

    /**
     * 약관&이용안내관리 목록 조회
     * @param ccCmAgmtPolcInfoRequest
     * @return
     * @throws Exception
     */
    @GetMapping(value = "/display/termsConditionsMgmt.getTermsConditionsMgmt.do", produces = "application/json;charset=UTF-8")
    @ResponseBody
    public RealGridListResponse getTermsConditionsMgmt(CcCmAgmtPolcInfoRequest ccCmAgmtPolcInfoRequest) throws Exception {
        int totalCount = termsConditionsMgmtService.getTermsConditionsListCount(ccCmAgmtPolcInfoRequest);
        List<CcCmAgmtPolcInfoResponse> ccCmAgmtPolcInfoList = termsConditionsMgmtService.getTermsConditionsList(ccCmAgmtPolcInfoRequest);
        RealGridListResponse response = new RealGridListResponse(ccCmAgmtPolcInfoList, totalCount);
        return response;
    }

    /**
     * 약관/이용안내 등록/수정 목록 화면 호출
     * @param request
     * @param model
     * @param ccCmAgmtPolcInfoRequest
     * @return
     * @throws Exception
     */
    @GetMapping("/display/termsConditionsMgmt.termsConditionsMgmtSaveView.do")
    public String termsConditionsMgmtSaveView(HttpServletRequest request, Model model, CcCmAgmtPolcInfoRequest ccCmAgmtPolcInfoRequest) throws Exception {
        Map<String, List<StStdCd>> codeList = codeService.getStStdCd("CH005,CH010");
        List<CcSiteBaseResponse> siteNmList = siteMgmtService.getSiteNmList();
        model.addAttribute("codeList", codeList);
        model.addAttribute("siteNmList", siteNmList);

        CcCmAgmtPolcInfoResponse ccCmAgmtPolcInfoResponse = null;
        if (ccCmAgmtPolcInfoRequest.getCmAgmtSeq() != null && !"".equals(ccCmAgmtPolcInfoRequest.getCmAgmtSeq())) {
            ccCmAgmtPolcInfoResponse = termsConditionsMgmtService.getAgmtUtilGuideByCmAgmtSeq(ccCmAgmtPolcInfoRequest);
        }
        model.addAttribute("ccCmAgmtPolcInfo", ccCmAgmtPolcInfoResponse);
        return "views/display/termsConditionsMgmtPopup";
    }

    /**
     * 약관/이용안내 등록/수정 저장
     * @param ccCmAgmtPolcInfo
     * @return
     * @throws Exception
     */
    @PostMapping("/display/termsConditionsMgmt.saveTermsConditionsMgmt.do")
    @ResponseBody
    public JSONResponseEntity saveTermsConditionsMgmt(CcCmAgmtPolcInfo ccCmAgmtPolcInfo, @AuthenticationPrincipal LoginRequest loginRequest) throws Exception {
        ccCmAgmtPolcInfo.setSysRegId(loginRequest.getLoginId());
        ccCmAgmtPolcInfo.setSysModId(loginRequest.getLoginId());
        if(!StringUtils.isEmpty(ccCmAgmtPolcInfo.getCmAgmtSeq())){
            termsConditionsMgmtService.updateCcCmAgmtPolcInfo(ccCmAgmtPolcInfo);
        } else {
            termsConditionsMgmtService.insertCcCmAgmtPolcInfo(ccCmAgmtPolcInfo);
        }
        return new JSONResponseEntity(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
    }

}
