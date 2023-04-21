package com.enbiz.bo.app.controller.system;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections4.CollectionUtils;
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
import com.enbiz.bo.app.dto.request.system.CustomerNoticeRequest;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.dto.response.system.CustomerNoticeResponse;
import com.enbiz.bo.app.entity.PrNtcAtchFileInfo;
import com.enbiz.bo.app.entity.StStdCd;
import com.enbiz.bo.app.enums.common.AttacheFileKind;
import com.enbiz.bo.app.service.code.CodeService;
import com.enbiz.bo.app.service.common.AdminCommonService;
import com.enbiz.bo.app.service.system.CustomerNoticeMgmtService;
import com.enbiz.common.base.exception.MessageResolver;
import com.fasterxml.jackson.databind.ObjectMapper;

import groovy.util.logging.Slf4j;
import lombok.RequiredArgsConstructor;

@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class CustomerNoticeMgmtController extends BaseController {
	
	private final Environment env;
	private final CodeService codeService;
	private final CustomerNoticeMgmtService customerNoticeMgmtService;
	private final AdminCommonService adminCommonService;

    /**
     * 고객공지사항관리 화면 호출
     * @param model
     * @return
     * @throws Exception
     */
    @GetMapping("/system/customerNoticeMgmt.customerNoticeMgmtView.do")
    public String customerNoticeMgmtView(Model model) throws Exception{
	    Map<String, List<StStdCd>> codeList = codeService.getStStdCd("DP018");
        model.addAttribute("codeList", codeList);
	    return "views/system/customerNoticeMgmtView";
    }

    /**
     * 고객공지사항 목록 조회
     * @param request
     * @return
     * @throws Exception
     */
    @GetMapping("/system/customerNoticeMgmt.getCustomerNoticeList.do")
    @ResponseBody
    public RealGridListResponse getCustomerNoticeList(CustomerNoticeRequest request) throws Exception {
        int totalCount = customerNoticeMgmtService.getCustomerNoticeListCount(request);
        List<CustomerNoticeResponse> noticeList = customerNoticeMgmtService.getCustomerNoticeList(request);
        RealGridListResponse response = new RealGridListResponse(noticeList, totalCount);
        return response;
    }

    /**
     * 고객공지사항 등록/수정 팝업 호출
     * @param ntcNo
     * @param model
     * @return
     * @throws Exception
     */
    @GetMapping("/system/customerNoticeMgmt.customerNoticeSaveView.do")
    public String customerNoticeSaveView(String ntcNo, Model model) throws Exception {
        Map<String, List<StStdCd>> codeList = codeService.getStStdCd("DP018");
        model.addAttribute("codeList", codeList);
        model.addAttribute("cusNtcInfo", customerNoticeMgmtService.getCustomerNoticeInfo(ntcNo));
        model.addAttribute("ntcAtchFileList", customerNoticeMgmtService.getNoticeAttachedFileList(ntcNo));
        model.addAttribute("allowExtension", env.getProperty("upload.system.extension"));
        return "views/system/customerNoticeSaveView";
    }

    /**
     * 고객공지사항 등록/수정
     * @param files
     * @param param
     * @return
     * @throws Exception
     */
    @PostMapping("/system/customerNoticeMgmt.saveCustomerNotice.do")
    @ResponseBody
    public JSONResponseEntity<Void> saveCustomerNotice(@RequestParam(required = false) List<MultipartFile> files, @RequestParam Map<String, String> param) throws Exception {

        ObjectMapper objectMapper = new ObjectMapper();
        CustomerNoticeRequest request = objectMapper.readValue(param.get("formData"), CustomerNoticeRequest.class);

        List<PrNtcAtchFileInfo> uploadFileList = new ArrayList<>();
        if(!CollectionUtils.isEmpty(files)){
            List<Map<String, String>> uploadResultList = adminCommonService.uploadMultipartFileList(files, AttacheFileKind.SYSTEM, false);
            for (Map<String, String> uploadResult : uploadResultList) {
                PrNtcAtchFileInfo file = new PrNtcAtchFileInfo();
                file.setAtchFileNm(uploadResult.get("I_FILE_TITLE"));
                file.setAtchFileRouteNm(uploadResult.get("I_FILE_URL"));
                uploadFileList.add(file);
            }
        }
        request.setUploadFileList(uploadFileList);

        if(StringUtils.isEmpty(request.getNtcNo())){
        	customerNoticeMgmtService.registCustomerNoticeInfo(request);
        }else{
        	customerNoticeMgmtService.modifyCustomerNoticeInfo(request);
        }

        return new JSONResponseEntity<Void>(MessageResolver.getMessage("adminCommon.message.saved.successfully"));

    }
}
