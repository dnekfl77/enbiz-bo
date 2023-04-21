package com.enbiz.bo.app.controller.customerservice;

import java.util.List;
import java.util.Map;

import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.enbiz.bo.app.controller.BaseController;
import com.enbiz.bo.app.dto.login.CurrentUser;
import com.enbiz.bo.app.dto.request.customerservice.PhoneAppointmentRequest;
import com.enbiz.bo.app.dto.request.login.LoginRequest;
import com.enbiz.bo.app.dto.response.customerservice.PhoneAppointmentResponse;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.entity.StStdCd;
import com.enbiz.bo.app.service.code.CodeService;
import com.enbiz.bo.app.service.customerservice.PhoneAppointmentMgmtService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class PhoneAppointmentMgmtController extends BaseController{
	
	private final CodeService codeService;
	private final PhoneAppointmentMgmtService phoneAppointmentMgmtService;
	
	/**
     * 전화약속관리
     */
    @GetMapping("/customerservice/phoneAppointmentMgmt.phoneAppointmentMgmtView.do")
    public String phoneAppointmentMgmtView(Model model) throws Exception{
        Map<String, List<StStdCd>> codeList = codeService.getStStdCd("CS008");
        CurrentUser currentUser = (CurrentUser)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        LoginRequest loginRequest = (LoginRequest) currentUser;
        model.addAttribute("loginRequest", loginRequest);
        model.addAttribute("codeList", codeList);
        return "views/customerservice/phoneAppointmentMgmtView";
    }
    
    /**
     * 전화약속관리 조회
     */
    @GetMapping("/customerservice/phoneAppointmentMgmt.getPhoneAppointmentList.do")
    @ResponseBody
    public RealGridListResponse getPhoneAppointmentList(PhoneAppointmentRequest request) throws Exception{
        int totalCount = phoneAppointmentMgmtService.getPhoneAppointmentCount(request);
        List<PhoneAppointmentResponse> phoneAppointManagement = phoneAppointmentMgmtService.getPhoneAppointmentList(request);
        RealGridListResponse response = new RealGridListResponse(phoneAppointManagement, totalCount);
        return response;
    }
}
