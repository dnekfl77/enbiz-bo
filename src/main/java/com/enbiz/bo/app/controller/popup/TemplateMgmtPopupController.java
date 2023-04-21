package com.enbiz.bo.app.controller.popup;

import java.util.List;
import java.util.Map;

import org.springframework.context.annotation.Lazy;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.enbiz.bo.app.controller.BaseController;
import com.enbiz.bo.app.dto.request.display.PrTmplBaseRequest;
import com.enbiz.bo.app.dto.response.display.PrTmplBaseResponse;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.entity.StStdCd;
import com.enbiz.bo.app.service.code.CodeService;
import com.enbiz.bo.app.service.popup.TemplateMgmtPopupService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 템플릿 관리
 */
@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class TemplateMgmtPopupController extends BaseController {

    private final TemplateMgmtPopupService prTmplBaseService;
    private final CodeService codeService;

    /**
     * 템플릿 조회 첫 로딩 화면
     * @param model
     * @param prTmplBaseRequest
     * @return
     * @throws Exception
     */
    @GetMapping(value="/popup/templateMgmtPopup.templateListPopup.do")
    public String getTemplate(Model model, PrTmplBaseRequest prTmplBaseRequest) throws Exception {
        Map<String, List<StStdCd>> codeList = codeService.getStStdCd("DP004");
        model.addAttribute("codeList", codeList);
        model.addAttribute("requestData", prTmplBaseRequest);
        return "views/popup/templateListPopup";
    }

    /**
     * 템플릿 목록 조회
     *
     * @param prTmplBaseRequest
     * @return realGridListResponse
     * @throws Exception
     */
    @GetMapping(value = "/popup/templateMgmtPopup.getTemplateList.do", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public RealGridListResponse getTemplateList(PrTmplBaseRequest prTmplBaseRequest) throws Exception {
        int totalCount = prTmplBaseService.getTemplateListCount(prTmplBaseRequest);
        List<PrTmplBaseResponse> prTmplList = prTmplBaseService.getTemplateList(prTmplBaseRequest);
        RealGridListResponse response = new RealGridListResponse(prTmplList, totalCount);
        return response;
    }

}