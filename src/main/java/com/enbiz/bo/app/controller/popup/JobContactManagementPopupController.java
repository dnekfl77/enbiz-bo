package com.enbiz.bo.app.controller.popup;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.enbiz.bo.app.controller.BaseController;
import com.enbiz.bo.app.dto.ajax.JSONResponseEntity;
import com.enbiz.bo.app.dto.request.login.LoginRequest;
import com.enbiz.bo.app.dto.request.popup.JobCnctListRequest;
import com.enbiz.bo.app.dto.request.popup.JobCnctRequest;
import com.enbiz.bo.app.dto.response.popup.JobCnctListResponse;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.enums.CM016;
import com.enbiz.bo.app.service.popup.JobContactManagementPopupService;
import com.enbiz.bo.base.annotation.RealGridSearch;
import com.enbiz.common.base.exception.MessageResolver;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 업무연락 관리 팝업
 */
@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class JobContactManagementPopupController extends BaseController {

    private final JobContactManagementPopupService jobContactManagementPopupService;
    
    /**
     * 업무연락 관리 팝업 화면
     * @return
     */
    @RequestMapping("/popup/JobContact.JobContactManagementListPopup.do")
    public String JobContactManagementListPopup(Model model) {
        return "views/popup/JobContactManagementListPopup";
    }
    
    /**
     * 조회 조건에 맞는 연무연락(받은문의/보낸문의) 목록 조회
     *
     * @param jobCnctListRequest
     * @return 연무연락 목록
     * @throws
     */
    @GetMapping(value = "/popup/JobContact.getJobContactList.do", produces = "application/json;charset=UTF-8")
    @ResponseBody
    @RealGridSearch
    public RealGridListResponse getJobContactList(@AuthenticationPrincipal LoginRequest currentAdminUser, JobCnctListRequest jobCnctListRequest) {
    	jobCnctListRequest.setLoginId(currentAdminUser.getLoginId());
        List<JobCnctListResponse> jobCnctList = jobContactManagementPopupService.getJobCnctInfoList(jobCnctListRequest);
        int totalCount = jobContactManagementPopupService.getJobCnctInfoListCount(jobCnctListRequest);
        return new RealGridListResponse(jobCnctList, totalCount);
    }    
    
    /**
     * 업무연락 작성 팝업 화면
     * @return
     */
    @RequestMapping("/popup/JobContact.jobContactRegPopup.do")
    public String JobContactRegPopup(@AuthenticationPrincipal LoginRequest loginRequest, Model model) {
    	model.addAttribute("loginId", loginRequest.getLoginId());
    	return "views/popup/JobContactRegPopup";
    }
    
    /**
     * 업무연락 저장
     *
     * @param
     * @return 성공 메시지
     * @throws Exception
     */
    @PostMapping("/popup/JobContact.saveJobContact.do")
    @ResponseBody
    public JSONResponseEntity saveSiteBase(@AuthenticationPrincipal LoginRequest currentAdminUser, JobCnctRequest jobCnctRequest) throws Exception {
    	jobCnctRequest.setUserId(currentAdminUser.getLoginId());
    	jobCnctRequest.setSysRegId(currentAdminUser.getLoginId());
    	jobCnctRequest.setSysModId(currentAdminUser.getLoginId());
    	
    	jobContactManagementPopupService.insertJobCnctInfo(jobCnctRequest);
            
        return new JSONResponseEntity(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
    }  
    
    /**
     * 업무연락 상세 팝업 화면
     * @return
     */
    @RequestMapping("/popup/JobContact.jobContactDetailInfoPopup.do")
    public String jobContactDetailInfoPopup(@AuthenticationPrincipal LoginRequest currentAdminUser, JobCnctRequest jobCnctRequest, Model model) {
    	//받은 문의함을 통해 접근했다면 로그인한 사용자가 수신자이다.
    	if ("01".equals(jobCnctRequest.getJobCnctTypeCd())) {	
    		jobCnctRequest.setRecvmnId(currentAdminUser.getLoginId());
    	}
    	
    	//상세 팝업 진입 시 업무연락 진행상태 및 조회일시를 변경한다.
    	jobContactManagementPopupService.updateJobCnctRecvmnInfo(jobCnctRequest);
    	
    	model.addAttribute("jobCnctTypeCd", jobCnctRequest.getJobCnctTypeCd());
    	model.addAttribute("quesInfo", jobContactManagementPopupService.getJobCnctQuesInfo(jobCnctRequest));	//문의
    	model.addAttribute("ansInfo", jobContactManagementPopupService.getJobCnctAnsInfo(jobCnctRequest));		//답변
    	
        return "views/popup/jobContactDetailInfoPopup";
    }
    
    /**
     * 받은 문의에 대한 답변 발송
     *
     * @param
     * @return 성공 메시지
     * @throws Exception
     */
    @PostMapping("/popup/JobContact.saveJobContactAnswer.do")
    @ResponseBody
    public JSONResponseEntity saveJobContactAnswer(@AuthenticationPrincipal LoginRequest currentAdminUser, JobCnctRequest jobCnctRequest) throws Exception {
    	jobCnctRequest.setRecvmnId(currentAdminUser.getLoginId());
    	jobCnctRequest.setSysModId(currentAdminUser.getLoginId());
    	jobContactManagementPopupService.saveJobCnctAnswer(jobCnctRequest);
            
        return new JSONResponseEntity(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
    }  
    
    /**
     * 로그인 한 사용자가 받은 업무연락 수 조회
     *
     * @return 연무연락 수
     * @throws
     */
    @PostMapping(value = "/popup/JobContact.getJobContactReceiveListCount.do", produces = "application/json;charset=UTF-8")
    @ResponseBody
    public JSONResponseEntity getJobContactReceiveListCount(@AuthenticationPrincipal LoginRequest currentAdminUser) {
    	JSONResponseEntity response = new JSONResponseEntity();
    	int jobCnctInfoListCount = 0;
    	
		JobCnctListRequest jobCnctListRequest = new JobCnctListRequest();
		jobCnctListRequest.setLoginId(currentAdminUser.getLoginId());
		jobCnctListRequest.setJobCnctTypeCd("01");
		jobCnctListRequest.setCnctPrgsStatCd(CM016.RECEIVE.getCd());
		//TODO API 변환필요.
		//jobCnctInfoListCount = jobContactManagementPopupService.getJobCnctInfoListCount(jobCnctListRequest);
    	response.setSucceeded(true);
    	response.setData(jobCnctInfoListCount);
        return response;
    }    
    
}

