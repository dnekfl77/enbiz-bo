package com.enbiz.bo.app.controller.system;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.enbiz.bo.app.controller.BaseController;
import com.enbiz.bo.app.dto.ajax.JSONResponseEntity;
import com.enbiz.bo.app.dto.request.realgrid.RealGridCUDRequest;
import com.enbiz.bo.app.dto.request.system.ReceiveGroupRequest;
import com.enbiz.bo.app.dto.request.system.ReceiveManagerRequest;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.dto.response.system.ReceiveGroupResponse;
import com.enbiz.bo.app.dto.response.system.ReceiveManagerResponse;
import com.enbiz.bo.app.entity.StRecvGrpInfo;
import com.enbiz.bo.app.entity.StRecvmnInfo;
import com.enbiz.bo.app.service.system.ReceiveGroupMgmtService;
import com.enbiz.bo.base.annotation.RealGridCUD;
import com.enbiz.common.base.exception.MessageResolver;

import groovy.util.logging.Slf4j;
import lombok.RequiredArgsConstructor;

@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class ReceiveGroupMgmtController extends BaseController {

    private final ReceiveGroupMgmtService receiveGroupMgmtService;

    /**
     * 수신그룹관리 화면
     * @return
     */
    @GetMapping("/system/receiveGroupMgmt.receiveGroupMgmtView.do")
    public String receiveGroupMgmtView(Model model) {
        return "views/system/receiveGroupMgmtView";
    }

    /**
     * 조회 조건에 맞는 수신그룹 목록 조회
     *
     * @param receiveGroupRequest
     * @return 수신그룹 목록
     * @throws
     */
    @GetMapping(value = "/system/receiveGroupMgmt.getReceiveGroupList.do", produces = "application/json;charset=UTF-8")
    @ResponseBody
    public RealGridListResponse getReceiveGroupList(ReceiveGroupRequest receiveGroupRequest) {
        List<ReceiveGroupResponse> recvGrpList = receiveGroupMgmtService.getReceiveGroupList(receiveGroupRequest);
        int totalCount = receiveGroupMgmtService.getReceiveGroupListCount(receiveGroupRequest);
        return new RealGridListResponse(recvGrpList, totalCount);
    }

	/**
	 * 수신그룹 저장
	 *
	 * @param realGridRequest 신규, 수정, 삭제목록
	 * @return 성공 메시지
	 * @throws Exception
	 */
	@PostMapping("/system/receiveGroupMgmt.saveReceiveGroup.do")
	@ResponseBody
	public JSONResponseEntity<Void> saveReceiveGroup(
			@RealGridCUD(type = StRecvGrpInfo.class) RealGridCUDRequest<StRecvGrpInfo> realGridCUD) throws Exception {
		List<StRecvGrpInfo> createList = realGridCUD.getCreate(), updateList = realGridCUD.getUpdate(),
				deleteList = realGridCUD.getDelete();
		receiveGroupMgmtService.saveReceiveGroup(createList, updateList, deleteList);
		JSONResponseEntity<Void> jsonResponseEntity = new JSONResponseEntity<Void>(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
		return jsonResponseEntity;
	}

	/**
	 * 조회 조건에 맞는 수신자 목록 조회
	 *
	 * @param receiveManagerRequest
	 * @return 수신그룹 목록
	 * @throws
	 */
	@GetMapping(value = "/system/receiveGroupMgmt.getReceiveManagerList.do", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public RealGridListResponse getReceiveManagerList(ReceiveManagerRequest receiveManagerRequest) {
		List<ReceiveManagerResponse> recvmnList = receiveGroupMgmtService.getReceiveManagerList(receiveManagerRequest);
		int totalCount = receiveGroupMgmtService.getReceiveManagerListCount(receiveManagerRequest);
		return new RealGridListResponse(recvmnList, totalCount);
	}

	/**
	 * 수신자 저장
	 *
	 * @param realGridRequest 신규, 삭제목록(변경은 하지 않음)
	 * @return 성공 메시지
	 * @throws Exception
	 */
	@PostMapping("/system/receiveGroupMgmt.saveReceiveManager.do")
	@ResponseBody
	public JSONResponseEntity<Void> saveReceiveManager(
			@RealGridCUD(type = StRecvmnInfo.class) RealGridCUDRequest<StRecvmnInfo> realGridCUD) throws Exception {
		List<StRecvmnInfo> createList = realGridCUD.getCreate(), deleteList = realGridCUD.getDelete();
		receiveGroupMgmtService.saveReceiveManager(createList, deleteList);
		JSONResponseEntity<Void> jsonResponseEntity = new JSONResponseEntity<Void>(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
		return jsonResponseEntity;
	}

}
