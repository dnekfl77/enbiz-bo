package com.enbiz.bo.app.controller.customerservice;

import java.util.List;
import java.util.Map;

import org.springframework.context.annotation.Lazy;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.enbiz.bo.app.controller.BaseController;
import com.enbiz.bo.app.dto.ajax.JSONResponseEntity;
import com.enbiz.bo.app.dto.request.customerservice.ConsultTypeCuRequest;
import com.enbiz.bo.app.dto.request.customerservice.CounselingTypePopupRequest;
import com.enbiz.bo.app.dto.request.customerservice.CounselingTypeRequest;
import com.enbiz.bo.app.dto.request.realgrid.RealGridCUDRequest;
import com.enbiz.bo.app.dto.response.customerservice.CounselingTypeResponse;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.entity.StStdCd;
import com.enbiz.bo.app.enums.common.CommonCode;
import com.enbiz.bo.app.service.code.CodeService;
import com.enbiz.bo.app.service.customerservice.CounselingTypeMgmtService;
import com.enbiz.bo.base.annotation.RealGridCUD;
import com.enbiz.common.base.exception.MessageResolver;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 상담유형관리 Controller
 */
@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class CounselingTypeMgmtController extends BaseController{
	
	private final CounselingTypeMgmtService counselingTypeMgmtService;
	private final CodeService codeService;
	
	
	/**
     * 상담유형관리 화면 호출
     * @return
     */
    @GetMapping("/customerservice/counselingTypeMgmt.counselingTypeMgmtView.do")
    public String counselingTypeMgmtView(Model model) throws Exception{
        Map<String, List<StStdCd>> codeList = codeService.getStStdCd("CS001");
        model.addAttribute("codeList", codeList);
        return "views/customerservice/counselingTypeMgmtView";
    }

    /**
     * 상담유형관리 Tree형태 목록 조회
     * @return
     * @throws Exception
     */
    @GetMapping(value = "/customerservice/counselingTypeMgmt.getCounselingTypeList.do" , produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<CounselingTypeResponse> getConsultationTypeList(@RequestParam(required = false) String useYn) throws Exception{
        return counselingTypeMgmtService.getCounselingTypeList(useYn);
    }

    /**
     * 상담유형관리 1dept 하위 목록 조회
     * @return
     * @throws Exception
     */
    @GetMapping(value = "/customerservice/counselingTypeMgmt.getLowerCounselingTypeList.do", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public RealGridListResponse getLowerConsultationTypeList(CounselingTypeRequest CounselingTypeRequest) throws Exception{
        int totalCount = counselingTypeMgmtService.getLowerCounselingTypeListCount(CounselingTypeRequest);
        List<CounselingTypeResponse> lowerCsTypeList = counselingTypeMgmtService.getLowerCounselingTypeList(CounselingTypeRequest);
        RealGridListResponse response = new RealGridListResponse(lowerCsTypeList, totalCount);
        return response;
    }


    /**
     * 상담유형관리 등록 및 업데이트
     * @param realGridCUD
     * @return
     * @throws Exception
     */
    @PostMapping("/customerservice/counselingTypeMgmt.saveCounselingType.do")
    @ResponseBody
    public JSONResponseEntity<Void> saveCounselingType(@RealGridCUD(type = ConsultTypeCuRequest.class) RealGridCUDRequest<ConsultTypeCuRequest> realGridCUD) throws Exception{
        List<ConsultTypeCuRequest> createList = realGridCUD.getCreate(), updateList = realGridCUD.getUpdate();
        counselingTypeMgmtService.saveCounselingType(createList, updateList);
        JSONResponseEntity<Void> jsonResponseEntity = new JSONResponseEntity<Void>(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
        return jsonResponseEntity;
    }

    /**
     * 상담유형조회 화면 호출
     * @param model
     * @return
     * @throws Exception
     */
    @GetMapping("/customerservice/counselingTypeMgmt.counselingTypeListPopup.do")
    public String consultationTypeListPopup(@RequestParam(required = false) String custCnslGbCd,Model model) throws Exception{
        Map<String, List<StStdCd>> codeList = codeService.getStStdCd("CS001");
        model.addAttribute("codeList", codeList);
        model.addAttribute("custCnslGbCd", custCnslGbCd);
        return "views/customerservice/counselingTypeListPopup";
    }

    /**
     * 상담유형 대유형/중유형/소유형 조회
     * @param depth
     * @param cnslTypNo
     * @return
     * @throws Exception
     */
    @GetMapping("/customerservice/counselingTypeMgmt.getCounselingTypeNoList.do")
    @ResponseBody
    public List<CounselingTypeResponse> getCounselingTypeNoList(String cnslTypNo) throws Exception {
        return counselingTypeMgmtService.getCounselingTypeNoList(cnslTypNo);
    }

    /**
     * 상담유형조회
     * @return
     * @throws Exception
     */
    @GetMapping(value = "/customerservice/counselingTypeMgmt.getCounselingTypeListPopup.do", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public RealGridListResponse getCounselingTypeListPopup(CounselingTypePopupRequest CounselingTypePopupRequest) throws Exception{
        CounselingTypePopupRequest.setRootCnslTypNo(CommonCode.CS_CNSL_TYP_ROOT.getCd());
        int totalCount = counselingTypeMgmtService.getCounselingTypeListPopupCount(CounselingTypePopupRequest);
        List<CounselingTypeResponse> lowerCsTypeList = counselingTypeMgmtService.getCounselingTypeListPopup(CounselingTypePopupRequest);
        RealGridListResponse response = new RealGridListResponse(lowerCsTypeList, totalCount);
        return response;
    }

}
