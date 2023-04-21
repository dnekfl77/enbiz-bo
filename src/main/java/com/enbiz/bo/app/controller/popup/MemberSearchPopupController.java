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
import com.enbiz.bo.app.dto.request.popup.MemberSearchRequest;
import com.enbiz.bo.app.dto.response.popup.MemberSearchResponse;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.entity.StStdCd;
import com.enbiz.bo.app.service.code.CodeService;
import com.enbiz.bo.app.service.popup.MemberSearchPopupService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 브랜드 팝업 관리
 */
@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class MemberSearchPopupController extends BaseController {

    private final MemberSearchPopupService memberSearchPopupService;
    
    private final CodeService codeService;

    /**
     * 회원 조회 팝업 호출
     */
    @GetMapping("/popup/memberSearch.memberSearchPopup.do")
    public String memberSearchPopup(Model model, @Valid MemberSearchRequest memberSearchRequest) throws Exception {

        Map<String, List<StStdCd>> codeList = codeService.getStStdCd("ME024,ME003");

        model.addAttribute("codeList", codeList);
        model.addAttribute("requestData", memberSearchRequest);

        return "views/popup/memberSearchPopup";

    }

    /**
     * 회원 목록 조회
     */
    @GetMapping(value = "/popup/memberSearch.getMemberList.do", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public RealGridListResponse getMemberList(MemberSearchRequest memberSearchRequest) throws Exception {

        int totalCount = memberSearchPopupService.getMemberListCount(memberSearchRequest);
        List<MemberSearchResponse> memberSearchResponseList =
                memberSearchPopupService.getMemberList(memberSearchRequest);

        RealGridListResponse response = new RealGridListResponse(memberSearchResponseList, totalCount);

        return response;

    }
}

