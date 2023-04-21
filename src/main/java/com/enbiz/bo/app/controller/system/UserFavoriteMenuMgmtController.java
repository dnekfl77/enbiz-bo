package com.enbiz.bo.app.controller.system;

import java.util.List;
import java.util.Map;

import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.enbiz.bo.app.controller.BaseController;
import com.enbiz.bo.app.dto.ajax.JSONResponseEntity;
import com.enbiz.bo.app.dto.request.login.LoginRequest;
import com.enbiz.bo.app.dto.request.realgrid.RealGridCUDRequest;
import com.enbiz.bo.app.dto.request.system.UserFavoriteMenuRequest;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.dto.response.system.UserFavoriteMenuResponse;
import com.enbiz.bo.app.entity.StStdCd;
import com.enbiz.bo.app.entity.StUserFvtInfo;
import com.enbiz.bo.app.service.code.CodeService;
import com.enbiz.bo.app.service.system.UserFavoriteMenuMgmtService;
import com.enbiz.bo.base.annotation.RealGridCUD;
import com.enbiz.common.base.exception.MessageResolver;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 시스템 관리 / 개인관리 / 즐겨찾기관리
 */
@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class UserFavoriteMenuMgmtController extends BaseController {

	private final UserFavoriteMenuMgmtService userFavoriteMenuMgmtService;
	private final CodeService codeService;

	/**
	 * 즐겨찾기 그룹 관리
	 * @param model
	 * @return 즐겨찾기 그룹 목록 화면
	 * @throws Exception 
	 * @throws
	 */
	@GetMapping("/system/userFavoriteMenuMgmt.userFavoriteMenuMgmtView.do")
	public String userFavoriteMenuMgmtView(Model model) throws Exception {
		Map<String, List<StStdCd>> codeList = codeService.getStStdCd("UR005,UR010");
		model.addAttribute("codeList", codeList);
		return "views/system/userFavoriteMenuMgmtView";
	}

	/**
	 * 즐겨찾기 그룹 목록 조회
	 * @param userFavoriteMenuRequest
	 * @return 즐겨찾기 그룹 목록 리스트
	 * @throws Exception
	 */
	@GetMapping(value = "/system/userFavoriteMenuMgmt.getUserFavoriteMenuList.do", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public RealGridListResponse getUserFavoriteMenuList(UserFavoriteMenuRequest userFavoriteMenuRequest, @AuthenticationPrincipal LoginRequest loginRequest) throws Exception {
		userFavoriteMenuRequest.setUserId(loginRequest.getLoginId());
		int totalCount = userFavoriteMenuMgmtService.getUserFavoriteMenuListCount(userFavoriteMenuRequest);
		List<UserFavoriteMenuResponse> stRtGrpBaseList = userFavoriteMenuMgmtService.getUserFavoriteMenuList(userFavoriteMenuRequest);
		RealGridListResponse response = new RealGridListResponse(stRtGrpBaseList, totalCount);
		return response;
	}

	/**
	 * 즐겨찾기 그룹 목록 수정 삭제
	 * @param realGridCUD
	 * @return 성공 메시지
	 * @throws Exception
	 */
	@PostMapping(value = "/system/userFavoriteMenuMgmt.saveUserFavoriteMenu.do")
	@ResponseBody
	public JSONResponseEntity<Void> saveUserFavoriteMenu(@RealGridCUD(type = StUserFvtInfo.class) RealGridCUDRequest<StUserFvtInfo> realGridCUD ) throws Exception {
		List<StUserFvtInfo> updateList = realGridCUD.getUpdate(), deleteList = realGridCUD.getDelete();
		userFavoriteMenuMgmtService.saveUserFavoriteMenu(updateList,deleteList);
		JSONResponseEntity<Void> jsonResponseEntity = new JSONResponseEntity<Void>(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
		return jsonResponseEntity;
	}
}
