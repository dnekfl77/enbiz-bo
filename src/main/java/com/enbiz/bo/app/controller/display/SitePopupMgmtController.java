package com.enbiz.bo.app.controller.display;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.apache.commons.beanutils.BeanUtils;
import org.springframework.context.annotation.Lazy;
import org.springframework.core.env.Environment;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.enbiz.bo.app.controller.BaseController;
import com.enbiz.bo.app.dto.ajax.JSONResponseEntity;
import com.enbiz.bo.app.dto.request.display.PrSitePopupChlAplyInfoRequest;
import com.enbiz.bo.app.dto.request.display.PrSitePopupInfoRequest;
import com.enbiz.bo.app.dto.request.login.LoginRequest;
import com.enbiz.bo.app.dto.response.display.PrSitePopupChlAplyInfoResponse;
import com.enbiz.bo.app.dto.response.display.PrSitePopupInfoResponse;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.entity.PrSitePopupInfo;
import com.enbiz.bo.app.enums.common.AttacheFileKind;
import com.enbiz.bo.app.service.code.CodeService;
import com.enbiz.bo.app.service.common.AdminCommonService;
import com.enbiz.bo.app.service.display.SiteMgmtService;
import com.enbiz.bo.app.service.display.SitePopupMgmtService;
import com.enbiz.common.base.exception.MessageResolver;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


/**
 * 팝업 관리
 */
@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class SitePopupMgmtController extends BaseController {

    private final SitePopupMgmtService sitePopupMgmtService;
    private final SiteMgmtService siteMgmtService;
    private final AdminCommonService adminCommonService;
    private final Environment env;
    private final CodeService codeService;

    /**
     * 팝업 관리 첫 로딩 화면
     * @param model
     * @return
     * @throws Exception
     */
    @GetMapping(value="/display/sitePopupMgmt.sitePopupMgmtView.do")
    public String sitePopupList(Model model) throws Exception {
        model.addAttribute("siteList", siteMgmtService.getSiteNmList());
        model.addAttribute("codeList", codeService.getStStdCd("DP015"));
        return "views/display/sitePopupMgmtView";
    }

    /**
     * 팝업 관리 목록 조회
     * @param prSitePopupInfoRequest
     * @return realGridListResponse
     * @throws Exception
     */
    @GetMapping(value = "/display/sitePopupMgmt.getSitePopupMgmt.do")
    @ResponseBody
    public RealGridListResponse getSitePopupList(PrSitePopupInfoRequest prSitePopupInfoRequest) throws Exception {
        int totalCount = sitePopupMgmtService.getSitePopupListCount(prSitePopupInfoRequest);
        List<PrSitePopupInfoResponse> prSitePopupInfoList = sitePopupMgmtService.getSitePopupList(prSitePopupInfoRequest);
        RealGridListResponse response = new RealGridListResponse(prSitePopupInfoList, totalCount);
        return response;
    }

    /**
     * 팝업 관리 목록 삭제
     * @param prSitePopupInfo
     * @return
     * @throws Exception
     */
    @PostMapping(value = "/display/sitePopupMgmt.deleteSitePopupMgmt.do")
    @ResponseBody
    public JSONResponseEntity deleteSitePopupList(PrSitePopupInfo prSitePopupInfo) throws Exception {
        sitePopupMgmtService.deleteSitePopupList(prSitePopupInfo);
        JSONResponseEntity jsonResponseEntity = new JSONResponseEntity(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
        jsonResponseEntity.setSucceeded(true);
        return jsonResponseEntity;
    }

    /**
     * 팝업 관리 _ 등록/수정 팝업 화면 호출
     * @param model
     * @param prSitePopupInfoRequest
     * @return
     * @throws Exception
     */
    @GetMapping(value="/display/sitePopupMgmt.sitePopupMgmtSaveView.do")
    public String getSitePopupDetail(Model model, PrSitePopupInfoRequest prSitePopupInfoRequest) throws Exception {
        model.addAttribute("siteList", siteMgmtService.getSiteNmList());
        model.addAttribute("codeList", codeService.getStStdCd("DP014,DP015,DP016,DP017"));
        model.addAttribute("maxUploadSizePerFile", env.getProperty("upload.display.maxUploadSizePerFile")); // 파일 관련 설정

        PrSitePopupInfoResponse prSitePopupInfoResponse = null;
        if (prSitePopupInfoRequest.getPopupNo() != null && !"".equals(prSitePopupInfoRequest.getPopupNo())) {
            prSitePopupInfoResponse = sitePopupMgmtService.getSitePopupDetail(prSitePopupInfoRequest);
        }
        model.addAttribute("requestData", prSitePopupInfoResponse);
        return "views/display/sitePopupMgmtPopup";
    }

    /**
     * 팝업 관리 채널적용목록 조회
     * @param prSitePopupInfoRequest
     * @return realGridListResponse
     * @throws Exception
     */
    @GetMapping(value = "/display/sitePopupMgmt.getSitePopupChlAplyInfo.do")
    @ResponseBody
    public RealGridListResponse getSitePopupChlAplyInfo(PrSitePopupInfoRequest prSitePopupInfoRequest) throws Exception {
        int totalCount = sitePopupMgmtService.getSitePopupChlAplyInfoCount(prSitePopupInfoRequest);
        List<PrSitePopupChlAplyInfoResponse> chlList = sitePopupMgmtService.getSitePopupChlAplyInfo(prSitePopupInfoRequest);
        RealGridListResponse response = new RealGridListResponse(chlList, totalCount);
        return response;
    }

    /**
     * 팝업 상세내용 저장
     * @param file
     * @param param
     * @param loginRequest
     * @return
     * @throws Exception
     */
    @PostMapping("/display/sitePopupMgmt.saveSitePopupMgmt.do")
    @ResponseBody
    public JSONResponseEntity saveSitePopupMgmt(MultipartFile file, @RequestParam Map<String, String> param, @AuthenticationPrincipal LoginRequest loginRequest) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        PrSitePopupInfoRequest prSitePopupInfoRequest = objectMapper.readValue(param.get("prSitePopupInfoRequest"),PrSitePopupInfoRequest.class);
        prSitePopupInfoRequest.setSysRegId(loginRequest.getLoginId());
        prSitePopupInfoRequest.setSysModId(loginRequest.getLoginId());

        // 파일저장
        if(file != null) {
            Map<String, String> resultImageMap = adminCommonService.uploadMultipartFile(file, AttacheFileKind.DISPLAY, false);
            prSitePopupInfoRequest.setPopupImgFileNm(resultImageMap.get("I_FILE_TITLE"));
            prSitePopupInfoRequest.setPopupImgPathNm(resultImageMap.get("I_FILE_URL"));
        }

        // 폼데이터 저장
        PrSitePopupInfo prSitePopupInfo = new PrSitePopupInfo();
        BeanUtils.copyProperties(prSitePopupInfo, prSitePopupInfoRequest);
        List<String> popupTgtScrnList = Arrays.asList(prSitePopupInfoRequest.getPopupTgtScrnList().split(","));

        if (prSitePopupInfoRequest.getPopupNo() == null || prSitePopupInfoRequest.getPopupNo().equals("")) { // 등록
            sitePopupMgmtService.prSitePopupInfoInsert(popupTgtScrnList, prSitePopupInfo);
        } else { // 수정
            sitePopupMgmtService.prSitePopupInfoUpdate(popupTgtScrnList, prSitePopupInfo);
        }

        // 적용채널 저장
        if(!param.get("popupChlGrid").equals("[]")){
            List<PrSitePopupChlAplyInfoRequest> gridList = objectMapper.readValue(param.get("popupChlGrid"), new TypeReference<List<PrSitePopupChlAplyInfoRequest>>() {});
            for(PrSitePopupChlAplyInfoRequest prSitePopupChlAplyInfoRequest : gridList) {
                prSitePopupChlAplyInfoRequest.setPopupNo(prSitePopupInfo.getPopupNo());
                prSitePopupChlAplyInfoRequest.setSysRegId(loginRequest.getLoginId());
                prSitePopupChlAplyInfoRequest.setSysModId(loginRequest.getLoginId());
            }
            sitePopupMgmtService.prSitePopupChlAplyInfoSave(gridList);
        }

        JSONResponseEntity jsonResponseEntity = new JSONResponseEntity(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
        return jsonResponseEntity;
    }

}