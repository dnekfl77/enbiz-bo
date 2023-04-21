package com.enbiz.bo.app.controller.customerservice;

import java.util.List;
import java.util.Map;

import org.springframework.context.annotation.Lazy;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.enbiz.bo.app.controller.BaseController;
import com.enbiz.bo.app.dto.request.customerservice.CsCpPayRequest;
import com.enbiz.bo.app.dto.response.customerservice.CsCustomerCompensResponse;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.entity.StStdCd;
import com.enbiz.bo.app.service.code.CodeService;
import com.enbiz.bo.app.service.customerservice.CustomerCompensPayMgmtService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 고객보상지급관리 Controller
 */
@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class CustomerCompensPayMgmtController extends BaseController{

    private final CustomerCompensPayMgmtService customerCompensPayMgmtService;
    private final CodeService codeService;

    /**
     * 고객보상지급현황
     */
    @GetMapping(value="/customerservice/customerCompensPayMgmt.customerCompensPayMgmtView.do")
    public String customerCompensPayMgmtView(Model model) throws Exception {
        Map<String, List<StStdCd>> codeList = codeService.getStStdCd("CS019");
        model.addAttribute("codeList", codeList);
        return "views/customerservice/customerCompensPayMgmtView";
    }

    /**
     * 고객보상지급현황 목록
     */
    @GetMapping(value = "/customerservice/customerCompensPayMgmt.getCustomerCompensPayMgmtList.do", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public RealGridListResponse getCustomerCompensPayMgmtList(CsCpPayRequest csCpPayRequest) throws Exception {
        int totalCount = customerCompensPayMgmtService.getCustomerCompensPayListCount(csCpPayRequest);
        List<CsCustomerCompensResponse> responseList = customerCompensPayMgmtService.getCustomerCompensPayList(csCpPayRequest);
        RealGridListResponse response = new RealGridListResponse(responseList, totalCount);
        return response;
    }
}
