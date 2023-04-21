package com.enbiz.bo.app.controller.customerservice;

import java.util.ArrayList;
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
import org.springframework.web.multipart.MultipartFile;

import com.enbiz.bo.app.controller.BaseController;
import com.enbiz.bo.app.dto.ajax.JSONResponseEntity;
import com.enbiz.bo.app.dto.request.customerservice.CsAssignRequest;
import com.enbiz.bo.app.dto.request.customerservice.CsAssignRetrieveRequest;
import com.enbiz.bo.app.dto.request.customerservice.CsAutoDivideAempRequest;
import com.enbiz.bo.app.dto.request.customerservice.CsAutoMangersRequest;
import com.enbiz.bo.app.dto.request.customerservice.CsDeptUserRequest;
import com.enbiz.bo.app.dto.request.customerservice.CsObCounselInfoRequest;
import com.enbiz.bo.app.dto.request.customerservice.CsObTypCdRequest;
import com.enbiz.bo.app.dto.request.customerservice.InquireTypeRequest;
import com.enbiz.bo.app.dto.request.realgrid.RealGridCUDRequest;
import com.enbiz.bo.app.dto.response.customerservice.CsAssignResponse;
import com.enbiz.bo.app.dto.response.customerservice.CsAutoDivideAempInfoResponse;
import com.enbiz.bo.app.dto.response.customerservice.CsDeptAempResponse;
import com.enbiz.bo.app.dto.response.customerservice.CsDeptUserResponse;
import com.enbiz.bo.app.dto.response.customerservice.CsObCounselInfoResponse;
import com.enbiz.bo.app.dto.response.customerservice.CsObTypCdResponse;
import com.enbiz.bo.app.dto.response.customerservice.InquireTypeResponse;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.dto.response.system.UserDeptResponse;
import com.enbiz.bo.app.entity.CsAutoDivideAempInfo;
import com.enbiz.bo.app.entity.StStdCd;
import com.enbiz.bo.app.service.code.CodeService;
import com.enbiz.bo.app.service.customerservice.CsAllocationMgmtService;
import com.enbiz.bo.app.service.customerservice.InquiryTypeMgmtService;
import com.enbiz.bo.app.service.customerservice.ObTypeMgmtService;
import com.enbiz.bo.base.annotation.RealGridCUD;
import com.enbiz.common.base.entity.BaseCommonEntity;
import com.enbiz.common.base.exception.MessageResolver;
import com.enbiz.common.base.util.ExcelUtils;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 상담할당관리 Controller
 */
@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class CsAllocationMgmtController extends BaseController{

	private final CsAllocationMgmtService csAllocationMgmtService;
    private final ObTypeMgmtService obTypeMgmtService;
    private final InquiryTypeMgmtService inquiryTypeMgmtService;
    private final CodeService codeService;

    /**
     * 상담할당관리 화면 호출
     */
    @GetMapping("/customerservice/csAllocationMgmt.csAllocationMgmtView.do")
    public String csAllocationMgmtView(Model model) throws Exception{
        Map<String, List<StStdCd>> codeList = codeService.getStStdCd("CS023");
        model.addAttribute("codeList", codeList);
        return "views/customerservice/csAllocationMgmtView";
    }

    /**
     * 자동배분상세번호 조회
     */
    @GetMapping("/customerservice/csAllocationMgmt.getAutoDivideDetailNo.do")
    @ResponseBody
    public List<CsAutoDivideAempInfoResponse> getAutoDivideDetailNo(String autoDivGbCd) throws Exception{
        return csAllocationMgmtService.getAutoDivideDetailNo(autoDivGbCd);
    }

    /**
     * 상담할당관리 > 상담할당목록
     */
    @GetMapping("/customerservice/csAllocationMgmt.getCsAllocationMgmt.do")
    @ResponseBody
    public RealGridListResponse getCsAllocationMgmt(CsAssignRequest request) throws Exception{
        List<CsAssignResponse> csAssignList = csAllocationMgmtService.csAllocationMgmtList(request);
        RealGridListResponse response = new RealGridListResponse(csAssignList,csAssignList.size());
        return response;
    }

    /**
     * 상담할당관리 > 업무유형별 담당자 목록
     */
    @GetMapping("/customerservice/csAllocationMgmt.getCsAllocationDetailMgmt.do")
    @ResponseBody
    public RealGridListResponse getCsAllocationDetailMgmt(CsAssignRequest request) throws Exception{
        List<CsAssignResponse> csAssignList = csAllocationMgmtService.csAllocationDetailMgmtList(request);
        RealGridListResponse response = new RealGridListResponse(csAssignList,csAssignList.size());
        return response;
    }

    /**
     * 상담할당관리 > 할당회수
     */
    @PostMapping("/customerservice/csAllocationMgmt.retrieveAllocations.do")
    @ResponseBody
    public JSONResponseEntity<Void> retrieveAllocations(@RequestParam Map<String,Object> parameteres) throws Exception {
        String json = parameteres.get("paramList").toString();
        ObjectMapper mapper = new ObjectMapper();
        ArrayList<CsAssignRetrieveRequest> retrieveList = mapper.readValue(json, new TypeReference<ArrayList<CsAssignRetrieveRequest>>() {});
        csAllocationMgmtService.retrieveAllcations(retrieveList);
        JSONResponseEntity<Void> response = new JSONResponseEntity<Void>();
        response.setSucceeded(true);
        return response;
    }
    /**
     * 자동배분설정 화면 호출
     */
    @GetMapping("/customerservice/csAllocationMgmt.autoDistributionSettingPopup.do")
    public String autoDistributionSettingPopup(Model model) throws Exception{
        Map<String, List<StStdCd>> codeList = codeService.getStStdCd("CS023");
        //고객문의유형코드
        InquireTypeRequest inquireTypeRequest = new InquireTypeRequest();
        inquireTypeRequest.setUseYn("Y");
        List<InquireTypeResponse> inqTypeList = inquiryTypeMgmtService.getInquiryTypeSmallNoPaging(inquireTypeRequest);
        //OB유형코드가져오기
        CsObTypCdRequest csObTypCdRequest = new CsObTypCdRequest();
        csObTypCdRequest.setUseYn("Y");
        List<CsObTypCdResponse> obTypeCodeList = obTypeMgmtService.getObTypeNoPagingList(csObTypCdRequest);
        model.addAttribute("codeList", codeList);
        model.addAttribute("inqTypeList", inqTypeList);
        model.addAttribute("obTypeCodeList", obTypeCodeList);
        return "views/customerservice/autoDistributionSettingPopup";
    }


    /**
     * 자동배분 설정 부서코드 Tree형태 목록 조회
     * @return
     * @throws Exception
     */
    @GetMapping(value = "/customerservice/csAllocationMgmt.getCsDeptList.do" , produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<UserDeptResponse> getCsDeptList() throws Exception{
        return csAllocationMgmtService.getCsDeptList();
    }

    /**
     * 자동배분 설정 부서별 사용자 목록 조회
     * @return
     * @throws Exception
     */
    @GetMapping(value = "/customerservice/csAllocationMgmt.getCsDeptUserList.do" , produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public RealGridListResponse getCsDeptUserList(CsDeptUserRequest request) throws Exception{
        int totalCount = csAllocationMgmtService.getCsDeptUserListCount(request);
        List<CsDeptUserResponse> csDeptUserList = csAllocationMgmtService.getCsDeptUserList(request);
        RealGridListResponse response = new RealGridListResponse(csDeptUserList,totalCount);
        return response;
    }

    /**
     * 자동배분 설정 popup 부서별 담당자 정보
     * @return
     * @throws Exception
     */
    @GetMapping(value = "/customerservice/csAllocationMgmt.getAutoDistributionManager.do" , produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public RealGridListResponse getAutoDistributionManager(CsDeptUserRequest request) throws Exception{
        int totalCount = csAllocationMgmtService.getAutoDistributionManagerListCount(request);
        List<CsDeptAempResponse> csDeptUserList = csAllocationMgmtService.getAutoDistributionManagerList(request);
        RealGridListResponse response = new RealGridListResponse(csDeptUserList,totalCount);
        return response;
    }


    /**
     * 자동배분담당자 등록
     * @param realGridCUD
     * @return
     * @throws Exception
     */
    @PostMapping("/customerservice/csAllocationMgmt.saveAutoDistributionManager.do")
    @ResponseBody
    public JSONResponseEntity<Void> saveAutoDistributionManager(@RealGridCUD(type = CsAutoDivideAempInfo.class) RealGridCUDRequest<CsAutoDivideAempInfo> realGridCUD) throws Exception{
        List<CsAutoDivideAempInfo> createList = realGridCUD.getCreate();
        List<CsAutoDivideAempInfo> updateList = realGridCUD.getUpdate();
        List<CsAutoDivideAempInfo> deleteList = realGridCUD.getDelete();
        csAllocationMgmtService.saveAutoDistributionManager(createList, updateList ,deleteList);
        JSONResponseEntity<Void> jsonResponseEntity = new JSONResponseEntity<Void>(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
        return jsonResponseEntity;
    }


    /**
     * CS 자동배분담당자  중복 체크
     * @param request
     * @return
     * @throws Exception
     */
    @GetMapping(value = "/customerservice/csAllocationMgmt.checkValidateManager.do")
    @ResponseBody
    public boolean checkValidateManager(CsAutoDivideAempRequest request) throws Exception{
        return csAllocationMgmtService.checkValidateManager(request);
    }

    /**
     * 자동배분담당자 할당진행 여부 변경
     */
    @PostMapping("/customerservice/csAllocationMgmt.changeAutoDivideAllocationPossibleYn.do")
    @ResponseBody
    public JSONResponseEntity<Void> changeAutoDivideAllocationPossibleYn(CsAutoMangersRequest request) throws Exception {
    	csAllocationMgmtService.changeAutoDivideAllocationPossibleYn(request);
        JSONResponseEntity<Void> response = new JSONResponseEntity<Void>();
        response.setSucceeded(true);
        response.setMessage(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
        return response;
    }

    /**
     * OB 업무등록 화면
     */
    @GetMapping(value = "/customerservice/csAllocationMgmt.obBusinessSaveView.do")
    public String obBusinessSaveView(Model model) throws Exception{
        //OB유형코드가져오기
        CsObTypCdRequest csObTypCdRequest = new CsObTypCdRequest();
        csObTypCdRequest.setUseYn("Y");
        List<CsObTypCdResponse> obTypeCodeList = obTypeMgmtService.getObTypeNoPagingList(csObTypCdRequest);
        model.addAttribute("obTypeCodeList",obTypeCodeList);
        return "views/customerservice/obBusinessSaveView";
    }

    /**
     * OB업무 excel 데이터 가져오기
     * @param excelFile
     * @param excelColumns
     * @return String
     */
    @PostMapping(value = "/customerservice/csAllocationMgmt.getObCsCounselInfoListExcel.do")
    @ResponseBody
    public RealGridListResponse getObCsCounselInfoListExcel(@RequestParam("excelFile") MultipartFile excelFile,
                                                         @RequestParam("excelColumns") String excelColumns,
                                                         String cnslTypNo,
                                                         String obTypNo) throws Exception {
        String fileName = excelFile.getOriginalFilename();
        String extension = null;

        if(fileName != null && fileName.length() > 4) {
            extension=fileName.substring(fileName.lastIndexOf(".") + 1);
        }

        String[] columns = excelColumns.split(",");
        List<? extends BaseCommonEntity> obCsCnslInfoList = null;

        if (extension.contains("csv")) {
            obCsCnslInfoList = ExcelUtils.extractCSVList(excelFile, columns, CsObCounselInfoRequest.class);
        } else if (extension.contains("xls")) {
            obCsCnslInfoList = ExcelUtils.extractExcelList(excelFile, columns, CsObCounselInfoRequest.class);
        } else {
            throw new IllegalArgumentException("확장자가 xls, csv인 경우만 파일 선택 가능합니다.");
        }

        if(obCsCnslInfoList.size() > 0) {
        	csAllocationMgmtService.settingObCsCounselInfoListExcel(obCsCnslInfoList,cnslTypNo,obTypNo);
        }
        RealGridListResponse response = new RealGridListResponse(obCsCnslInfoList, obCsCnslInfoList.size());
        return response;
    }

    /**
     * OB 업무 일괄등록
     * @param realGridCUD
     * @return
     * @throws Exception
     */
    @PostMapping("/customerservice/csAllocationMgmt.saveObCsCounselInfoListExcel.do")
    @ResponseBody
    public RealGridListResponse saveObCsCounselInfoListExcel(@RealGridCUD(type = CsObCounselInfoRequest.class) RealGridCUDRequest<CsObCounselInfoRequest> realGridCUD) throws Exception{
        List<CsObCounselInfoRequest> createList = realGridCUD.getCreate();
        List<CsObCounselInfoResponse> csObCnslInfoResponses = csAllocationMgmtService.saveObCsCounselInfoListExcel(createList);
        RealGridListResponse response = new RealGridListResponse(csObCnslInfoResponses, csObCnslInfoResponses.size());
        return response;
    }

}
