package com.enbiz.bo.app.controller.popup;

import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.context.annotation.Lazy;
import org.springframework.core.env.Environment;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.enbiz.bo.app.controller.BaseController;
import com.enbiz.bo.app.dto.request.display.PrDispCtgBaseRequest;
import com.enbiz.bo.app.dto.response.display.PrDispCtgBaseResponse;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.entity.StStdCd;
import com.enbiz.bo.app.service.code.CodeService;
import com.enbiz.bo.app.service.popup.DisplayCategoryMgmtPopupService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.sf.json.JSONObject;

/**
 * 전시 카테고리 관리
 */
@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class DisplayCategoryMgmtPopupController extends BaseController {

    private final DisplayCategoryMgmtPopupService displayCategoryService;
    private final Environment env;
    private final CodeService codeService;

    /**
     * 전시 카테고리 조회 첫 로딩 화면
     * @param model
     * @param prDispCtgBaseRequest
     * @return
     * @throws Exception
     */
    @GetMapping(value="/popup/displayCategoryMgmtPopup.displayCategoryListPopup.do")
    public String getDisplayCategory(Model model, @Valid PrDispCtgBaseRequest prDispCtgBaseRequest) throws Exception {
        List<PrDispCtgBaseResponse> siteList = displayCategoryService.getCcSiteBase();
        Map<String, List<StStdCd>> codeList = codeService.getStStdCd("DP003");
        model.addAttribute("siteList", siteList);
        model.addAttribute("codeList", codeList);
        model.addAttribute("requestData", prDispCtgBaseRequest);
        return "views/popup/displayCategoryListPopup";
    }

    /**
     * 전시 카테고리 목록 조회
     *
     * @param prDispCtgBaseRequest
     * @return realGridListResponse
     * @throws Exception
     */
    @GetMapping(value = "/popup/displayCategoryMgmtPopup.getDisplayCategoryList.do", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public RealGridListResponse getDisplayCategoryList(PrDispCtgBaseRequest prDispCtgBaseRequest) throws Exception {
        int totalCount = displayCategoryService.getDisplayCategoryListCount(prDispCtgBaseRequest);
        List<PrDispCtgBaseResponse> prDispCtgList = displayCategoryService.getDisplayCategoryList(prDispCtgBaseRequest);
        RealGridListResponse response = new RealGridListResponse(prDispCtgList, totalCount);
        return response;
    }

    /**
     * 전시 카테고리 Tree 조회 첫 로딩 화면
     * @param model
     * @param prDispCtgBaseRequest
     * @return
     * @throws Exception
     */
    @GetMapping(value="/popup/displayCategoryMgmtPopup.displayCategoryTreeListPopup.do")
    public String getDisplayCategoryTree(Model model, @Valid PrDispCtgBaseRequest prDispCtgBaseRequest) throws Exception {
        List<PrDispCtgBaseResponse> siteList = displayCategoryService.getCcSiteBase();
        model.addAttribute("siteList", siteList);
        model.addAttribute("request", prDispCtgBaseRequest.getSiteNo());
        return "views/popup/displayCategoryTreeListPopup";
    }

    /**
     * 전시 카테고리 Tree 리스트
     * @param prDispCtgBaseRequest
     * @return
     * @throws Exception
     */
    @GetMapping(value="/popup/displayCategoryMgmtPopup.displayCategoryTreeList.do")
    @ResponseBody
    public Object getDisplayCategoryTreeList(PrDispCtgBaseRequest prDispCtgBaseRequest) throws Exception {
        JSONObject object = new JSONObject();
        // prDispCtgBaseRequest.setRootNode(env.getProperty("display.categoryRootNodeNumber"));
        prDispCtgBaseRequest.setRootNode(prDispCtgBaseRequest.getSiteNo());
        object.put("category", displayCategoryService.getDisplayCategoryTreeList(prDispCtgBaseRequest));
        return object;
    }

}