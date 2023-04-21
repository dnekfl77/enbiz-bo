package com.enbiz.bo.app.controller.popup;

import java.util.List;

import javax.validation.Valid;

import org.springframework.context.annotation.Lazy;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.enbiz.bo.app.controller.BaseController;
import com.enbiz.bo.app.dto.request.system.ReceiveGroupRequest;
import com.enbiz.bo.app.dto.request.system.ReceiveManagerRequest;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.dto.response.system.ReceiveGroupResponse;
import com.enbiz.bo.app.dto.response.system.ReceiveManagerResponse;
import com.enbiz.bo.app.service.system.ReceiveGroupMgmtService;
import com.enbiz.bo.base.annotation.RealGridSearch;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 브랜드 팝업 관리
 */
@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class BoardManagementPopupController extends BaseController {

	private final ReceiveGroupMgmtService receiveGroupMgmtService;

	/**
     * 수신그룹 조회 팝업 호출
     * @return 수신그룹 조회 팝업 화면
     * @throws Exception
     */
    @GetMapping("/popup/boardManagement.recvGrpListPopup.do")
    public String userListPopup(Model model, @Valid ReceiveGroupRequest receiveGroupRequest) throws Exception {
        model.addAttribute("requestData", receiveGroupRequest);
        return "views/popup/recvGrpListPopup";
    }
    
    /**
     * 수신그룹 목록 조회(팝업용)
     *
     * @param   stUserBaseRequest
     * @return  RealGridListResponse
     * @throws  Exception
     */
    @GetMapping(value = "/popup/boardManagement.getRecvGrpList.do", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @RealGridSearch
    public String getRecvGrpList(ReceiveGroupRequest receiveGroupRequest) throws Exception{
    	log.debug("receiveGroupRequest : " + receiveGroupRequest);
    	receiveGroupRequest.setUseYn("Y");	//사용중인것만 조회
        int totalCount = receiveGroupMgmtService.getReceiveGroupListCount(receiveGroupRequest);
        List<ReceiveGroupResponse> recvGrpList = receiveGroupMgmtService.getReceiveGroupList(receiveGroupRequest);

        RealGridListResponse response = new RealGridListResponse(recvGrpList, totalCount);
        return response.toJsonString();
    }    
    
    /**
     * 수신자 목록 조회(팝업용)
     *
     * @param   stUserBaseRequest
     * @return  RealGridListResponse
     * @throws  Exception
     */
    @GetMapping(value = "/popup/boardManagement.getRecvmnList.do", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @RealGridSearch
    public String getRecvmnList(ReceiveManagerRequest receiveManagerRequest) throws Exception{
    	List<ReceiveManagerResponse> recvmnList = receiveGroupMgmtService.getReceiveManagerListNoPage(receiveManagerRequest);
    	RealGridListResponse response = new RealGridListResponse(recvmnList, recvmnList.size());
    	return response.toJsonString();
    }    
    
    
}

