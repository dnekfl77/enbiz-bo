package com.enbiz.bo.app.controller.display;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.commons.beanutils.BeanUtils;
import org.springframework.context.annotation.Lazy;
import org.springframework.core.env.Environment;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.enbiz.bo.app.controller.BaseController;
import com.enbiz.bo.app.dto.ajax.JSONResponseEntity;
import com.enbiz.bo.app.dto.request.display.PrConrBaseRequest;
import com.enbiz.bo.app.dto.request.display.PrConrTgtInfoRequest;
import com.enbiz.bo.app.dto.request.display.PrTmplConrMappInfoRequest;
import com.enbiz.bo.app.dto.request.login.LoginRequest;
import com.enbiz.bo.app.dto.request.realgrid.RealGridCUDRequest;
import com.enbiz.bo.app.dto.response.display.PrConrBaseResponse;
import com.enbiz.bo.app.dto.response.display.PrConrTgtInfoResponse;
import com.enbiz.bo.app.dto.response.display.PrTmplBaseResponse;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.entity.PrConrBase;
import com.enbiz.bo.app.entity.PrConrTgtInfo;
import com.enbiz.bo.app.enums.common.AttacheFileKind;
import com.enbiz.bo.app.service.code.CodeService;
import com.enbiz.bo.app.service.common.AdminCommonService;
import com.enbiz.bo.app.service.display.DisplayCornerMgmtService;
import com.enbiz.bo.base.annotation.RealGridCUD;
import com.enbiz.common.base.exception.MessageResolver;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 전시 코너 관리
 */
@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class DisplayCornerMgmtController extends BaseController {

    private final DisplayCornerMgmtService displayCornerMgmtService;
    private final AdminCommonService adminCommonService;
    private final Environment env;
    private final CodeService codeService;

    /**
     * 전시 코너 관리 로딩 화면
     * @param model
     * @param prConrBaseRequest
     * @return
     * @throws Exception
     */
    @GetMapping(value = "/display/displayCornerMgmt.displayCornerMgmtView.do")
    public String sitePopupList(Model model, PrConrBaseRequest prConrBaseRequest) throws Exception {
        model.addAttribute("codeList", codeService.getStStdCd("DP004,DP005"));
        return "views/display/displayCornerMgmtView";
    }

    /**
     * 전시 코너 관리 목록 조회
     * @param prConrBaseRequest
     * @return realGridListResponse
     * @throws Exception
     */
    @GetMapping(value = "/display/displayCornerMgmt.getDisplayCornerMgmt.do")
    @ResponseBody
    public RealGridListResponse getDisplayCornerMgmt(PrConrBaseRequest prConrBaseRequest) throws Exception {
        int totalCount = displayCornerMgmtService.getDisplayCornerListCount(prConrBaseRequest);
        List<PrConrBaseResponse> displayCornerList = displayCornerMgmtService.getDisplayCornerList(prConrBaseRequest);
        RealGridListResponse response = new RealGridListResponse(displayCornerList, totalCount);
        return response;
    }

    /**
     * 전시 코너 관리 저장
     * @param realGridCUD 신규, 수정, 삭제목록
     * @return 성공 메시지
     * @throws Exception
     */
    @PostMapping(value = "/display/displayCornerMgmt.saveDisplayCornerMgmt.do")
    @ResponseBody
    public JSONResponseEntity saveDisplayCornerMgmt(@RealGridCUD(type = PrConrBase.class) RealGridCUDRequest<PrConrBase> realGridCUD) throws Exception {
        List<PrConrBase> updateList = realGridCUD.getUpdate(), deleteList = realGridCUD.getDelete();
        displayCornerMgmtService.registCUD(updateList, deleteList);
        JSONResponseEntity jsonResponseEntity = new JSONResponseEntity(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
        return jsonResponseEntity;
    }

    /**
     * 전시 코너 등록/수정 로딩 화면
     * @param model
     * @param prConrBaseRequest
     * @return
     * @throws Exception
     */
    @GetMapping(value = "/display/displayCornerMgmt.displayCornerMgmtSaveView.do")
    public String displayCornerMgmtSaveView(Model model, PrConrBaseRequest prConrBaseRequest) throws Exception {
        model.addAttribute("codeList", codeService.getStStdCd("DP005"));
        model.addAttribute("maxUploadSizePerFile", env.getProperty("upload.display.maxUploadSizePerFile")); // 파일 관련 설정
        model.addAttribute("reSearchPage", prConrBaseRequest.getReSearchPage());

        PrConrBaseResponse prConrBaseResponse = null;
        if (prConrBaseRequest.getConrNo() != null && !"".equals(prConrBaseRequest.getConrNo())) { // 수정
            prConrBaseResponse = displayCornerMgmtService.getDisplayCornerDetail(prConrBaseRequest);
            prConrBaseResponse.setReSearchPage(prConrBaseRequest.getReSearchPage());
            List<PrConrTgtInfoResponse> targetList = displayCornerMgmtService.getCornerTargetInfoList(prConrBaseRequest);
            model.addAttribute("requestTargetList", targetList);
            model.addAttribute("requestData", prConrBaseResponse);
        }
        return "views/display/displayCornerPopup";
    }

    /**
     * 전시 코너 관리 _ 템플릿적용목록 조회
     * @param prConrBaseRequest
     * @return realGridListResponse
     * @throws Exception
     */
    @GetMapping(value = "/display/displayCornerMgmt.getTmplConrMappInfo.do")
    @ResponseBody
    public RealGridListResponse getTmplConrMappInfo(PrConrBaseRequest prConrBaseRequest) throws Exception {
        int totalCount = displayCornerMgmtService.getTmplConrMappInfoCount(prConrBaseRequest);
        List<PrTmplBaseResponse> tmplList = displayCornerMgmtService.getTmplConrMappInfo(prConrBaseRequest);
        RealGridListResponse response = new RealGridListResponse(tmplList, totalCount);
        return response;
    }

    /**
     * 전시세트정보에 데이터 여부 확인
     * @param prConrTgtInfo
     * @return
     * @throws Exception
     */
    @PostMapping(value = "/display/displayCornerMgmt.checkPrConrSetInfo.do")
    @ResponseBody
    public JSONResponseEntity checkPrConrSetInfo(PrConrTgtInfo prConrTgtInfo) throws Exception {
        boolean result = displayCornerMgmtService.checkPrConrSetInfo(prConrTgtInfo);
        JSONResponseEntity response = new JSONResponseEntity();
        response.setSucceeded(result);
        return response;
    }

    /**
     * 전시코너정보에 코너 데이터 여부 확인
     * @param prConrBase
     * @return
     * @throws Exception
     */
    @PostMapping(value = "/display/displayCornerMgmt.checkPrDispConrInfo.do")
    @ResponseBody
    public JSONResponseEntity checkPrDispConrInfo(PrConrBase prConrBase) throws Exception {
        boolean result = displayCornerMgmtService.checkPrDispConrInfo(prConrBase);
        JSONResponseEntity response = new JSONResponseEntity();
        response.setSucceeded(result);
        return response;
    }

    /**
     * 템플릿코너매핑정보에 해당 코너와 연결된 템플릿 데이터 여부 확인
     * @param prConrBase
     * @return
     * @throws Exception
     */
    @PostMapping(value = "/display/displayCornerMgmt.checkPrTmplConrMappInfo.do")
    @ResponseBody
    public JSONResponseEntity checkPrTmplConrMappInfo(PrConrBase prConrBase) throws Exception {
        boolean result = displayCornerMgmtService.checkPrTmplConrMappInfo(prConrBase);
        JSONResponseEntity response = new JSONResponseEntity();
        response.setSucceeded(result);
        return response;
    }

    /**
     * 전시 코너 등록/수정 및 템플릿코너매핑정보 신규, 수정, 삭제목록
     * @param file
     * @param param
     * @param loginRequest
     * @return
     * @throws Exception
     */
    @PostMapping(value = "/display/displayCornerMgmt.saveDetailDisplayCornerMgmt.do")
    @ResponseBody
    public JSONResponseEntity saveDetailDisplayCornerMgmt(MultipartFile file, @RequestParam Map<String, String> param, @AuthenticationPrincipal LoginRequest loginRequest) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        PrConrBaseRequest prConrBaseRequest = objectMapper.readValue(param.get("prConrBaseRequest"),PrConrBaseRequest.class);
        prConrBaseRequest.setSysRegId(loginRequest.getLoginId());
        prConrBaseRequest.setSysModId(loginRequest.getLoginId());

        // 파일저장
        if(file != null) {
            Map<String, String> resultImageMap = adminCommonService.uploadMultipartFile(file, AttacheFileKind.DISPLAY, false);
            prConrBaseRequest.setConrImgFileNm(resultImageMap.get("I_FILE_TITLE"));
            prConrBaseRequest.setConrImgPathNm(resultImageMap.get("I_FILE_URL"));
        }

        // 폼데이터 저장
        List<PrConrTgtInfoRequest> conrTgt = new ArrayList();
        String removeConrTgt = prConrBaseRequest.getTargetRemoveList();
        if(!param.get("conrTgtList").equals("")){
            conrTgt = objectMapper.readValue(param.get("conrTgtList"), new TypeReference<List<PrConrTgtInfoRequest>>() {});
        }
        PrConrBase prConrBase = new PrConrBase();
        BeanUtils.copyProperties(prConrBase, prConrBaseRequest);
        if (prConrBaseRequest.getConrNo() == null || prConrBaseRequest.getConrNo().equals("")) { // 등록
            displayCornerMgmtService.prConrBaseInsert(prConrBase, conrTgt);
        } else { // 수정
            displayCornerMgmtService.prConrBaseUpdate(prConrBase, conrTgt, removeConrTgt);
        }

        // 적용채널 저장
        if(!param.get("displayCornerTemplateGrid").equals("[]")){
            List<PrTmplConrMappInfoRequest> gridList = objectMapper.readValue(param.get("displayCornerTemplateGrid"), new TypeReference<List<PrTmplConrMappInfoRequest>>() {});
            for(PrTmplConrMappInfoRequest prTmplConrMappInfoRequest : gridList) {
                prTmplConrMappInfoRequest.setConrNo(prConrBase.getConrNo());
                prTmplConrMappInfoRequest.setSysRegId(loginRequest.getLoginId());
                prTmplConrMappInfoRequest.setSysModId(loginRequest.getLoginId());
            }
            displayCornerMgmtService.prTmplConrMappInfoSave(gridList);
        }

        JSONResponseEntity jsonResponseEntity = new JSONResponseEntity(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
        return jsonResponseEntity;
    }

}