package com.enbiz.bo.app.controller.customerservice;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Map;

import org.apache.commons.beanutils.BeanUtils;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.MediaType;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.enbiz.bo.app.constant.Constants;
import com.enbiz.bo.app.controller.BaseController;
import com.enbiz.bo.app.dto.ajax.JSONResponseEntity;
import com.enbiz.bo.app.dto.login.CurrentUser;
import com.enbiz.bo.app.dto.request.customerservice.CsCompensReturnRequest;
import com.enbiz.bo.app.dto.request.customerservice.CsCustomerCompensAcceptInfoRequest;
import com.enbiz.bo.app.dto.request.customerservice.CsCustomerCompensRequest;
import com.enbiz.bo.app.dto.response.customerservice.CsCompensDetailResponse;
import com.enbiz.bo.app.dto.response.customerservice.CsCustomerCompensResponse;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.entity.CsCustomerCompensAcceptInfo;
import com.enbiz.bo.app.entity.StStdCd;
import com.enbiz.bo.app.service.code.CodeService;
import com.enbiz.bo.app.service.customerservice.CustomerCompensMgmtService;
import com.enbiz.common.base.Validator;
import com.enbiz.common.base.exception.MessageResolver;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 고객보상관리 Controller
 */
@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class CustomerCompensMgmtController extends BaseController{

    private final CustomerCompensMgmtService customerCompensMgmtService;
    private final CodeService codeService;

    /**
     * 고객보상관리 화면 호출
     */
    @GetMapping(value="/customerservice/customerCompensMgmt.customerCompensMgmtView.do")
    public String customerCompensMgmtView(Model model) throws Exception {
    	CurrentUser currentUser = (CurrentUser)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Map<String, List<StStdCd>> codeList = codeService.getStStdCd("CS019,CS020,CS021,CS022");
        String loginId = currentUser.getLoginId();
        String csCpUserGrade = customerCompensMgmtService.getCsCompensUserGrade(loginId);
        model.addAttribute("codeList", codeList);
        model.addAttribute("csCpUserGrade", csCpUserGrade);
        return "views/customerservice/customerCompensMgmtView";
    }

    /**
     * 고객보상 목록 조회
     */
    @GetMapping(value="/customerservice/customerCompensMgmt.getCustomerCompensMgmtList.do")
    @ResponseBody
    public RealGridListResponse getCustomerCompensMgmtList(CsCustomerCompensRequest request) throws Exception {
        int totalCount = customerCompensMgmtService.getCustomerCompensListCount(request);
        List<CsCustomerCompensResponse> customerCpList = customerCompensMgmtService.getCustomerCompensList(request);
        RealGridListResponse response = new RealGridListResponse(customerCpList, totalCount);
        return response;
    }

    /**
     * 고객보상 ( 보상승인 & 지급승인)
     */
    @PostMapping(value = "/customerservice/customerCompensMgmt.approveCustomerCompensMgmt.do", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public JSONResponseEntity<Void> approveCustomerCompensMgmt(@RequestParam Map<String,Object> custCpnsAplyNoList,String type) throws Exception{
        Map<String, List<StStdCd>> cs026Code = codeService.getStStdCd("CS026");
        String json = custCpnsAplyNoList.get("custCpnsAplyNoList").toString();
        ObjectMapper mapper = new ObjectMapper();
        String[] cpnsAplyNoList = mapper.readValue(json, new TypeReference<String[]>() {});
        
        Validator.throwIfEmpty(cpnsAplyNoList, MessageResolver.getMessage(Constants.MSG_COMMON_PARAMETER_EMPTY_ERROR, new String[] {"CpnsAplyNoList"}));

        cpnsAplyNoList = new HashSet<String>(Arrays.asList(cpnsAplyNoList)).toArray(new String[0]);

        List<CsCustomerCompensAcceptInfo> csCustCpnsAccpInfos = customerCompensMgmtService.getCustomerCompensInfo(cpnsAplyNoList,type);
        for(CsCustomerCompensAcceptInfo CsCustomerCompensAcceptInfo: csCustCpnsAccpInfos) {
            CsCustomerCompensAcceptInfoRequest request = new CsCustomerCompensAcceptInfoRequest();
            BeanUtils.copyProperties(request,CsCustomerCompensAcceptInfo);
            customerCompensMgmtService.approveCustomerCompensDetail(request, cs026Code);
        }
        JSONResponseEntity<Void> response = new JSONResponseEntity<Void>();
        response.setSucceeded(true);
        return response;
    }


    /**
     * 고객보상 상세 화면 호출
     */
    @GetMapping("/customerservice/customerCompensMgmt.customerCompensDetailSaveView.do")
    public String customerCompensDetailSaveView(String custCpnsAplyNo , Model model) throws Exception{
    	CurrentUser currentUser = (CurrentUser)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Map<String, List<StStdCd>> codeList = codeService.getStStdCd("CS019,CS020,OM026");
        Map<String, List<StStdCd>> csCpGradeAmtCode = codeService.getStStdCd("CS025");
        String loginId = currentUser.getLoginId();
        CsCompensDetailResponse CsCompensDetailResponse = customerCompensMgmtService.getCustomerCompensDetail(custCpnsAplyNo);
        String csCpUserGrade = customerCompensMgmtService.getCsCompensUserGrade(loginId);
        model.addAttribute("data",CsCompensDetailResponse);
        model.addAttribute("loginId",loginId);
        model.addAttribute("codeList",codeList);
        model.addAttribute("csCpGradeAmtCode",csCpGradeAmtCode);
        model.addAttribute("csCpUserGrade",csCpUserGrade);
        return "views/customerservice/customerCompensDetailSaveView";
    }

    /**
     * 고객보상 상세 ( 변경적용 )
     */
    @PostMapping(value = "/customerservice/customerCompensMgmt.saveCustomerCompensDetail.do", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public JSONResponseEntity<Void> saveCustomerCompensDetail(CsCustomerCompensAcceptInfoRequest request) throws Exception{
    	customerCompensMgmtService.updateCustomerCompensDetail(request);
        JSONResponseEntity<Void> response = new JSONResponseEntity<Void>();
        response.setSucceeded(true);
        return response;
    }

    /**
     *  고객보상 상세 ( 접수취소 및 반려 )
     */
    @PostMapping(value = "/customerservice/customerCompensMgmt.returnCustomerCompensDetail.do", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public JSONResponseEntity<Void> returnCustomerCompensDetail(CsCompensReturnRequest request) throws Exception{
    	customerCompensMgmtService.returnCustomerCompensDetail(request);
        JSONResponseEntity<Void> response = new JSONResponseEntity<Void>();
        response.setSucceeded(true);
        return response;
    }

    /**
     * 고객보상 상세 ( 보상승인 & 지급승인)
     */
    @PostMapping(value = "/customerservice/customerCompensMgmt.approveCustomerCompensDetail.do", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public JSONResponseEntity<Void> approveCustomerCompensDetail(CsCustomerCompensAcceptInfoRequest request) throws Exception{
        Map<String, List<StStdCd>> cs026Code = codeService.getStStdCd("CS026");
        customerCompensMgmtService.approveCustomerCompensDetail(request,cs026Code);
        JSONResponseEntity<Void> response = new JSONResponseEntity<Void>();
        response.setSucceeded(true);
        return response;
    }

}
