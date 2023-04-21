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
import com.enbiz.bo.app.dto.request.customerservice.CsCustomerCompensAcceptInfoRequest;
import com.enbiz.bo.app.dto.request.customerservice.CsCustomerCounselInfoSuperRequest;
import com.enbiz.bo.app.dto.request.customerservice.IntegratedCounselRequest;
import com.enbiz.bo.app.dto.request.login.LoginRequest;
import com.enbiz.bo.app.dto.response.customerservice.CsCounselTemplateInfoResponse;
import com.enbiz.bo.app.dto.response.customerservice.CsRelatedResponse;
import com.enbiz.bo.app.dto.response.customerservice.CsTransferTypeCodeResponse;
import com.enbiz.bo.app.dto.response.customerservice.IntegratedCounselResponse;
import com.enbiz.bo.app.dto.response.customerservice.IntegratedCsDetailResponse;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.entity.StStdCd;
import com.enbiz.bo.app.service.code.CodeService;
import com.enbiz.bo.app.service.customerservice.IntegratedCounselService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class IntegratedCounselMgmtController extends BaseController{
	
	private final CodeService codeService;
	private final IntegratedCounselService integratedCounselService;
	
	/**
     * 통합상담관리 화면 호출
     */
    @GetMapping("/customerservice/integratedCounselMgmt.integratedCounselMgmtView.do")
    public String integratedCounselMgmtView(Model model) throws Exception{
        Map<String, List<StStdCd>> codeList = codeService.getStStdCd("CS001,CS003,CS005");
        CurrentUser currentUser = (CurrentUser)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        LoginRequest loginRequest = (LoginRequest) currentUser;
        model.addAttribute("loginRequest", loginRequest);
        model.addAttribute("codeList", codeList);
        return "views/customerservice/integratedCounselMgmtView";
    }
    
    /**
     * 통합상담관리 목록 조회
     */
    @GetMapping(value = "/customerservice/integratedCounselMgmt.integratedCounselList.do", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public RealGridListResponse integratedCounselList(IntegratedCounselRequest IntegratedCounselRequest) throws Exception{
        int totalCount = integratedCounselService.integratedCounselListCount(IntegratedCounselRequest);
        List<IntegratedCounselResponse> integrateCounselingList = integratedCounselService.integratedCounselList(IntegratedCounselRequest);
        RealGridListResponse response = new RealGridListResponse(integrateCounselingList, totalCount);
        return response;
    }
    
    /**
     * 상담등록 화면 호출
     * @return
     */
    @GetMapping("/customerservice/integratedCounselMgmt.counselRegistView.do")
    public String counselRegistView(Model model) throws Exception{
        Map<String, List<StStdCd>> codeList = codeService.getStStdCd("CS001,CS003,CS005,CS008,CS013,CM013");
        List<CsTransferTypeCodeResponse> csMvotTypCdList = integratedCounselService.getCsTransferTypeCodeList();
        model.addAttribute("codeList",codeList);
        model.addAttribute("csMvotTypCdList",csMvotTypCdList);
        return "views/customerservice/counselRegistView";
    }
    
    /**
     * 상담등록
     */
    @PostMapping(value = "/customerservice/integratedCounselMgmt.saveCounsel.do", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public JSONResponseEntity<Void> saveCounsel(CsCustomerCounselInfoSuperRequest CsCustomerCounselInfoSuperRequest) throws Exception{
    	integratedCounselService.saveCustomerCounselInfo(CsCustomerCounselInfoSuperRequest);
        JSONResponseEntity<Void> response = new JSONResponseEntity<Void>();
        response.setSucceeded(true);
        return response;
    }
    
    /**
     * 고객보상 등록 화면 호출
     */
    @GetMapping("/customerservice/integratedCounselMgmt.customerCompensSaveView.do")
    public String customerCompensSaveView(String ccnNo , Model model) throws Exception{
        Map<String, List<StStdCd>> codeList = codeService.getStStdCd("CS019,CS020,OM026");
        CsRelatedResponse ccnData = integratedCounselService.getCsOrderGoodsData(ccnNo);
        model.addAttribute("ccnData",ccnData);
        model.addAttribute("codeList",codeList);
        return "views/customerservice/customerCompensSaveView";
    }
    
    /**
     * 고객보상접수정보 등록
     */
    @PostMapping(value = "/customerservice/integratedCounselMgmt.saveCustomerCompens.do", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public JSONResponseEntity<Void> saveCustomerCompens(CsCustomerCompensAcceptInfoRequest request) throws Exception{
    	integratedCounselService.registCustomerCompens(request);
        JSONResponseEntity<Void> response = new JSONResponseEntity<Void>();
        response.setSucceeded(true);
        return response;
    }
    
    /**
     * 관련상담 리스트 화면 호출
     */
    @GetMapping("/customerservice/integratedCounselMgmt.relatedConsultationPopup.do")
    public String relatedConsultationPopup(String ccnNo , Model model) throws Exception{
        CsRelatedResponse relatedConsultation = integratedCounselService.getRelatedConsultation(ccnNo);
        model.addAttribute("data",relatedConsultation);
        return "views/customerservice/relatedConsultationPopup";
    }
    
    /**
     * 처리내역 등록 화면 호출
     */
    @GetMapping("/customerservice/integratedCounselMgmt.counselProcessSaveView.do")
    public String counselProcessSaveView(String ccnNo,String custCnslGbCd,Model model) throws Exception{

        Map<String, List<StStdCd>> codeList = codeService.getStStdCd("CS001,CS003,CS005,CS008,CS013,CM013");

        IntegratedCsDetailResponse processingDetails = integratedCounselService.getProcessingDetails(ccnNo);

        List<CsTransferTypeCodeResponse> csMvotTypCdList = integratedCounselService.getCsTransferTypeCodeList();

        model.addAttribute("codeList",codeList);
        model.addAttribute("custCnslGbCd",custCnslGbCd);
        model.addAttribute("ccnNo",ccnNo);
        model.addAttribute("processingDetails",processingDetails);
        model.addAttribute("csMvotTypCdList",csMvotTypCdList);

        return "views/customerservice/counselProcessSaveView";
    }
    
    /**
     * 처리내역 등록
     */
    @PostMapping(value = "/customerservice/integratedCounselMgmt.saveCounselProcess.do", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public JSONResponseEntity<Void> saveCounselProcess(CsCustomerCounselInfoSuperRequest CsCustomerCounselInfoSuperRequest) throws Exception{
    	integratedCounselService.saveCustomerCounselProcessInfo(CsCustomerCounselInfoSuperRequest);
        JSONResponseEntity<Void> response = new JSONResponseEntity<Void>();
        response.setSucceeded(true);
        return response;
    }
    
    /**
     *상담템플릿 가져오기
     */
    @GetMapping("/customerservice/integratedCounselMgmt.getCsCounselTemplateInfo.do")
    @ResponseBody
    public JSONResponseEntity<List<CsCounselTemplateInfoResponse>> getCsCounselTemplateInfo(CsCounselTemplateInfoRequest request) throws Exception{
    	List<CsCounselTemplateInfoResponse> list = integratedCounselService.getCsCounselTemplateInfo(request);
    	JSONResponseEntity<List<CsCounselTemplateInfoResponse>> response = new JSONResponseEntity<List<CsCounselTemplateInfoResponse>>();
    	response.setData(list);
        response.setSucceeded(true);
        return response;
    }
    
    /**
     * 통합상담관리 상세 조회
     */
    @GetMapping("/customerservice/integratedCounselMgmt.integrateCounselingDetail.do")
    @ResponseBody
    public JSONResponseEntity<IntegratedCsDetailResponse> integrateCounselingDetail(String ccnNo) throws Exception {
    	IntegratedCsDetailResponse detail = integratedCounselService.integratedCounselDetail(ccnNo);
    	JSONResponseEntity<IntegratedCsDetailResponse> response = new JSONResponseEntity<IntegratedCsDetailResponse>();
    	response.setData(detail);
        response.setSucceeded(true);
        return response;
    }

}
