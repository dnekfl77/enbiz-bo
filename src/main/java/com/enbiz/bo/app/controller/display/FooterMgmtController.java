package com.enbiz.bo.app.controller.display;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.enbiz.bo.app.controller.BaseController;
import com.enbiz.bo.app.dto.ajax.JSONResponseEntity;
import com.enbiz.bo.app.dto.request.display.CcFotrInfoRequest;
import com.enbiz.bo.app.dto.request.realgrid.RealGridCUDRequest;
import com.enbiz.bo.app.dto.response.display.CcFotrInfoResponse;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.entity.CcFotrInfo;
import com.enbiz.bo.app.service.code.CodeService;
import com.enbiz.bo.app.service.display.FooterMgmtService;
import com.enbiz.bo.app.service.display.SiteMgmtService;
import com.enbiz.bo.base.annotation.RealGridCUD;
import com.enbiz.common.base.exception.MessageResolver;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 푸터 관리
 */
@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class FooterMgmtController extends BaseController {

    private final FooterMgmtService footerMgmtService;
    private final SiteMgmtService siteMgmtService; // 사이트 관리 Service
    private final CodeService codeService;

    /**
     * 푸터 관리 화면 호출
     * @param model
     * @return
     * @throws Exception
     */
    @GetMapping(value="/display/footerMgmt.footerMgmtView.do")
    public String siteMgmtView(Model model) throws Exception {
        model.addAttribute("siteList", siteMgmtService.getSiteNmList());
        //시스템구분코드(CH003), 푸터컨텐츠구분코드(CH004), 이동프레임코드(DP007)
        model.addAttribute("codeList", codeService.getStStdCd("CH003,CH004,DP007"));
        return "views/display/footerMgmtView";
    }

    /**
     * 푸터 관리 _ 푸터메뉴 그룹 목록 조회
     * @param ccFotrInfoRequest
     * @return
     * @throws Exception
     */
    @GetMapping(value = "/display/footerMgmt.getFooterMgmtGroup.do", produces = "application/json;charset=UTF-8")
    @ResponseBody
    public RealGridListResponse getFooterMgmtGroup(CcFotrInfoRequest ccFotrInfoRequest) throws Exception {
        int totalCount = footerMgmtService.getCcFotrInfoGrpListCount(ccFotrInfoRequest);
        List<CcFotrInfoResponse> ccFotrInfoList = footerMgmtService.getCcFotrInfoGrpList(ccFotrInfoRequest);
        RealGridListResponse response = new RealGridListResponse(ccFotrInfoList, totalCount);
        return response;
    }

    /**
     * 푸터 관리 - 메뉴그룹 저장
     * @param realGridCUD
     * @return
     * @throws Exception
     */
    @PostMapping("/display/footerMgmt.saveCcFotrInfoGroup.do")
	@ResponseBody
	public JSONResponseEntity saveCcFotrInfoGroup(@RealGridCUD(type = CcFotrInfo.class) RealGridCUDRequest<CcFotrInfo> realGridCUD) throws Exception {
        List<CcFotrInfo> createList = realGridCUD.getCreate(), updateList = realGridCUD.getUpdate(), deleteList = realGridCUD.getDelete();
        footerMgmtService.saveCcFotrInfoGroup(createList, updateList, deleteList);
        JSONResponseEntity jsonResponseEntity = new JSONResponseEntity(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
        return jsonResponseEntity;
    }

    /**
     * 푸터메뉴 그룹 삭제 시 하위 메뉴 존재 여부
     * @param ccFotrInfoRequest
     * @return
     * @throws Exception
     */
    @PostMapping(value = "/display/footerMgmt.checkFooterMgmtDelete.do", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public JSONResponseEntity checkFooterMgmtDelete(CcFotrInfoRequest ccFotrInfoRequest) throws Exception {
        int menuCount = footerMgmtService.getCcFotrInfoMenuListCount(ccFotrInfoRequest);
        JSONResponseEntity response = new JSONResponseEntity();
        response.setData(menuCount);
        return response;
    }

    /**
     * 푸터 관리 - 푸터 컨텐츠 조회
     * @param ccFotrInfoRequest
     * @return
     * @throws Exception
     */
    @PostMapping(value = "/display/footerMgmt.getFooterMgmtCont.do", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public JSONResponseEntity getFooterMgmtCont(CcFotrInfoRequest ccFotrInfoRequest) throws Exception {
        CcFotrInfoResponse ccFotrInfoResponse = footerMgmtService.getFooterMgmtCont(ccFotrInfoRequest);
        JSONResponseEntity response = new JSONResponseEntity();
        response.setData(ccFotrInfoResponse);
        return response;
    }

    /**
     * 푸터 관리 - 푸터 컨텐츠 저장
     * @param ccFotrInfo
     * @return
     * @throws Exception
     */
    @PostMapping(value = "/display/footerMgmt.saveFooterMgmtFotrCont.do", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public JSONResponseEntity saveFooterMgmtFotrCont(CcFotrInfo ccFotrInfo) throws Exception {
        footerMgmtService.updateCcFotrCont(ccFotrInfo);
        JSONResponseEntity jsonResponseEntity = new JSONResponseEntity(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
        jsonResponseEntity.setSucceeded(true);
        return jsonResponseEntity;
    }

    /**
     * 푸터 관리 - 메뉴 목록 조회
     * @param ccFotrInfoRequest
     * @return
     * @throws Exception
     */
    @GetMapping(value = "/display/footerMgmt.getFooterMgmtMenu.do", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public RealGridListResponse getFooterMgmtMenu(CcFotrInfoRequest ccFotrInfoRequest) throws Exception {
        int totalCount = footerMgmtService.getCcFotrInfoMenuListCount(ccFotrInfoRequest);
        List<CcFotrInfoResponse> ccFotrInfoList = footerMgmtService.getCcFotrInfoMenuList(ccFotrInfoRequest);
        RealGridListResponse response = new RealGridListResponse(ccFotrInfoList, totalCount);
        return response;
    }

    /**
     * 푸터 관리 - 메뉴 저장
     * @param realGridCUD
     * @return
     * @throws Exception
     */
    @PostMapping("/display/footerMgmt.saveCcFotrInfoMenu.do")
	@ResponseBody
	public JSONResponseEntity saveCcFotrInfoMenu(@RealGridCUD(type = CcFotrInfo.class) RealGridCUDRequest<CcFotrInfo> realGridCUD) throws Exception {
        List<CcFotrInfo> createList = realGridCUD.getCreate(), updateList = realGridCUD.getUpdate(), deleteList = realGridCUD.getDelete();
        footerMgmtService.saveCcFotrInfoMenu(createList, updateList, deleteList);
        JSONResponseEntity jsonResponseEntity = new JSONResponseEntity( MessageResolver.getMessage("adminCommon.message.saved.successfully"));
        return jsonResponseEntity;
    }

}