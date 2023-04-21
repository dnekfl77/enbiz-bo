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
import com.enbiz.bo.app.dto.request.display.PrConrBaseRequest;
import com.enbiz.bo.app.dto.request.display.PrTmplBaseRequest;
import com.enbiz.bo.app.dto.request.display.PrTmplConrMappInfoRequest;
import com.enbiz.bo.app.dto.request.realgrid.RealGridCUDRequest;
import com.enbiz.bo.app.dto.response.display.PrConrBaseResponse;
import com.enbiz.bo.app.dto.response.display.PrTmplBaseResponse;
import com.enbiz.bo.app.dto.response.display.PrTmplConrMappInfoResponse;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.entity.PrTmplBase;
import com.enbiz.bo.app.entity.PrTmplConrMappInfo;
import com.enbiz.bo.app.service.code.CodeService;
import com.enbiz.bo.app.service.display.DisplayCornerMgmtService;
import com.enbiz.bo.app.service.display.DisplayTemplateMgmtService;
import com.enbiz.bo.base.annotation.RealGridCUD;
import com.enbiz.common.base.exception.MessageResolver;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 전시 템플릿 관리
 */
@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class DisplayTemplateMgmtController extends BaseController {
    
    private final DisplayTemplateMgmtService displayTemplateMgmtService;
    private final DisplayCornerMgmtService displayCornerMgmtService;
    private final CodeService codeService;

    /**
     * 전시 템플릿 관리 로딩 화면
     * @param model
     * @return
     * @throws Exception
     */
    @GetMapping("/display/displayTemplateMgmt.displayTemplateMgmtView.do")
    public String displayTemplateList(Model model) throws Exception {
        model.addAttribute("codeList", codeService.getStStdCd("DP004"));
        return "views/display/displayTemplateMgmtView";
    }

    /**
     * 전시 템플릿 관리 목록 조회
     * @param prTmplBaseRequest
     * @return
     * @throws Exception
     */
    @GetMapping(value = "/display/displayTemplateMgmt.getDisplayTemplateMgmt.do")
    @ResponseBody
    public RealGridListResponse getDisplayTemplateList(PrTmplBaseRequest prTmplBaseRequest) throws Exception {
        int totalCount = displayTemplateMgmtService.getDisplayTemplateListCount(prTmplBaseRequest);
        List<PrTmplBaseResponse> tmplList = displayTemplateMgmtService.getDisplayTemplateList(prTmplBaseRequest);
        RealGridListResponse response = new RealGridListResponse(tmplList, totalCount);
        return response;
    }

    /**
     * 전시 템플릿 관리 저장
     * @param realGridCUD 신규, 수정, 삭제목록
     * @return
     * @throws Exception
     */
    @PostMapping("/display/displayTemplateMgmt.saveDisplayTemplateMgmt.do")
    @ResponseBody
    public JSONResponseEntity saveDisplayTemplateList(@RealGridCUD(type = PrTmplBase.class) RealGridCUDRequest<PrTmplBase> realGridCUD) throws Exception {
        List<PrTmplBase> createList = realGridCUD.getCreate(), updateList = realGridCUD.getUpdate(), deleteList = realGridCUD.getDelete();
        displayTemplateMgmtService.registCUD(createList, updateList, deleteList);
        JSONResponseEntity jsonResponseEntity = new JSONResponseEntity(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
        return jsonResponseEntity;
    }

    /**
     * 템플릿코너매핑정보에 해당 템플릿과 연결된 코너 데이터 여부 확인
     * @param prTmplBaseRequest
     * @return
     * @throws Exception
     */
    @PostMapping(value = "/display/displayTemplateMgmt.checkPrTmplConrMappInfo.do")
    @ResponseBody
    public JSONResponseEntity checkPrTmplConrMappInfo(PrTmplBaseRequest prTmplBaseRequest) throws Exception {
        boolean result = displayTemplateMgmtService.checkPrTmplConrMappInfo(prTmplBaseRequest);
        JSONResponseEntity response = new JSONResponseEntity();
        response.setSucceeded(result);
        return response;
    }

    /**
     * 전시 템플릿 관리 _ 코너 목록 조회
     * @param prTmplConrMappInfoRequest
     * @return
     * @throws Exception
     */
    @GetMapping(value = "/display/displayTemplateMgmt.getDisplayTemplateMgmtCorner.do")
    @ResponseBody
    public RealGridListResponse getDisplayCornerList(PrTmplConrMappInfoRequest prTmplConrMappInfoRequest) throws Exception {
        int totalCount = displayTemplateMgmtService.getDisplayCornerListCount(prTmplConrMappInfoRequest);
        List<PrTmplConrMappInfoResponse> conrList = displayTemplateMgmtService.getDisplayCornerList(prTmplConrMappInfoRequest);
        RealGridListResponse response = new RealGridListResponse(conrList, totalCount);
        return response;
    }

    /**
     * 전시 템플릿 관리 _ 코너 저장
     * @param realGridCUD 신규, 수정, 삭제목록
     * @return 성공 메시지
     * @throws Exception
     */
    @PostMapping("/display/displayTemplateMgmt.saveDisplayTemplateMgmtCorner.do")
    @ResponseBody
    public JSONResponseEntity saveDisplayCornerList(@RealGridCUD(type = PrTmplConrMappInfo.class) RealGridCUDRequest<PrTmplConrMappInfo> realGridCUD) throws Exception {
        List<PrTmplConrMappInfo> createList = realGridCUD.getCreate(), updateList = realGridCUD.getUpdate(), deleteList = realGridCUD.getDelete();
        displayTemplateMgmtService.cornerRegistCUD(createList, updateList, deleteList);
        JSONResponseEntity jsonResponseEntity = new JSONResponseEntity(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
        return jsonResponseEntity;
    }

    /**
     * 코너 삭제시 전시코너정보에 해당 코너 데이터 여부 확인
     * @param prTmplConrMappInfoRequest
     * @return
     * @throws Exception
     */
    @PostMapping(value = "/display/displayTemplateMgmt.checkPrDispConrInfo.do")
    @ResponseBody
    public JSONResponseEntity checkPrDispConrInfo(PrTmplConrMappInfoRequest prTmplConrMappInfoRequest) throws Exception {
        boolean result = displayTemplateMgmtService.checkPrDispConrInfo(prTmplConrMappInfoRequest);
        JSONResponseEntity response = new JSONResponseEntity();
        response.setSucceeded(result);
        return response;
    }

    /**
     * 전시 코너 조회 팝업 화면 호출
     * @return
     * @throws Exception
     */
    @GetMapping(value="/display/displayTemplateMgmt.displayTemplateMgmtCornerPopup.do")
    public String displayCornerListPopup() throws Exception {
        return "views/display/displayTemplateMgmtCornerPopup";
    }

    /**
     * 전시 코너 조회 팝업 조회
     * @param prConrBaseRequest
     * @return realGridListResponse
     * @throws Exception
     */
    @GetMapping(value = "/display/displayTemplateMgmt.getDisplayTemplateMgmtCornerPopup.do")
    @ResponseBody
    public RealGridListResponse getCornerListPopup(PrConrBaseRequest prConrBaseRequest) throws Exception {
        int totalCount = displayCornerMgmtService.getCornerListPopupCount(prConrBaseRequest);
        List<PrConrBaseResponse> prTmplList = displayCornerMgmtService.getCornerListPopup(prConrBaseRequest);
        RealGridListResponse response = new RealGridListResponse(prTmplList, totalCount);
        return response;
    }

}