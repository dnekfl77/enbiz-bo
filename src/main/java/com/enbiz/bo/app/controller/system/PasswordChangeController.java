package com.enbiz.bo.app.controller.system;

import org.springframework.context.annotation.Lazy;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.enbiz.bo.app.controller.BaseController;
import com.enbiz.bo.app.dto.ajax.JSONResponseEntity;
import com.enbiz.bo.app.dto.login.CurrentUser;
import com.enbiz.bo.app.dto.request.system.PasswordChangeRequest;
import com.enbiz.bo.app.service.system.PasswordChangeService;
import com.enbiz.common.base.exception.MessageResolver;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 시스템 관리 / 개인관리 / 비밀번호변경
 */
@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class PasswordChangeController extends BaseController {

	private final PasswordChangeService passwordChangeService;

	/**
	 * 비밀번호 변경 페이지 화면
	 * @param model 모델
	 * @param userContext 유저정보
	 * @return 비밀번호 변경 화면
	 *
	 * */
	@GetMapping("/system/passwordChange.passwordChangeView.do")
	public String passwordChangeView(Model model, @AuthenticationPrincipal CurrentUser currentUser) {
		model.addAttribute("loginId", currentUser.getLoginId());
		return "views/system/passwordChangeView";
	}

	/**
	 * 비밀번호 변경
	 * @param request request
	 * @param userContext 유저정보
	 * @return 성공 메세지
	 *
	 * */
	@PostMapping("/system/passwordChange.updatePassword.do")
	@ResponseBody
	public JSONResponseEntity<Void> updatePassword(@AuthenticationPrincipal CurrentUser currentUser, PasswordChangeRequest request) throws Exception {
		String loginId = currentUser.getLoginId();
		request.setUserId(loginId);
		passwordChangeService.changePassword(request);
		return new JSONResponseEntity<Void>(MessageResolver.getMessage("passwordChange.message.passwd.update.success"));
	}

	/**
	 * 비밀번호 변경 _ 기존비밀번호 일치 확인
	 * @param userContext
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@PostMapping(value = "/system/passwordChange.currentPasswordCheck.do", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public JSONResponseEntity<Void> currentPasswordCheck(@AuthenticationPrincipal CurrentUser currentUser, PasswordChangeRequest request) throws Exception {
		String loginId = currentUser.getLoginId();
		request.setUserId(loginId);
		boolean result = passwordChangeService.checkCurrentPassword(request);
		JSONResponseEntity<Void> response = new JSONResponseEntity<Void>();
		response.setSucceeded(result);
		return response;
	}

}
