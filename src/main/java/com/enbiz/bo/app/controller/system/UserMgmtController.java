package com.enbiz.bo.app.controller.system;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.enbiz.bo.app.controller.BaseController;
import com.enbiz.bo.app.dto.ajax.JSONResponseEntity;
import com.enbiz.bo.app.dto.code.CodeReqDto;
import com.enbiz.bo.app.dto.request.system.UserDetailRequest;
import com.enbiz.bo.app.dto.request.system.UserListRequest;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.dto.response.system.UserDetailResponse;
import com.enbiz.bo.app.dto.response.system.UserListResponse;
import com.enbiz.bo.app.enums.common.MIXEDCODE;
import com.enbiz.bo.app.service.code.CodeService;
import com.enbiz.bo.app.service.system.UserMgmtService;
import com.enbiz.common.base.exception.MessageResolver;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 시스템 관리 / 사용자관리
 */
@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class UserMgmtController extends BaseController {

	private final UserMgmtService userMgmtService;
	private final CodeService codeService;

	/**
	 * 사용자관리 메뉴
	 *
	 * @param
	 * @return 사용자관리메뉴 화면
	 * @throws
	 */
	@GetMapping("/system/userMgmt.userMgmtView.do")
	public String userMgmtView(Model model) throws Exception {
		//업무그룹코드
		CodeReqDto reqCode = new CodeReqDto();
		reqCode.setCode("UR002");
		reqCode.setReferCode("10");
		reqCode.setType(MIXEDCODE.REFER_CODE.getCd());	//table

		model.addAttribute("codeList", codeService.getForwardCdCdNmFromStStdCdByGrpCdRef1Val(reqCode));

		return "views/system/userMgmtView";
	}

	/**
	 * 조회 조건에 맞는 사용자요약정보 목록 조회
	 *
	 * @param userListRequest
	 * @return 사용자요약정보 목록
	 * @throws
	 */
	@GetMapping(value = "/system/userMgmt.getUserList.do", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public RealGridListResponse getUserList(UserListRequest userListRequest) throws Exception{
		int totalCount = userMgmtService.getUserListInUserMenuCount(userListRequest);
		List<UserListResponse> searchedUsers = userMgmtService.getUserListInUserMenu(userListRequest);
		return new RealGridListResponse(searchedUsers, totalCount);
	}

	/**
	 * 사용자 정보 조회
	 *
	 * @param
	 * @return 사용자 목록
	 * @throws
	 */
	@GetMapping(value = "/system/userMgmt.getUserDetail.do", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public JSONResponseEntity<UserDetailResponse> getUserDetail(String userId) throws Exception{
		JSONResponseEntity<UserDetailResponse> response = new JSONResponseEntity<UserDetailResponse>();
		response.setSucceeded(true);
		response.setData(userMgmtService.getUserDetail(userId));
		return response;
	}

	/**
	 * 사용자 카운트 조회
	 *
	 * @param
	 * @return 사용자 카운트
	 * @throws
	 */
	@GetMapping(value = "/system/userMgmt.getUserCount.do", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public JSONResponseEntity<Integer> getUserCount(String userId) throws Exception{
		int count = 0;
		JSONResponseEntity<Integer> response = new JSONResponseEntity<Integer>();
		count = userMgmtService.getUserCount(userId);
		response.setSucceeded(true);
		response.setData(count);
		return response;
	}

	/**
	 * 회원 상세 뷰
	 */
	@GetMapping("/system/userMgmt.saveUserView.do")
	public String saveUserView(Model model, String userId)throws Exception {
		model.addAttribute("userId", userId);//사용자 아이디

		List<CodeReqDto> requestDtoList = new ArrayList<CodeReqDto>();

		//조직역할코드, 근무상태코드, 개인정보구분코드, 휴대폰국번정보코드, 도메인정보코드
		CodeReqDto reqCode = new CodeReqDto();
		reqCode.setCode("UR003,UR004,UR008,CM013,CM012");
		reqCode.setReferCode("");
		reqCode.setType(MIXEDCODE.NORMAL_MULTI_CODE.getCd());	//normal
		requestDtoList.add(reqCode);

		//업무그룹코드
		CodeReqDto reqMultCode = new CodeReqDto();
		reqMultCode.setCode("UR002");
		reqMultCode.setReferCode("10");
		reqMultCode.setType(MIXEDCODE.REFER_CODE.getCd());	//table
		requestDtoList.add(reqMultCode);

		//log.debug("[reqMultCode.getCode]\n{}", adminCommonService.getMixedCode(requestDtoList).get("UR002"));

		model.addAttribute("codeList", codeService.getForwardCdCdNmByMixedCode(requestDtoList));

		return "views/system/saveUserView";
	}



	/**
	 * 비밀번호 잠김 해제
	 *
	 * @param
	 * @return 업데이트된 사용자 정보
	 * @throws
	 */
	@PostMapping(value = "/system/userMgmt.unlockPassword.do", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public JSONResponseEntity<UserDetailResponse> unlockPassword(String userId) throws Exception {
		JSONResponseEntity<UserDetailResponse> response = new JSONResponseEntity<UserDetailResponse>();
		response.setMessage(MessageResolver.getMessage("userMgmt.alert.password.unlock"));
		response.setSucceeded(true);
		response.setData(userMgmtService.unlockPassword(userId));
		return response;
	}

	/**
	 * 비밀번호 초기화
	 *
	 * @param
	 * @return 업데이트된 사용자 정보
	 * @throws
	 */
	@PostMapping(value = "/system/userMgmt.initializePassword.do")
	@ResponseBody
	public JSONResponseEntity<UserDetailResponse> initializePassword(String userId) throws Exception {
		log.debug("[userId] : {}",userId);
		UserDetailResponse userDetail = userMgmtService.initializePassword(userId);
		JSONResponseEntity<UserDetailResponse> response = new JSONResponseEntity<UserDetailResponse>();
		response.setMessage(MessageResolver.getMessage("userMgmt.alert.password.init.ok"));
		response.setSucceeded(true);
		response.setData(userDetail);
		return response;
	}
	
	/**
	 * 사용자 저장
	 * */
	@PostMapping("/system/userMgmt.saveUser.do")
	@ResponseBody
	public JSONResponseEntity<UserDetailResponse> saveUser(@RequestBody @Valid UserDetailRequest request) throws Exception {
		log.debug("[request]{}", request);
		JSONResponseEntity<UserDetailResponse> response = new JSONResponseEntity<UserDetailResponse>();
		response.setMessage(MessageResolver.getMessage("userMgmt.alert.save.success"));
		response.setData(userMgmtService.saveUser(request));
		return response;
	}

}
