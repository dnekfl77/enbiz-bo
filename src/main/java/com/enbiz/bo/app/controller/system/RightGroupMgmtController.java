package com.enbiz.bo.app.controller.system;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.enbiz.bo.app.controller.BaseController;
import com.enbiz.bo.app.dto.ajax.JSONResponseEntity;
import com.enbiz.bo.app.dto.request.realgrid.RealGridCUDRequest;
import com.enbiz.bo.app.dto.request.system.RightGroupBaseRequest;
import com.enbiz.bo.app.dto.request.system.RightTargetBaseMenuRequest;
import com.enbiz.bo.app.dto.request.system.UserRightGroupRequest;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.dto.response.system.RightGroupBaseResponse;
import com.enbiz.bo.app.dto.response.system.RightTargetBaseMenuResponse;
import com.enbiz.bo.app.dto.response.system.UserMenuRtInfoResponse;
import com.enbiz.bo.app.dto.response.system.UserRightGroupResponse;
import com.enbiz.bo.app.entity.StRtInfo;
import com.enbiz.bo.app.entity.StStdCd;
import com.enbiz.bo.app.service.code.CodeService;
import com.enbiz.bo.app.service.system.RightGroupMgmtService;
import com.enbiz.bo.app.service.system.UserMgmtService;
import com.enbiz.bo.base.annotation.RealGridCUD;
import com.enbiz.common.base.exception.MessageResolver;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 시스템 관리 / 권한그룹관리
 */
@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class RightGroupMgmtController extends BaseController {

	private final UserMgmtService userMgmtService;
	private final RightGroupMgmtService rightGroupMgmtService;
	private final CodeService codeService;

	/**
	 * 사용자 메뉴(권한정보) 조회
	 *
	 * @param
	 * @return 사용자 메뉴(권한정보) 리스트
	 * @throws
	 */
	@GetMapping(value = "/system/rightGroupMgmt.getUserMenuRightInfoList.do", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public RealGridListResponse getUserMenuRightInfoList(String userId) throws Exception{
		List<UserMenuRtInfoResponse> stRtInfoList = userMgmtService.getUserMenuRtInfoList(userId);
		return new RealGridListResponse(stRtInfoList, stRtInfoList.size());
	}

//	/**
//	 * 사용자 메뉴목록 저장
//	 *
//	 * @param realGridCUD 신규, 수정, 삭제목록
//	 * @return 성공 메시지
//	 * @throws Exception
//	 */
//	@PostMapping("/system/rightGroupMgmt.saveMenuList.do")
//	@ResponseBody
//	public JSONResponseEntity<Void> saveMenuList(
//			@RealGridCUD(type = StRtInfo.class) RealGridCUDRequest<StRtInfo> realGridCUD) throws Exception {
//		List<StRtInfo> createList = realGridCUD.getCreate(), updateList = realGridCUD.getUpdate(),
//				deleteList = realGridCUD.getDelete();
//		userMgmtService.saveUserMenuRt(createList, updateList, deleteList);
//		JSONResponseEntity<Void> jsonResponseEntity = new JSONResponseEntity<Void>(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
//		return jsonResponseEntity;
//	}

	/**
	 * 권한 그룹 관리
	 * @param
	 * @return 권한그룹관리 화면
	 * @throws Exception 
	 * @throws
	 */
	@GetMapping("/system/rightGroupMgmt.rightGroupMgmtView.do")
	public String rightGroupMgmtView(Model model) throws Exception {
		Map<String, List<StStdCd>> codeList = codeService.getStStdCd("UR005,UR010");
		model.addAttribute("codeList", codeList);
		return "views/system/rightGroupMgmtView";
	}

	/**
	 * 권한 그룹 목록 조회
	 */
	@GetMapping(value = "/system/rightGroupMgmt.getRightGroupBaseList.do", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public RealGridListResponse getRightGroupBaseList(RightGroupBaseRequest RightGroupBaseRequest) throws Exception {
		List<RightGroupBaseResponse> stRtGrpBaseList = rightGroupMgmtService.getRightGroupBaseList(RightGroupBaseRequest);
		RealGridListResponse response = new RealGridListResponse(stRtGrpBaseList, stRtGrpBaseList.size());
		return response;
	}

	/**
	 * 권한 그룹 목록 저장
	 */
	@PostMapping(value = "/system/rightGroupMgmt.saveRightGroupBaseList.do")
	@ResponseBody
	public JSONResponseEntity<Void> saveRightGroupBaseList(@RealGridCUD(type = RightGroupBaseRequest.class) RealGridCUDRequest<RightGroupBaseRequest> realGridCUD) throws Exception {
		rightGroupMgmtService.saveRightGroupBaseList(realGridCUD);
		JSONResponseEntity<Void> jsonResponseEntity = new JSONResponseEntity<Void>(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
		return jsonResponseEntity;
	}

	/**
	 * 권한 그룹 메뉴목록 조회
	 */
	@GetMapping(value = "/system/rightGroupMgmt.getRightGroupMenuGridList.do", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public RealGridListResponse getRightGroupMenuGridList(RightTargetBaseMenuRequest stRtTgtMenuRequest) throws Exception {
		int totalCount = rightGroupMgmtService.getRightTargetBaseMenuListCount(stRtTgtMenuRequest);
		List<RightTargetBaseMenuResponse> stRtTgtMenuList = rightGroupMgmtService.getRightTargetBaseMenuList(stRtTgtMenuRequest);
		RealGridListResponse response = new RealGridListResponse(stRtTgtMenuList, totalCount);
		return response;
	}

	/**
	 * 권한 그룹 메뉴목록 저장
	 */
	@PostMapping(value = "/system/rightGroupMgmt.saveRightGroupMenuGridList.do")
	@ResponseBody
	public JSONResponseEntity<Void> saveRightGroupMenuGridList(@RealGridCUD(type = RightTargetBaseMenuRequest.class) RealGridCUDRequest<RightTargetBaseMenuRequest> realGridCUD) throws Exception {
		List<RightTargetBaseMenuRequest> updateList = realGridCUD.getUpdate();
		rightGroupMgmtService.saveRightTargetBaseMenu(updateList);
		JSONResponseEntity<Void> jsonResponseEntity = new JSONResponseEntity<Void>(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
		return jsonResponseEntity;
	}

	/**
	 * 권한 그룹 버튼 조회
	 */
	@GetMapping(value = "/system/rightGroupMgmt.getRightGroupButtonGridList.do", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public RealGridListResponse getRightGroupButtonGridList(RightTargetBaseMenuRequest stRtTgtMenuRequest) throws Exception {
		List<RightTargetBaseMenuResponse> stRtTgtMenuList = rightGroupMgmtService.getRightGroupButtonList(stRtTgtMenuRequest);
		RealGridListResponse response = new RealGridListResponse(stRtTgtMenuList, stRtTgtMenuList.size());
		return response;
	}

	/**
	 * 사용자 권한그룹 공통 팝업
	 * @param UserRightGroupRequest
	 * @return 사용자 권한그룹 공통 팝업
	 * @throws Exception
	 */
	@GetMapping("/system/rightGroupMgmt.userRightGroupPopup.do")
	public String userRightGroupPopup(HttpServletRequest request, Model model, UserRightGroupRequest UserRightGroupRequest) throws Exception {
		Map<String, List<StStdCd>> codeList = codeService.getStStdCd("UR005");
		model.addAttribute("codeList", codeList);
		List<UserRightGroupResponse> userRtGrpList = userMgmtService.getUserRightGroupInfo(UserRightGroupRequest);
		model.addAttribute("userRtGrpList", userRtGrpList);
		model.addAttribute("requestData", UserRightGroupRequest);
		return "views/popup/userRtGrpListPopup";
	}


	/**
	 * 권한 그룹 버튼 조회
	 *
	 * @param UserRightGroupRequest
	 * @return realGridListResponse
	 * @throws Exception
	 */
	@GetMapping(value = "/system/rightGroupMgmt.getUserRightGroupButtonGridList.do", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public RealGridListResponse getUserRightGroupButtonGridList(UserRightGroupRequest UserRightGroupRequest) throws Exception {
		int totalCount = userMgmtService.getUserRightGroupListCount(UserRightGroupRequest);
		List<UserRightGroupResponse> userRtGrpList = userMgmtService.getUserRightGroupInfo(UserRightGroupRequest);
		RealGridListResponse response = new RealGridListResponse(userRtGrpList, totalCount);
		return response;
	}
}
