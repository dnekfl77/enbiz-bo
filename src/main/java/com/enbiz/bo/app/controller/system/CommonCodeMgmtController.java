package com.enbiz.bo.app.controller.system;

import java.util.List;

import javax.validation.Valid;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.enbiz.bo.app.controller.BaseController;
import com.enbiz.bo.app.dto.ajax.JSONResponseEntity;
import com.enbiz.bo.app.dto.request.realgrid.RealGridCUDRequest;
import com.enbiz.bo.app.dto.request.system.GroupCodeRequest;
import com.enbiz.bo.app.dto.request.system.StandardCodeRequest;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.dto.response.system.GroupCodeResponse;
import com.enbiz.bo.app.dto.response.system.StandardCodeResponse;
import com.enbiz.bo.app.service.system.CommonCodeMgmtService;
import com.enbiz.bo.base.annotation.RealGridCUD;
import com.enbiz.common.base.exception.MessageResolver;

import groovy.util.logging.Slf4j;
import lombok.RequiredArgsConstructor;

/**
 * 시스템 관리 > 기본정보관리 > 공통코드관리
 */
@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class CommonCodeMgmtController extends BaseController {
	
	private final CommonCodeMgmtService commonCodeMgmtService;

	/**
	 * 공통코드 관리 화면 호출
	 *
	 * @return 공통코드 관리 화면
	 * @throws Exception
	 */
	@GetMapping("/system/commonCodeMgmt.commonCodeMgmtView.do")
	public String commonCodeMgmtView(Model model) throws Exception {
		return "views/system/commonCodeMgmtView";
	}

	/**
	 * 그룹코드 목록 조회
	 *
	 * @param GroupCodeRequest
	 * @return 그룹코드 목록
	 * @throws Exception
	 */
	@GetMapping(value = "/system/commonCodeMgmt.getGroupCodeList.do", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public RealGridListResponse getGroupCodeList(GroupCodeRequest GroupCodeRequest) throws Exception {
		int totalCount = commonCodeMgmtService.getGroupCodeListCount(GroupCodeRequest);
		List<GroupCodeResponse> stGrpCdList = commonCodeMgmtService.getGroupCodeList(GroupCodeRequest);
		RealGridListResponse response = new RealGridListResponse(stGrpCdList, totalCount);
		return response;
	}

	/**
	 * 그룹코드 목록 저장
	 *
	 * @param RealGridCUDRequest<GroupCodeRequest> 신규, 수정목록
	 * @return 성공 메시지
	 * @throws Exception
	 */
	@PostMapping(value = "/system/commonCodeMgmt.saveGroupCode.do")
	@ResponseBody
	public JSONResponseEntity<Void> saveGroupCode(
			@Valid @RealGridCUD(type = GroupCodeRequest.class) RealGridCUDRequest<GroupCodeRequest> realGridCUD) throws Exception {
		commonCodeMgmtService.saveGroupCode(realGridCUD);		
		return new JSONResponseEntity<Void>(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
	}

	/**
	 * 기준코드목록 조회
	 *
	 * @param StandardCodeRequest
	 * @return 기준코드 목록
	 * @throws Exception
	 */
	@GetMapping(value = "/system/commonCodeMgmt.getStandardCodeList.do")
	@ResponseBody
	public RealGridListResponse getStandardCodeList(StandardCodeRequest StandardCodeRequest) throws Exception {
		int totalCount = commonCodeMgmtService.getStandardCodeListCount(StandardCodeRequest);
		List<StandardCodeResponse> stStdCdList = commonCodeMgmtService.getStandardCodeList(StandardCodeRequest);
		RealGridListResponse response = new RealGridListResponse(stStdCdList, totalCount);
		return response;
	}
	
	/**
	 * 기준코드목록 저장
	 *
	 * @param RealGridCUDRequest<StStdCdEx> 신규, 수정, 삭제목록
	 * @return 성공 메시지
	 * @throws Exception
	 */
	@PostMapping(value = "/system/commonCodeMgmt.saveStandardCode.do")
	@ResponseBody
	public JSONResponseEntity<Void> saveStandardCode(
			@Valid @RealGridCUD(type = StandardCodeRequest.class) RealGridCUDRequest<StandardCodeRequest> realGridCUD) throws Exception {
		List<StandardCodeRequest> createList = realGridCUD.getCreate(), updateList = realGridCUD.getUpdate();
		commonCodeMgmtService.saveStandardCode(createList, updateList);
		return new JSONResponseEntity<Void>(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
	}

}