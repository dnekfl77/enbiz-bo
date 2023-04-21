package com.enbiz.bo.app.controller.marketing;

import java.util.List;
import java.util.Map;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.enbiz.bo.app.controller.BaseController;
import com.enbiz.bo.app.dto.ajax.JSONResponseEntity;
import com.enbiz.bo.app.dto.request.marketing.AppreciateRequest;
import com.enbiz.bo.app.dto.request.marketing.AppreciationCudRequest;
import com.enbiz.bo.app.dto.response.marketing.AppreciateDetailResponse;
import com.enbiz.bo.app.dto.response.marketing.AppreciateResponse;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.entity.StStdCd;
import com.enbiz.bo.app.service.code.CodeService;
import com.enbiz.bo.app.service.marketing.AppreciationMgmtService;
import com.enbiz.common.base.exception.MessageResolver;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 사은행사 관리 Controller
 */
@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class AppreciationEventMgmtController extends BaseController{
	

    private final AppreciationMgmtService appreciationMgmtService;
    private final CodeService codeService;

    /**
     * 사은행사 관리 화면 호출
     * @param model
     * @return
     * @throws Exception
     */
    @GetMapping("/marketing/appreciationEventMgmt.appreciationEventMgmtView.do")
    public String appreciationEventMgmtView(Model model) throws Exception {
        Map<String, List<StStdCd>> codeList = codeService.getStStdCd("MK012,MK003");
        model.addAttribute("codeList", codeList);
        return "views/marketing/appreciationEventMgmtView";
    }

    /**
     * 사은행사 관리 목록 조회
     * @param appreciateRequest
     * @return
     * @throws Exception
     */
    @GetMapping("/marketing/appreciationEventMgmt.getAppreciationEventList.do")
    @ResponseBody
    public RealGridListResponse getAppreciationEventList(AppreciateRequest appreciateRequest) throws Exception {
        int totalCount = appreciationMgmtService.getAppreciationEventListCount(appreciateRequest);
        List<AppreciateResponse> promotionList = appreciationMgmtService.getAppreciationEventList(appreciateRequest);
        RealGridListResponse response = new RealGridListResponse(promotionList, totalCount);
        return response;
    }

    /**
     * 사은행사 등록 화면 호출
     * @param model
     * @return
     * @throws Exception
     */
    @GetMapping("/marketing/appreciationEventMgmt.appreciationEventRegistView.do")
    public String appreciationEventRegistView(Model model) throws Exception {
        Map<String, List<StStdCd>> codeList = codeService.getStStdCd("MK003,MK012,MK016");
        model.addAttribute("codeList", codeList);
        return "views/marketing/appreciationEventSaveView";
    }

    /**
     * 사은행사 상세 화면 호출
     * @param aeNo
     * @param model
     * @return
     * @throws Exception
     */
    @GetMapping("/marketing/appreciationEventMgmt.appreciationEventModifyView.do")
    public String appreciationEventModifyView(@RequestParam String aeNo, Model model) throws Exception {
        Map<String, List<StStdCd>> codeList = codeService.getStStdCd("MK003,MK012,MK016");
        AppreciateDetailResponse appreciation = appreciationMgmtService.getAppreciation(aeNo);
        model.addAttribute("codeList", codeList);
        model.addAttribute("appreciation", appreciation);
        return "views/marketing/appreciationEventSaveView";
    }

    /**
     * 사은행사 등록 및 업데이트
     * @param appreciationCudRequest
     * @return
     * @throws Exception
     */
    @PostMapping("/marketing/appreciationEventMgmt.saveAppreciation.do")
    @ResponseBody
    public JSONResponseEntity<Void> saveAppreciation(@RequestBody AppreciationCudRequest appreciationCudRequest) throws Exception{
    	appreciationMgmtService.saveAppreciation(appreciationCudRequest);
        return new JSONResponseEntity<Void>(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
    }

    /**
     * 사은행사 삭제
     * @param promoNo
     * @return
     * @throws Exception
     */
    @GetMapping("/marketing/appreciationEventMgmt.deleteAppreciation.do")
    @ResponseBody
    public JSONResponseEntity<Void> deleteAppreciation(@RequestParam String aeNo) throws Exception{
    	appreciationMgmtService.deleteAppreciation(aeNo);
        return new JSONResponseEntity<Void>(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
    }

}

