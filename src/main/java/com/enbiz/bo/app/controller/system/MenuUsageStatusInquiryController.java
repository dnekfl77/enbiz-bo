package com.enbiz.bo.app.controller.system;

import java.util.List;
import java.util.Map;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.enbiz.bo.app.controller.BaseController;
import com.enbiz.bo.app.dto.request.system.RtTargetBaseLogRequest;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.dto.response.system.RtTargetBaseLogResponse;
import com.enbiz.bo.app.entity.StStdCd;
import com.enbiz.bo.app.service.code.CodeService;
import com.enbiz.bo.app.service.system.MenuUsageStatusInquiryService;

import lombok.RequiredArgsConstructor;

/**
 * 시스템 관리 -> 모니터링 관리 -> 메뉴별사용현황조회
 */
@Controller
@RequiredArgsConstructor
public class MenuUsageStatusInquiryController extends BaseController {

    private final MenuUsageStatusInquiryService menuUsageStatusInquiryService;
    private final CodeService codeService;

    /**
     * 메뉴별 사용현황 조회 호출
     *
     * @return 메뉴별 사용현황 조회 화면 html
     * @throws Exception
     */
	@GetMapping("/system/menuUsageStatusInquiry.menuUsageStatusInquiryView.do")
    public String menuUsageStatusInquiryView(Model model) throws Exception {
        Map<String, List<StStdCd>> codeList = codeService.getStStdCd("UR005");
        model.addAttribute("codeList", codeList);
    	return "views/system/menuUsageStatusInquiryView";
    }

    /**
     * 메뉴별 사용현황 조회 - 메뉴별 사용현황 Grid 조회<br>
     *
     * @description 시스템관리 > 모니터링관리 > 메뉴별 사용현황 조회
     * @method Name : getMenuUseStatusList
     * @throws Exception
     * @return String
     * @exception Exception
     */
	@GetMapping(value = "/system/menuUsageStatusInquiry.getMenuUseStatusList.do", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public RealGridListResponse getMenuUseStatusList(RtTargetBaseLogRequest RtTargetBaseLogRequest) throws Exception {
        int menuUseStatusListResponseCount = menuUsageStatusInquiryService.getMenuUseStatusListCount(RtTargetBaseLogRequest);
        List<RtTargetBaseLogResponse> menuUseStatusList = menuUsageStatusInquiryService.getMenuUseStatusList(RtTargetBaseLogRequest);
        RealGridListResponse response = new RealGridListResponse(menuUseStatusList, menuUseStatusListResponseCount);
        return response;
    }

    /**
     * 메뉴별 사용현황 조회 - 사용자별 메뉴 사용현황 Grid 조회<br>
     *
     * @description 시스템관리 > 모니터링관리 > 메뉴별 사용현황 조회
     * @method Name : getMenuUseStatusList
     * @throws Exception
     * @return String
     * @exception Exception
     */
	@GetMapping(value = "/system/menuUsageStatusInquiry.getUserMenuUseStatusList.do", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public RealGridListResponse getUserMenuUseStatusList(RtTargetBaseLogRequest RtTargetBaseLogRequest) throws Exception {
 	    int userMenuUseStatusListResponseCount = menuUsageStatusInquiryService.getUserMenuUseStatusListCount(RtTargetBaseLogRequest);
	    List<RtTargetBaseLogResponse> userMenuUseStatusList = menuUsageStatusInquiryService.getUserMenuUseStatusList(RtTargetBaseLogRequest);
	    RealGridListResponse response = new RealGridListResponse(userMenuUseStatusList, userMenuUseStatusListResponseCount);
	    return response;
    }
}