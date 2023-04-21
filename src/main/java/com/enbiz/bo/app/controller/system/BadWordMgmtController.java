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
import com.enbiz.bo.app.dto.request.system.BadWordMgmtRequest;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.dto.response.system.BadWordMgmtResponse;
import com.enbiz.bo.app.entity.StBwInfo;
import com.enbiz.bo.app.service.system.BadWordMgmtService;
import com.enbiz.bo.base.annotation.RealGridCUD;
import com.enbiz.common.base.exception.MessageResolver;

import groovy.util.logging.Slf4j;
import lombok.RequiredArgsConstructor;

/**
 * 시스템 관리 > 기본정보관리 > 금칙어관리
 */
@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class BadWordMgmtController extends BaseController {
	
	private final BadWordMgmtService badWordMgmtService;

	/**
	 * 금칙어 관리 화면 호출
	 *
	 * @return 금칙어 관리 화면
	 * @throws Exception
	 */
	@GetMapping("/system/badWordMgmt.badWordMgmtView.do")
	public String badWordMgmtView(Model model) throws Exception {
		return "views/system/badWordMgmtView";
	}

	/**
	 * 금칙어 목록 조회
	 *
	 * @param realGridRequest
	 * @return realGridListResponse
	 * @throws Exception
	 */
	@GetMapping(value = "/system/badWordMgmt.getBadWordList.do", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public RealGridListResponse getBadWordList(BadWordMgmtRequest BadWordMgmtRequest) throws Exception {
		int totalCount = badWordMgmtService.getBadWordListCount(BadWordMgmtRequest);
		List<BadWordMgmtResponse> BadWordMgmtResponseList = badWordMgmtService.getBadWordList(BadWordMgmtRequest);
		RealGridListResponse response = new RealGridListResponse(BadWordMgmtResponseList, totalCount);
		return response;
	}

	/**
	 * 금칙어목록 저장
	 *
	 * @param realGridRequest 신규, 수정, 삭제목록
	 * @return 성공 메시지
	 * @throws Exception
	 */
	@PostMapping("/system/badWordMgmt.saveBadWord.do")
	@ResponseBody
	public JSONResponseEntity<Void> saveBadWord(@RealGridCUD(type = StBwInfo.class) RealGridCUDRequest<StBwInfo> realGridCUD) throws Exception {
		List<StBwInfo> createList = realGridCUD.getCreate(), updateList = realGridCUD.getUpdate(), deleteList = realGridCUD.getDelete();
		badWordMgmtService.saveBadWord(createList, updateList, deleteList);
		return new JSONResponseEntity<Void>(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
	}

}