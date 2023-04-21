package com.enbiz.bo.app.controller.system;

import java.util.List;
import java.util.Map;

import org.springframework.context.annotation.Lazy;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.enbiz.bo.app.controller.BaseController;
import com.enbiz.bo.app.dto.request.system.LoginLogRequest;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.dto.response.system.LoginLogResponse;
import com.enbiz.bo.app.entity.StStdCd;
import com.enbiz.bo.app.service.code.CodeService;
import com.enbiz.bo.app.service.system.UserAccessHistoryInquiryService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 시스템 관리 -> 모니터링 관리
 */
@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class UserAccessHistoryInquiryController extends BaseController {

    private final UserAccessHistoryInquiryService userAccessHistoryInquiryService;
    private final CodeService codeService;

    /**
     * 사용자 접속 이력 조회 화면 호출
     * @return 사용자 접속 이력 조회 화면 html
     * @throws Exception
     */
	@GetMapping("/system/userAccessHistoryInquiry.userAccessHistoryInquiryView.do")
    public String managingUserAccessHistory(Model model) throws Exception {
        Map<String, List<StStdCd>> codeList = codeService.getStStdCd("UR005");
        model.addAttribute("codeList", codeList);
    	return "views/system/userAccessHistoryInquiryView";
    }

    /**
     * 사용자접속 이력관리 페이지 - 사용자별 최종로그인정보 Grid 조회<br> 시스템관리 > 모니터링관리 > 관리자 로그관리 페이지
     * @param stlogLoginLogRequest
     * @return
     * @throws Exception
     */
	@GetMapping(value = "/system/userAccessHistoryInquiry.getLastLoginInfoList.do", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public RealGridListResponse getLastLoginInfoList(LoginLogRequest stlogLoginLogRequest) throws Exception {
        int stLoginLogResponseCount = userAccessHistoryInquiryService.getLastLoginInfoListCount(stlogLoginLogRequest);
        List<LoginLogResponse> LoginLogResponse = userAccessHistoryInquiryService.getLastLoginInfoList(stlogLoginLogRequest);
        RealGridListResponse response = new RealGridListResponse(LoginLogResponse, stLoginLogResponseCount);
        return response;
    }

    /**
     * 사용자접속 이력관리 페이지 - 상세로그인이력 Grid 조회<br>   시스템관리 > 모니터링관리 > 사용자 접속이력 조회 페이지
     * @param stlogLoginLogRequest
     * @return
     * @throws Exception
     */
	@GetMapping(value = "/system/userAccessHistoryInquiry.getDetailLoginHistoryList.do", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public RealGridListResponse getDetailLoginHistoryList(LoginLogRequest stlogLoginLogRequest) throws Exception {
 	    int stDetailLoginLogResponseCount = userAccessHistoryInquiryService.getDetailLoginHistoryListCount(stlogLoginLogRequest);
	    List<LoginLogResponse> stDetailLoginLogResponse = userAccessHistoryInquiryService.getDetailLoginHistoryList(stlogLoginLogRequest);
	    RealGridListResponse response = new RealGridListResponse(stDetailLoginLogResponse, stDetailLoginLogResponseCount);
	    return response;
    }
}