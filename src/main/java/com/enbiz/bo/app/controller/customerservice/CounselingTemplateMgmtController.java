package com.enbiz.bo.app.controller.customerservice;

import java.util.List;
import java.util.Map;

import org.springframework.context.annotation.Lazy;
import org.springframework.http.MediaType;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.enbiz.bo.app.controller.BaseController;
import com.enbiz.bo.app.dto.ajax.JSONResponseEntity;
import com.enbiz.bo.app.dto.login.CurrentUser;
import com.enbiz.bo.app.dto.request.customerservice.CsCounselTemplateInfoRequest;
import com.enbiz.bo.app.dto.request.realgrid.RealGridCUDRequest;
import com.enbiz.bo.app.dto.response.customerservice.CsCounselTemplateInfoResponse;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.entity.CsCnslTmplInfo;
import com.enbiz.bo.app.entity.StStdCd;
import com.enbiz.bo.app.service.code.CodeService;
import com.enbiz.bo.app.service.customerservice.CounselingTemplateMgmtService;
import com.enbiz.bo.base.annotation.RealGridCUD;
import com.enbiz.common.base.exception.MessageResolver;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 상담 템플릿 관리 Controller
 */
@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class CounselingTemplateMgmtController extends BaseController{

    private final CounselingTemplateMgmtService counselingTemplateMgmtService;
    private final CodeService codeService;

    /**
     * 상담 템플릿 관리 화면 호출
     * @return
     */
    @GetMapping("/customerservice/counselingTemplateMgmt.counselingTemplateView.do")
    public String counselingTemplateView(Model model, CsCounselTemplateInfoRequest CsCounselTemplateInfoRequest) throws Exception{
        Map<String, List<StStdCd>> codeList = codeService.getStStdCd("CS015,CS016");
        model.addAttribute("codeList", codeList);
        model.addAttribute("requestData", CsCounselTemplateInfoRequest);
        return "views/customerservice/counselingTemplateView";
    }

    /**
     * 상담 템플릿 관리 목록 조회
     *
     * @param CsCounselTemplateInfoRequest
     * @return
     * @throws Exception
     */
    @GetMapping(value = "/customerservice/counselingTemplateMgmt.getCsCounselingTemplateInfoList.do", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public RealGridListResponse getCsCounselingTemplateInfoList(CsCounselTemplateInfoRequest CsCounselTemplateInfoRequest) throws Exception {
    	CurrentUser currentUser = (CurrentUser)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(CsCounselTemplateInfoRequest.getTypeCode().equals("common") ){ // 공통 탭인 경우
            CsCounselTemplateInfoRequest.setCnslAempId("0");
        } else { // 개인 탭인 경우
            CsCounselTemplateInfoRequest.setCnslAempId(currentUser.getLoginId());
        }
        int totalCount = counselingTemplateMgmtService.getCsCounselTemplateInfoListCount(CsCounselTemplateInfoRequest);
        List<CsCounselTemplateInfoResponse> getCsCnslTmplInfoList = counselingTemplateMgmtService.getCsCounselTemplateInfoList(CsCounselTemplateInfoRequest);
        RealGridListResponse response = new RealGridListResponse(getCsCnslTmplInfoList, totalCount);
        return response;
    }

    /**
     * 상담 템플릿 리스트 삭제
     * @param realGridCUD
     * @return
     * @throws Exception
     */
    @PostMapping("/customerservice/counselingTemplateMgmt.saveCsCounselingTemplateInfoList.do")
    @ResponseBody
    public JSONResponseEntity<Void> saveCsCounselingTemplateInfoList(@RealGridCUD(type = CsCnslTmplInfo.class) RealGridCUDRequest<CsCnslTmplInfo> realGridCUD) throws Exception{
        List<CsCnslTmplInfo> deleteList = realGridCUD.getDelete();
        counselingTemplateMgmtService.deleteCsCounselTemplateInfoList(deleteList);
        JSONResponseEntity<Void> jsonResponseEntity = new JSONResponseEntity<Void>(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
        return jsonResponseEntity;
    }

    /**
     * 상담 템플릿 관리 > 템플릿 등록/수정 팝업 화면 호출
     * @param model
     * @param CsCounselTemplateInfoRequest
     * @return
     * @throws Exception
     */
    @GetMapping(value="/customerservice/counselingTemplateMgmt.counselingTemplateMgmtSaveView.do")
    public String counselingTemplateMgmtSaveView(Model model, CsCounselTemplateInfoRequest CsCounselTemplateInfoRequest) throws Exception {
        Map<String, List<StStdCd>> codeList = codeService.getStStdCd("CS015,CS016");
        model.addAttribute("codeList", codeList);

        if (CsCounselTemplateInfoRequest.getArgInsertUpdate().equals("I")) { // 등록
            model.addAttribute("requestData", CsCounselTemplateInfoRequest);
        } else { // 수정
            CsCounselTemplateInfoResponse CsCounselTemplateInfoResponse = new CsCounselTemplateInfoResponse();
            CsCounselTemplateInfoResponse = counselingTemplateMgmtService.getCsCounselTemplateInfoDetail(CsCounselTemplateInfoRequest);
            CsCounselTemplateInfoResponse.setArgInsertUpdate("U");
            CsCounselTemplateInfoResponse.setTypeCode(CsCounselTemplateInfoRequest.getTypeCode());
            model.addAttribute("requestData", CsCounselTemplateInfoResponse);
        }

        return "views/customerservice/counselingTemplateMgmtSaveView";
    }

    /**
     * 상담 템플릿 관리 > 템플릿 등록/수정 팝업 저장
     * @param csCnslTmplInfo
     * @return
     * @throws Exception
     */
    @PostMapping(value = "/customerservice/counselingTemplateMgmt.saveCounselingTemplateInfo.do", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public JSONResponseEntity<Void> saveCounselingTemplateInfo(CsCnslTmplInfo csCnslTmplInfo, CsCounselTemplateInfoRequest CsCounselTemplateInfoRequest) throws Exception {
    	CurrentUser currentUser = (CurrentUser)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(CsCounselTemplateInfoRequest.getTypeCode().equals("common") ){ // 공통 탭인 경우
            csCnslTmplInfo.setCnslAempId("0");
        } else { // 개인 탭인 경우
            csCnslTmplInfo.setCnslAempId(currentUser.getLoginId());
        }

        int dataCheck = counselingTemplateMgmtService.checkDuplacateCsCounselTemplateInfo(CsCounselTemplateInfoRequest);

        JSONResponseEntity<Void> response = new JSONResponseEntity<Void>();
        if(dataCheck > 0) {
            response.setSucceeded(false);
        } else {
            if(csCnslTmplInfo.getCnslTmplNo().equals("null")){
            	counselingTemplateMgmtService.registCsCounselTemplateInfo(csCnslTmplInfo);
            } else {
            	counselingTemplateMgmtService.updateCsCounselTemplateInfo(csCnslTmplInfo);
            }
            response.setSucceeded(true);
        }
        return response;
    }

    /**
     * 상담 템플릿 공통 팝업 호출
     * @param model
     * @param CsCounselTemplateInfoRequest
     * @return
     * @throws Exception
     */
    @GetMapping(value="/customerservice/counselingTemplateMgmt.counselingTemplatePopup.do")
    public String counselingTemplatePopup(Model model, CsCounselTemplateInfoRequest CsCounselTemplateInfoRequest) throws Exception {
        Map<String, List<StStdCd>> codeList = codeService.getStStdCd("CS015,CS016");
        model.addAttribute("codeList", codeList);
        model.addAttribute("requestData", CsCounselTemplateInfoRequest);
        return "views/popup/counselingTemplatePopup";
    }
}
