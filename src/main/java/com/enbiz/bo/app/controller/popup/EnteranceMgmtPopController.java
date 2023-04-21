package com.enbiz.bo.app.controller.popup;

import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.context.annotation.Lazy;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.enbiz.bo.app.controller.BaseController;
import com.enbiz.bo.app.dto.request.popup.EnEntrBaseRequest;
import com.enbiz.bo.app.dto.response.popup.EnEntrBaseResponse;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.entity.StStdCd;
import com.enbiz.bo.app.service.code.CodeService;
import com.enbiz.bo.app.service.popup.EnteranceMgmtPopService;
import com.enbiz.bo.base.annotation.RealGridSearch;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 협력사 관리
 */
@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class EnteranceMgmtPopController extends BaseController {

    private final EnteranceMgmtPopService enteranceMgmtPopService;
    
    private final CodeService codeService;

    /**
     * 협력사 조회 화면 호출
     * @param response
     * @param model
     * @return
     * @throws Exception
     */
    @GetMapping("/popup/enteranceMgmt.etEntrBaseListPopup.do")
    public String etEntrBaseList(Model model, @Valid EnEntrBaseRequest enEntrBaseRequest) throws Exception {
        Map<String, List<StStdCd>> codeList = codeService.getStStdCd("VD001,VD003");
        model.addAttribute("codeList", codeList);
        model.addAttribute("requestData", enEntrBaseRequest);
        return "views/popup/etEntrBaseListPopup";
    }

    /**
     * 협력사 목록 조회
     * @param enEntrBaseRequest
     * @return
     * @throws Exception
     */
    @GetMapping(value = "/popup/enteranceMgmt.getEtEntrBaseListPopup.do", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @RealGridSearch
    public String getEtEntrBaseList(EnEntrBaseRequest enEntrBaseRequest) throws Exception {
        int totalCount = enteranceMgmtPopService.getEtEntrBaseListCount(enEntrBaseRequest);
        List<EnEntrBaseResponse> etEntrBaseList = enteranceMgmtPopService.getEtEntrBaseList(enEntrBaseRequest);
        RealGridListResponse response = new RealGridListResponse(etEntrBaseList, totalCount);
        return response.toJsonString();
    }


}
