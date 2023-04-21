package com.enbiz.bo.app.controller.system;

import java.util.List;
import java.util.Map;

import org.springframework.context.annotation.Lazy;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.enbiz.bo.app.controller.BaseController;
import com.enbiz.bo.app.dto.ajax.JSONResponseEntity;
import com.enbiz.bo.app.dto.request.realgrid.RealGridCUDRequest;
import com.enbiz.bo.app.dto.request.system.FaqRequest;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.dto.response.system.FaqResponse;
import com.enbiz.bo.app.entity.PrFaqInfo;
import com.enbiz.bo.app.entity.StStdCd;
import com.enbiz.bo.app.service.code.CodeService;
import com.enbiz.bo.app.service.system.FaqMgmtService;
import com.enbiz.bo.base.annotation.RealGridCUD;
import com.enbiz.common.base.exception.MessageResolver;

import groovy.util.logging.Slf4j;
import lombok.RequiredArgsConstructor;

@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class FaqMgmtController extends BaseController {

    private final FaqMgmtService faqMgmtService;
    private final CodeService codeService;

    /**
     * FAQ관리 화면 호출
     * @param model
     * @return
     * @throws Exception
     */
    @GetMapping("/system/faqMgmt.faqMgmtView.do")
    public String faqMgmtView(Model model) throws Exception{
        // CM014 : FAQ대분류코드 / faqLgrpCd
        // CM015 : FAQ중분류코드 / faqMgrpCd
        Map<String, List<StStdCd>> codeList = codeService.getStStdCd("CM014,CM015");
        model.addAttribute("codeList", codeList);
        return "views/system/faqMgmtView";
    }

    /**
     * FAQ관리 목록 조회
     * @param faqRequest
     * @return realGridListResponse
     * @throws Exception
     */
    @GetMapping(value = "/system/faqMgmt.getFaqList.do", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public RealGridListResponse getFaqList(FaqRequest faqRequest) throws Exception {
        int totalCount = faqMgmtService.getFaqListCount(faqRequest);
        List<FaqResponse> faqList = faqMgmtService.getFaqList(faqRequest);
        RealGridListResponse response = new RealGridListResponse(faqList, totalCount);
        return response;
    }

    /**
     * FAQ관리 목록 수정
     * @param realGridCUD 수정목록
     * @return 성공 메시지
     * @throws Exception
     */
    @PostMapping("/system/faqMgmt.saveFaqList.do")
    @ResponseBody
    public JSONResponseEntity<Void> saveFaqList(@RealGridCUD(type = PrFaqInfo.class) RealGridCUDRequest<PrFaqInfo> realGridCUD) throws Exception {
        List<PrFaqInfo> updateList = realGridCUD.getUpdate();
        faqMgmtService.saveFaqList(updateList);
        JSONResponseEntity<Void> jsonResponseEntity = new JSONResponseEntity<Void>(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
        return jsonResponseEntity;
    }

    /**
     * FAQ관리 _ 등록/수정 팝업 화면 호출
     * @param model
     * @param faqRequest
     * @return
     * @throws Exception
     */
    @GetMapping(value="/system/faqMgmt.saveFaqView.do")
    public String saveFaqView(Model model, FaqRequest faqRequest) throws Exception {
        Map<String, List<StStdCd>> codeList = codeService.getStStdCd("CM014,CM015");
        model.addAttribute("codeList", codeList);
        if (faqRequest.getArgInsertUpdate().equals("I")) { // 등록
            model.addAttribute("requestData", faqRequest);
        } else { // 수정
            FaqResponse faqResponse = new FaqResponse();
            faqResponse = faqMgmtService.getFaqDetail(faqRequest);
            faqResponse.setArgInsertUpdate("U");
            model.addAttribute("requestData", faqResponse);
        }
        return "views/system/saveFaqView";
    }

    /**
     *  FAQ관리 등록/수정 팝업 _ 저장
     * @param prFaqInfo
     * @return
     * @throws Exception
     */
    @PostMapping(value = "/system/faqMgmt.saveFaq.do")
    @ResponseBody
    public JSONResponseEntity<Void> saveFaq(PrFaqInfo prFaqInfo) throws Exception {
        if(prFaqInfo.getFaqNo() == null || prFaqInfo.getFaqNo().equals("") ){
        	faqMgmtService.registFaqInfo(prFaqInfo);
        } else {
        	faqMgmtService.modifyFaqInfo(prFaqInfo);
        }
        JSONResponseEntity<Void> response = new JSONResponseEntity<Void>();
        response.setSucceeded(true);
        response.setMessage(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
        return response;
    }

    /**
     * FAQ관리의 대분류, 중분류 중복여부 확인
     * @param faqRequest
     * @return
     * @throws Exception
     */
    @PostMapping(value = "/system/faqMgmt.faqOverLapCheck.do", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public JSONResponseEntity<Void> faqOverLapCheck(FaqRequest faqRequest) throws Exception {
        boolean result = faqMgmtService.faqOverLapCheck(faqRequest);
        JSONResponseEntity<Void> response = new JSONResponseEntity<Void>();
        response.setSucceeded(result);
        return response;
    }
	
}
