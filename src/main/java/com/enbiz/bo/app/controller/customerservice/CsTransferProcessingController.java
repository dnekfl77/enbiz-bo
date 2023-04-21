package com.enbiz.bo.app.controller.customerservice;

import java.util.List;
import java.util.Map;

import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.enbiz.bo.app.constant.Constants;
import com.enbiz.bo.app.controller.BaseController;
import com.enbiz.bo.app.dto.ajax.JSONResponseEntity;
import com.enbiz.bo.app.dto.login.CurrentUser;
import com.enbiz.bo.app.dto.request.customerservice.CsCcnTransInfoUpdateRequest;
import com.enbiz.bo.app.dto.request.customerservice.CsTransferInfoDetailRequest;
import com.enbiz.bo.app.dto.request.customerservice.CsTransferInfoRequest;
import com.enbiz.bo.app.dto.request.login.LoginRequest;
import com.enbiz.bo.app.dto.response.customerservice.CsCcnTransInfoDtlPopResponse;
import com.enbiz.bo.app.dto.response.customerservice.CsTransferInfoDetailResponse;
import com.enbiz.bo.app.dto.response.customerservice.CsTransferInfoResponse;
import com.enbiz.bo.app.dto.response.customerservice.CsTransferTypeCodeResponse;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.entity.StStdCd;
import com.enbiz.bo.app.service.code.CodeService;
import com.enbiz.bo.app.service.customerservice.CsTransferProcessingService;
import com.enbiz.bo.app.service.customerservice.IntegratedCounselService;
import com.enbiz.common.base.Validator;
import com.enbiz.common.base.exception.MessageResolver;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 업무이관처리 Controller
 */
@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class CsTransferProcessingController extends BaseController{

    private final CodeService codeService;
    private final CsTransferProcessingService csTransferProcessingService;
    private final IntegratedCounselService integratedCounselService;
    
    /**
     * 업무이관관리
     */
    @GetMapping("/customerservice/csTransferProcessing.csTransferMgmtView.do")
    public String csTransferMgmtView(Model model) throws Exception{
        Map<String, List<StStdCd>> codeList = codeService.getStStdCd("CS006");
        List<CsTransferTypeCodeResponse> csMvotTypCdList = integratedCounselService.getCsTransferTypeCodeList();
        CurrentUser currentUser = (CurrentUser)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        LoginRequest loginRequest = (LoginRequest) currentUser;
        model.addAttribute("loginRequest", loginRequest);
        model.addAttribute("codeList", codeList);
        model.addAttribute("csMvotTypCdList", csMvotTypCdList);
        return "views/customerservice/csTransferMgmtView";
    }
    
    /**
     * 업무이관관리 조회
     */
    @GetMapping("/customerservice/csTransferProcessing.getCsTransferMgmtList.do")
    @ResponseBody
    public RealGridListResponse getCsTransferMgmtList(CsTransferInfoRequest request) throws Exception{
        int totalCount = csTransferProcessingService.getCsTransferMgmtCount(request);
        List<CsTransferInfoResponse> phoneAppointManagement = csTransferProcessingService.getCsTransferMgmtList(request);
        RealGridListResponse response = new RealGridListResponse(phoneAppointManagement, totalCount);
        return response;
    }
    
    /**
     * 업무이관관리 이관내역 / 답변내역
     */
    @GetMapping("/customerservice/csTransferProcessing.getCsTransferDetail.do")
    @ResponseBody
    public CsTransferInfoDetailResponse getCsTransferDetail(CsTransferInfoDetailRequest request) throws Exception{
        return csTransferProcessingService.getCsTransferDetail(request);
    }

    /**
     * 업무이관관리 답변 내역 update
     */
    @PostMapping("/customerservice/csTransferProcessing.saveCsTransferAnswerInfo.do")
    @ResponseBody
    public JSONResponseEntity<Void> saveCsTransferAnswerInfo(CsCcnTransInfoUpdateRequest request) throws Exception{
        Validator.throwIfEmpty(request.getCcnNo(), MessageResolver.getMessage(Constants.MSG_COMMON_PARAMETER_EMPTY_ERROR, new String[] {"CcnNo"}));
        Validator.throwIfEmpty(request.getMvotAnsProcCont(), MessageResolver.getMessage(Constants.MSG_COMMON_PARAMETER_EMPTY_ERROR, new String[] {"MvotAnsProcCont"}));
        Validator.throwIfEmpty(request.getMvotProcStatCd(), MessageResolver.getMessage(Constants.MSG_COMMON_PARAMETER_EMPTY_ERROR, new String[] {"MvotProcStatCd"}));
        csTransferProcessingService.saveCsTransferAnswerInfo(request);
        JSONResponseEntity<Void> response = new JSONResponseEntity<Void>();
        response.setSucceeded(true);
        return response;
    }

    /**
     * 업무이관상세 팝업
     */
    @GetMapping("/customerservice/csTransferProcessing.getCsTransferDetailPopup.do")
    public String getCsTransferDetailPopup(CsTransferInfoDetailRequest request,Model model) throws Exception{
        CurrentUser currentUser = (CurrentUser)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        LoginRequest loginRequest = (LoginRequest) currentUser;
        CsCcnTransInfoDtlPopResponse csCcnTransInfoDtlPopResponse = csTransferProcessingService.getCsTransferDetailPopup(request);
        model.addAttribute("popData",csCcnTransInfoDtlPopResponse);
        model.addAttribute("loginRequest",loginRequest);
        return "views/customerservice/getCsTransferDetailPopup";
    }

    /**
     * 업무이관상세 팝업 접수취소
     */
    @PostMapping("/customerservice/csTransferProcessing.cancelCsTransfer.do")
    @ResponseBody
    public JSONResponseEntity<Void> cancelCsTransfer(CsTransferInfoDetailRequest request) throws Exception{
        Validator.throwIfEmpty(request.getCcnNo(), MessageResolver.getMessage(Constants.MSG_COMMON_PARAMETER_EMPTY_ERROR, new String[] {"CcnNo"}));
        Validator.throwIfEmpty(request.getCnslProcSeq(), MessageResolver.getMessage(Constants.MSG_COMMON_PARAMETER_EMPTY_ERROR, new String[] {"CnslProcSeq"}));
        csTransferProcessingService.cancelCsTransfer(request);
        JSONResponseEntity<Void> response = new JSONResponseEntity<Void>();
        response.setSucceeded(true);
        return response;
    }

}
