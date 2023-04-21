package com.enbiz.bo.app.controller.payment;

import java.util.List;
import java.util.Map;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.enbiz.bo.app.controller.BaseController;
import com.enbiz.bo.app.dto.ajax.JSONResponseEntity;
import com.enbiz.bo.app.dto.request.payment.OpMersInfoRequest;
import com.enbiz.bo.app.dto.response.payment.OpMersInfoResponse;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.entity.OpMersInfo;
import com.enbiz.bo.app.entity.StStdCd;
import com.enbiz.bo.app.service.code.CodeService;
import com.enbiz.bo.app.service.payment.FranchiseeMgmtService;
import com.enbiz.bo.base.annotation.RealGridSearch;
import com.enbiz.common.base.exception.MessageResolver;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class FranchiseeMgmtController extends BaseController {

	private final CodeService codeService;
	private final FranchiseeMgmtService franchiseeMgmtService;
	
	/**
	 * 가맹점 관리 화면 호출
	 * @return html path
	 * @throws Exception
	 */
	@GetMapping("/payment/FranchiseeMgmt.franchiseeView.do")
	public String getFranchisee(Model model) throws Exception{
		// OM028 : 매입사코드
		// OM036 : 적용사이트구분코드
		Map<String, List<StStdCd>> codeList = codeService.getStStdCd("OM028,OM036");
		model.addAttribute("codeList", codeList);
		return "views/payment/franchiseeView";
	}
	
	/**
	 * 가맹점 목록 조회
	 * @return realGridListResponse
	 * @throws Exception
	 */
	@GetMapping("/payment/FranchiseeMgmt.getFranchisee.do")
	@ResponseBody
	@RealGridSearch
	public String getFranchiseeList(OpMersInfoRequest opMersInfoRequest) throws Exception {
		int totalCount = franchiseeMgmtService.getFranchiseeListCount(opMersInfoRequest);
		List<OpMersInfoResponse> franchiseeList = franchiseeMgmtService.getFranchiseeList(opMersInfoRequest);
		RealGridListResponse response = new RealGridListResponse(franchiseeList, totalCount);
		return response.toJsonString();
	}
	
	/**
	 * 가맹점관리 등록/수정 화면 호출
	 * @param model
	 * @param opMersInfoRequest
	 * @return
	 * @throws Exception
	 */
	@GetMapping("/payment/FranchiseeMgmt.franchiseeSaveView.do")
	public String getFranchiseeUpdate(Model model, OpMersInfoRequest opMersInfoRequest) throws Exception{
		// OM028 : 매입사코드
		// OM030 : PG사 구분코드
		// OM036 : 적용사이트구분코드
		Map<String, List<StStdCd>> codeList = codeService.getStStdCd("OM028,OM030,OM036");
		model.addAttribute("codeList", codeList);

		if (opMersInfoRequest.getArgInsertUpdate().equals("I")) { // 등록
			model.addAttribute("requestData", opMersInfoRequest);
		} else { // 수정
			OpMersInfoResponse opMersInfoResponse = franchiseeMgmtService.franchiseeDetailInfo(opMersInfoRequest); // 가맹점 상세
			List<OpMersInfoResponse> siteList = franchiseeMgmtService.franchiseeSiteList(opMersInfoRequest); // 가맹점 적용사이트 리스트
			opMersInfoResponse.setArgInsertUpdate(opMersInfoRequest.getArgInsertUpdate());
			model.addAttribute("requestData", opMersInfoResponse);
			model.addAttribute("requestSiteList", siteList);
		}

		return "views/payment/franchiseeSaveView";
	}
	
	/**
	 * 가맹점관리 등록, 수정
	 * @param opMersInfoRequest 등록, 수정목록
	 * @param opMersInfo 등록, 수정목록
	 * @return 성공 메시지
	 * @throws Exception
	 */
	@RequestMapping("/payment/FranchiseeMgmt.saveFranchiseeDetail.do")
	@ResponseBody
	public JSONResponseEntity saveFranchiseeDetail(OpMersInfo opMersInfo, OpMersInfoRequest opMersInfoRequest) throws Exception {
		if(opMersInfo.getMersNo().equals("")){ // 등록
			franchiseeMgmtService.opMersInfoInsert(opMersInfo, opMersInfoRequest);
		} else { // 수정
			franchiseeMgmtService.opMersInfoUpdate(opMersInfo, opMersInfoRequest);
		}

		JSONResponseEntity response = new JSONResponseEntity();
		response.setMessage(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
		response.setSucceeded(true);
		return response;
	}
}
