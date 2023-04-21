package com.enbiz.bo.app.controller.display;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.enbiz.bo.app.controller.BaseController;
import com.enbiz.bo.app.dto.ajax.JSONResponseEntity;
import com.enbiz.bo.app.dto.request.display.CcSiteBaseRequest;
import com.enbiz.bo.app.dto.request.realgrid.RealGridCUDRequest;
import com.enbiz.bo.app.dto.response.display.CcSiteBaseResponse;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.entity.CcSiteBase;
import com.enbiz.bo.app.service.display.SiteMgmtService;
import com.enbiz.bo.base.annotation.RealGridCUD;
import com.enbiz.common.base.exception.MessageResolver;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 사이트관리
 */
@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class SiteMgmtController extends BaseController {

    private final SiteMgmtService siteMgmtService;

    /**
     * 사이트관리 화면 호출
     * @param model
     * @return
     * @throws Exception
     */
    @GetMapping(value="/display/siteMgmt.siteMgmtView.do")
    public String siteMgmtView(Model model) throws Exception {
        model.addAttribute("list", siteMgmtService.getSiteNmList());
        return "views/display/siteMgmtView";
    }

    /**
     * 사이트관리 목록 조회
     * @param ccSiteBaseRequest
     * @return
     * @throws Exception
     */
    @GetMapping(value = "/display/siteMgmt.getSiteMgmt.do")
    @ResponseBody
    public RealGridListResponse getSiteMgmt(CcSiteBaseRequest ccSiteBaseRequest) throws Exception {
        int totalCount = siteMgmtService.getSiteBaseListCount(ccSiteBaseRequest);
        List<CcSiteBaseResponse> ccSiteBaseList = siteMgmtService.getSiteBaseList(ccSiteBaseRequest);
        RealGridListResponse response = new RealGridListResponse(ccSiteBaseList, totalCount);
        return response;
    }

    /**
     * 사이트관리 수정 및 저장
     * @param
     * @return 성공 메시지
     * @throws Exception
     */
    @PostMapping("/display/siteMgmt.saveSiteBase.do")
    @ResponseBody
    public JSONResponseEntity saveSiteBase(@RealGridCUD(type = CcSiteBase.class) RealGridCUDRequest<CcSiteBase> realGridCUD) throws Exception {
        List<CcSiteBase> createList = realGridCUD.getCreate(), updateList = realGridCUD.getUpdate();
        siteMgmtService.registCUD(createList, updateList);
        JSONResponseEntity jsonResponseEntity = new JSONResponseEntity(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
        return jsonResponseEntity;
    }

}
