package com.enbiz.bo.app.controller.payment;

import java.util.List;
import java.util.Map;

import org.springframework.context.annotation.Lazy;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.enbiz.bo.app.dto.ajax.JSONResponseEntity;
import com.enbiz.bo.app.dto.request.payment.OpCmsnInfoRequest;
import com.enbiz.bo.app.dto.response.payment.OpCmsnInfoResponse;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.entity.OpCmsnInfo;
import com.enbiz.bo.app.entity.StStdCd;
import com.enbiz.bo.app.service.code.CodeService;
import com.enbiz.bo.app.service.payment.PaymentCommissionMgmtService;
import com.enbiz.common.base.exception.MessageResolver;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 결제수수료 관리
 */
@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class PaymentCommissionMgmtController {

	private final CodeService codeService;
	private final PaymentCommissionMgmtService paymentCommissionMgmtService;

	/**
	 * 결제수수료관리 화면 호출
	 * 
	 * @return html path
	 * @throws Exception
	 */
	@GetMapping("/payment/PaymentCommissionMgmt.paymentCommissionView.do")
	public String getClearingCommissionList(Model model) throws Exception {
		// OM030 : PG사
		// OM037 : 결제수단유형 (수수료대상대분류코드)
		// OM028 : 결제수단명 (매입사코드)
		// OM026 : 결제수단명 (은행코드)
		// OM038 : 수수료유형
		Map<String, List<StStdCd>> codeList = codeService.getStStdCd("OM030,OM037,OM028,OM026,OM038");
		model.addAttribute("codeList", codeList);
		return "views/payment/paymentCommissionView";
	}

	/**
	 * 결제수수료관리 목록 조회
	 * 
	 * @param opCmsnInfoRequest
	 * @return
	 * @throws Exception
	 */
	@GetMapping("/payment/PaymentCommissionMgmt.getPaymentCommission.do")
	@ResponseBody
	public RealGridListResponse getClearingCommissionList(OpCmsnInfoRequest opCmsnInfoRequest) throws Exception {
		int totalCount = paymentCommissionMgmtService.getClearingCommissionListCount(opCmsnInfoRequest);
		List<OpCmsnInfoResponse> clearingCommissionList = paymentCommissionMgmtService.getClearingCommissionList(opCmsnInfoRequest);
		RealGridListResponse response = new RealGridListResponse(clearingCommissionList, totalCount);
		return response;
	}

	/**
	 * 결제수수료관리 등록/수정 화면 호출
	 * 
	 * @param model
	 * @param opCmsnInfoRequest
	 * @return
	 * @throws Exception
	 */
	@GetMapping("/payment/PaymentCommissionMgmt.paymentCommissionSaveView.do")
	public String getClearingCommissionUpdate(Model model, OpCmsnInfoRequest opCmsnInfoRequest) throws Exception {
		// OM030 : PG사
		// OM037 : 결제수단유형 (수수료대상대분류코드)
		// OM028 : 결제수단명 (매입사코드)
		// OM026 : 결제수단명 (은행코드)
		// OM038 : 수수료유형
		// OM039 : 수수료구분
		// OM040 : 정산구분
		Map<String, List<StStdCd>> codeList = codeService.getStStdCd("OM030,OM037,OM028,OM026,OM038,OM039,OM040");
		model.addAttribute("codeList", codeList);

		List<OpCmsnInfoResponse> mersTotalList = paymentCommissionMgmtService.getMersTotalList(); // 가맹점 전체 리스트
		model.addAttribute("mersTotalList", mersTotalList);

		if (opCmsnInfoRequest.getArgInsertUpdate().equals("I")) { // 등록
			model.addAttribute("requestData", opCmsnInfoRequest);
		} else { // 수정
			OpCmsnInfoResponse base = paymentCommissionMgmtService.getClearingCommissionDetail(opCmsnInfoRequest); // 수수료정보 상세
			base.setArgInsertUpdate(opCmsnInfoRequest.getArgInsertUpdate());
			model.addAttribute("requestData", base);

			if (opCmsnInfoRequest.getCmsnTgtLgrpCd().equals("11")) { // 신용카드인경우
				List<OpCmsnInfoResponse> mappingMersList = paymentCommissionMgmtService.getMappingMersList(opCmsnInfoRequest); // 수수료정보 선택 가맹점 리스트
				model.addAttribute("mersList", mappingMersList);

				if (opCmsnInfoRequest.getCmsnTypCd().equals("20")) { // 수수료 유형(무이자)
					List<OpCmsnInfoResponse> monthList = paymentCommissionMgmtService.getMonthList(opCmsnInfoRequest); // 수수료율 적용 개월별 리스트
					model.addAttribute("monthList", monthList);
				} else {
					model.addAttribute("monthList", null);
				}
			} else {
				model.addAttribute("mersList", null);
				model.addAttribute("monthList", null);
			}
		}

		return "views/payment/paymentCommissionSaveView";
	}

	/**
	 * 결제수수료관리 _ 적용기간 중복 여부 확인
	 * 
	 * @param opCmsnInfoRequest
	 * @return
	 * @throws Exception
	 */
	@PostMapping(value = "/payment/PaymentCommissionMgmt.getApplyDateCheck.do", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public JSONResponseEntity aplyDateCheck(OpCmsnInfoRequest opCmsnInfoRequest) throws Exception {
		boolean result = paymentCommissionMgmtService.aplyDateCheck(opCmsnInfoRequest);
		JSONResponseEntity response = new JSONResponseEntity();
		response.setSucceeded(result);
		return response;
	}

	/**
	 * 결제수수료관리 상세 저장
	 * 
	 * @param opCmsnInfoRequest
	 * @param opCmsnInfo
	 * @return 성공 메시지
	 * @throws Exception
	 */
	@PostMapping("/payment/PaymentCommissionMgmt.savePaymentCommission.do")
	@ResponseBody
	public JSONResponseEntity saveClearingCommissionDetail(OpCmsnInfoRequest opCmsnInfoRequest, OpCmsnInfo opCmsnInfo) throws Exception {
		paymentCommissionMgmtService.saveClearingCommissionDetail(opCmsnInfoRequest, opCmsnInfo);
		JSONResponseEntity jsonResponseEntity = new JSONResponseEntity(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
		return jsonResponseEntity;
	}
}
