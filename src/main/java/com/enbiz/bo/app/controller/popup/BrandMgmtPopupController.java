package com.enbiz.bo.app.controller.popup;

import java.util.List;

import javax.validation.Valid;

import org.springframework.context.annotation.Lazy;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.enbiz.bo.app.controller.BaseController;
import com.enbiz.bo.app.dto.request.popup.PrBrandMstRequest;
import com.enbiz.bo.app.dto.response.popup.PrBrandMstResponse;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.service.popup.BrandMgmtPopupService;
import com.enbiz.bo.base.annotation.RealGridSearch;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 브랜드 팝업 관리
 */
@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class BrandMgmtPopupController extends BaseController {

    private final BrandMgmtPopupService brandMgmtPopupService;

    /**
     * 브랜드 조회 팝업 호출
     * @param model
     * @return 브랜드 조회 팝업 화면
     * @throws Exception
     */
    @GetMapping("/popup/brandMgmt.brandListPopup.do")
    public String brandListPopup(Model model, @Valid PrBrandMstRequest prBrandMstRequest) throws Exception {
        model.addAttribute("requestData", prBrandMstRequest);
        return "views/popup/brandListPopup";
    }

    /**
     * 브랜드 목록 조회
     * @param prBrandMstRequest
     * @return RealGridListResponse
     * @throws Exception
     */
    @GetMapping(value = "/popup/brandMgmt.getBrandList.do", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @RealGridSearch
    public RealGridListResponse getBrandList(PrBrandMstRequest prBrandMstRequest) throws Exception {
        int totalCount = brandMgmtPopupService.getBrandListCount(prBrandMstRequest);
        List<PrBrandMstResponse> brandList = brandMgmtPopupService.getBrandList(prBrandMstRequest);

        RealGridListResponse response = new RealGridListResponse(brandList, totalCount);
        return response;
    }
}

