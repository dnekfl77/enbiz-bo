package com.enbiz.bo.app.controller.popup;

import java.util.List;

import javax.validation.Valid;

import org.springframework.context.annotation.Lazy;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.enbiz.bo.app.dto.request.popup.StZipNoPopupRequest;
import com.enbiz.bo.app.dto.response.popup.StZipNoPopupResponse;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.service.popup.ZipCodeMgmtPopupService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 우편번호 팝업
 */
@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class ZipCodeMgmtPopupController {

    private final ZipCodeMgmtPopupService zipNoService;

    /**
     * 우편번호 팝업 화면 호출
     * @param model
     * @param stZipNoPopupRequest
     * @return
     * @throws Exception
     */
    @GetMapping("/popup/zipCodeMgmtPopup.zipNoListPopup.do")
    public String zipNoListPopup(Model model, @Valid StZipNoPopupRequest stZipNoPopupRequest) throws Exception {
        model.addAttribute("requestData", stZipNoPopupRequest);
        return "views/popup/zipNoListPopup";
    }

    /**
     *
     * @param stZipNoPopupRequest
     * @return
     * @throws Exception
     */
    @GetMapping(value = "/popup/zipCodeMgmtPopup.getZipNoPopupList.do", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public RealGridListResponse getZipNoPopupList(StZipNoPopupRequest stZipNoPopupRequest) throws Exception {
        int totalCount = zipNoService.getZipNoPopupListCount(stZipNoPopupRequest);
        List<StZipNoPopupResponse> zipNoPopupList = zipNoService.getZipNoPopupList(stZipNoPopupRequest);
        RealGridListResponse response = new RealGridListResponse(zipNoPopupList, totalCount);
        return response;
    }



}
