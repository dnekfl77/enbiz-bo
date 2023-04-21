package com.enbiz.bo.app.controller.customerservice;

import java.util.List;
import java.util.Map;

import org.springframework.context.annotation.Lazy;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.enbiz.bo.app.controller.BaseController;
import com.enbiz.bo.app.dto.ajax.JSONResponseEntity;
import com.enbiz.bo.app.dto.request.customerservice.InquireTypeRequest;
import com.enbiz.bo.app.dto.request.realgrid.RealGridCUDRequest;
import com.enbiz.bo.app.dto.response.customerservice.InquireTypeResponse;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.entity.CsCustInqTypCd;
import com.enbiz.bo.app.entity.StStdCd;
import com.enbiz.bo.app.service.code.CodeService;
import com.enbiz.bo.app.service.customerservice.InquiryTypeMgmtService;
import com.enbiz.bo.base.annotation.RealGridCUD;
import com.enbiz.common.base.exception.MessageResolver;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 문의유형관리 Controller
 */
@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class InquiryTypeMgmtController extends BaseController{
	private final InquiryTypeMgmtService inquiryTypeMgmtService;
	private final CodeService codeService;
	
	/**
     * 문의유형 관리 화면 호출
     * @param model
     * @return
     * @throws Exception
     */
    @GetMapping("/customerservice/inquiryTypeMgmt.inquiryTypeMgmtView.do")
    public String inquiryTypeMgmtView(Model model) throws Exception{
        Map<String, List<StStdCd>> codeList = codeService.getStStdCd("CS012");
        model.addAttribute("codeList", codeList);
        return "views/customerservice/inquiryTypeMgmtView";
    }

    /**
     * 문의유형-대 조회
     * @return
     * @throws Exception
     */
    @GetMapping(value = "/customerservice/inquiryTypeMgmt.getInquiryTypeLarge.do", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public RealGridListResponse getInquiryTypeLarge(InquireTypeRequest inquireTypeRequest) throws Exception{
        int totalCount = inquiryTypeMgmtService.getInquiryTypeLCount(inquireTypeRequest);
        List<InquireTypeResponse> inqTpyeLList = inquiryTypeMgmtService.getInquiryTypeLarge(inquireTypeRequest);
        RealGridListResponse response = new RealGridListResponse(inqTpyeLList, totalCount);
        return response;
    }

    /**
     * 문의유형-소 조회
     * @return
     * @throws Exception
     */
    @GetMapping(value = "/customerservice/inquiryTypeMgmt.getInquiryTypeSmall.do", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public RealGridListResponse getInquiryTypeSmall(InquireTypeRequest inquireTypeRequest) throws Exception{
        int totalCount = inquiryTypeMgmtService.getInquiryTypeSmallCount(inquireTypeRequest);
        List<InquireTypeResponse> inqTpyeSList = inquiryTypeMgmtService.getInquiryTypeSmall(inquireTypeRequest);
        RealGridListResponse response = new RealGridListResponse(inqTpyeSList, totalCount);
        return response;
    }

    /**
     * 문의유형 등록 및 업데이트
     * @param realGridCUD
     * @return
     * @throws Exception
     */
    @PostMapping("/customerservice/inquiryTypeMgmt.saveInquiryType.do")
    @ResponseBody
    public JSONResponseEntity<Void> saveInquiryType(@RealGridCUD(type = CsCustInqTypCd.class) RealGridCUDRequest<CsCustInqTypCd> realGridCUD) throws Exception{
        List<CsCustInqTypCd> createList = realGridCUD.getCreate(), updateList = realGridCUD.getUpdate();
        inquiryTypeMgmtService.saveInquiryType(createList, updateList);
        JSONResponseEntity<Void> jsonResponseEntity = new JSONResponseEntity<Void>(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
        return jsonResponseEntity;
    }
}
