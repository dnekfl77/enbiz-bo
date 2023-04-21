package com.enbiz.bo.app.controller.system;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.apache.commons.lang.StringUtils;
import org.springframework.context.annotation.Lazy;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.enbiz.bo.app.controller.BaseController;
import com.enbiz.bo.app.dto.ajax.JSONResponseEntity;
import com.enbiz.bo.app.dto.request.realgrid.RawRealGridCUDRequest;
import com.enbiz.bo.app.dto.request.realgrid.RealGridCUDRequest;
import com.enbiz.bo.app.dto.request.system.SystemNoticeCudRequest;
import com.enbiz.bo.app.dto.request.system.SystemNoticeListRequest;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.dto.response.system.SystemNoticeTargetInfoResponse;
import com.enbiz.bo.app.entity.StStdCd;
import com.enbiz.bo.app.entity.StUserBase;
import com.enbiz.bo.app.enums.common.AttacheFileKind;
import com.enbiz.bo.app.service.code.CodeService;
import com.enbiz.bo.app.service.common.AdminCommonService;
import com.enbiz.bo.app.service.system.SystemNoticeMgmtService;
import com.enbiz.bo.base.annotation.RawRealGridCUD;
import com.enbiz.common.base.exception.MessageResolver;

import groovy.util.logging.Slf4j;
import lombok.RequiredArgsConstructor;

@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class SystemNoticeMgmtController extends BaseController {

    private final Environment env;
    private final SystemNoticeMgmtService systemNoticeMgmtService;
    private final CodeService codeService;
    private final AdminCommonService adminCommonService;

    /**
     * 시스템 공지사항 관리 리스트 화면
     * @return
     * @throws Exception 
     */
    @GetMapping("/system/systemNoticeMgmt.systemNoticeMgmtView.do")
    public String systemNoticeMgmtView(Model model) throws Exception {
        Map<String, List<StStdCd>> codeList = codeService.getStStdCd("CM004,CM005,UR005");
        model.addAttribute("codeList", codeList);
        return "views/system/systemNoticeMgmtView";
    }

    /**
     * 조회 조건에 맞는 시스템공지리스트 목록 조회
     *
     * @param systemNoticeListRequest
     * @return 시스템공지리스트 목록
     * @throws Exception 
     * @throws
     */
    @GetMapping(value = "/system/systemNoticeMgmt.getSystemNoticeList.do", produces = "application/json;charset=UTF-8")
    @ResponseBody
    public RealGridListResponse getSystemNoticeList(SystemNoticeListRequest systemNoticeListRequest) throws Exception {
        RealGridListResponse searchedSystemNoticeManagements = systemNoticeMgmtService.getSystemNoticeList(systemNoticeListRequest);
        return searchedSystemNoticeManagements;
    }

    /**
     * 시스템 공지사항 관리 등록/수정 팝업 화면
     * @return
     */
    @GetMapping("/system/systemNoticeMgmt.systemNoticeSaveView.do")
    public String systemNoticeSaveView(Model model, String bbcNo) throws Exception {
        Map<String, List<StStdCd>> codeMap = codeService.getStStdCd ("UR005,CM004,CM006");
        model.addAttribute("codeMap", codeMap);
        model.addAttribute("maxUploadSizePerFile", env.getProperty("upload.system.maxUploadSizePerFile"));
        model.addAttribute("allowExtension", env.getProperty("upload.system.extension"));
        if(StringUtils.isNotEmpty(bbcNo)) {
            model.addAttribute("bbInfo", systemNoticeMgmtService.getSystemNoticeInfo(bbcNo));
        }
        return "views/system/systemNoticeSaveView";
    }

    /**
     * 시스템 공지 대상 정보 조회
     * @param bbcNo
     * @return
     * @throws Exception 
     */
    @GetMapping("/system/systemNoticeMgmt.getSystemNoticeTargetInfoList.do")
    @ResponseBody
    public RealGridListResponse getSystemNoticeTargetInfoList(String bbcNo) throws Exception {
    	List<SystemNoticeTargetInfoResponse> targetList = systemNoticeMgmtService.getSystemNoticeTargetInfoList(bbcNo);
        return new RealGridListResponse(targetList, targetList.size());
    }

    @PostMapping("/system/systemNoticeMgmt.uploadFile.do")
    @ResponseBody
    public JSONResponseEntity<List<Map<String, String>>> upLoadFile(@RequestParam List<MultipartFile> files, @RequestParam Map<String, String> param) throws Exception {
    	List<Map<String, String>> resultList = new ArrayList<>();
        List<Map<String, String>> uploadResultList = adminCommonService.uploadMultipartFileList(files, AttacheFileKind.SYSTEM, true);
        for (Map<String, String> uploadResult : uploadResultList) {
        	Map<String, String> result = new HashMap<>();
        	result.put("atchFileNm", uploadResult.get("I_FILE_TITLE"));
        	result.put("atchFileRouteNm", uploadResult.get("I_FILE_URL"));
        	resultList.add(result);
		}
        return new JSONResponseEntity<List<Map<String, String>>>("", resultList, true);
    }

    /**
     * 시스템 공지 저장, 수정
     * @param bbInfo
     * @param cudList
     * @return
     * @throws Exception
     */
    @PostMapping("/system/systemNoticeMgmt.saveSystemNotice.do")
    @ResponseBody
	public JSONResponseEntity<Void> saveSystemNotice(@Valid SystemNoticeCudRequest bbInfo, @RawRealGridCUD RawRealGridCUDRequest cudList) throws Exception {
		RealGridCUDRequest<StUserBase> sysNtcTgtGridCUD = cudList.getRequest("sysNtcTgtGrid", StUserBase.class);
        // 키값이 없으면 등록 그외 수정.
        if(StringUtils.isEmpty(bbInfo.getBbcNo())) {
            systemNoticeMgmtService.registSystemNoticeInfo(bbInfo, sysNtcTgtGridCUD);
        } else {
            systemNoticeMgmtService.modifySystemNoticeInfo(bbInfo, sysNtcTgtGridCUD);
        }
        return new JSONResponseEntity<Void>(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
    }
}
