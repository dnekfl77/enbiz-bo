package com.enbiz.bo.app.controller.payment;

import java.util.List;
import java.util.Map;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.enbiz.bo.app.controller.BaseController;
import com.enbiz.bo.app.dto.ajax.JSONResponseEntity;
import com.enbiz.bo.app.dto.request.payment.OpPayMeanCtrlDtlInfoRequest;
import com.enbiz.bo.app.dto.request.payment.OpPayMeanCtrlInfoRequest;
import com.enbiz.bo.app.dto.request.realgrid.RawRealGridCUDRequest;
import com.enbiz.bo.app.dto.response.payment.OpPayMeanCtrlInfoResponse;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.entity.OpPayMeanCtrlInfo;
import com.enbiz.bo.app.entity.StStdCd;
import com.enbiz.bo.app.service.code.CodeService;
import com.enbiz.bo.app.service.payment.PaymentMeanControlMgmtService;
import com.enbiz.bo.base.annotation.RawRealGridCUD;
import com.enbiz.common.base.exception.MessageResolver;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class PaymentMeanControlMgmtController extends BaseController {

	private final CodeService codeService;
	private final PaymentMeanControlMgmtService paymentMeanControlMgmtService;

	/**
	 * 결제수단 제어관리 화면 호출
	 * 
	 * @return html path
	 * @throws Exception
	 */
	@GetMapping("/payment/paymentMeanControlMgmt.paymentMeanControlView.do")
	public String paymentMeanControlView(Model model) throws Exception {
		// OM013 : 결제수단코드
		// OM030 : PG구분코드
		// OM032 : 제어구분코드
		Map<String, List<StStdCd>> codeList = codeService.getStStdCd("OM013,OM030,OM032");
		model.addAttribute("codeList", codeList);
		return "views/payment/paymentMeanControlView";
	}

	/**
	 * 결제수단 제어 목록 조회
	 * 
	 * @return realGridListResponse
	 * @throws Exception
	 */
	@GetMapping("/payment/paymentMeanControlMgmt.getPaymentMeanControl.do")
	@ResponseBody
	public RealGridListResponse getPaymentMeanControl(OpPayMeanCtrlInfoRequest opPayMeanCtrlInfoRequest) throws Exception {
		int totalCount = paymentMeanControlMgmtService.getMethodsOfPaymentControlListCount(opPayMeanCtrlInfoRequest);
		List<OpPayMeanCtrlInfoResponse> controlList = paymentMeanControlMgmtService.getMethodsOfPaymentControlList(opPayMeanCtrlInfoRequest);
		RealGridListResponse response = new RealGridListResponse(controlList, totalCount);
		return response;
	}

	/**
	 * 결제수단 제어관리 등록/수정 화면 호출
	 * 
	 * @return html path
	 * @throws Exception
	 */
	@GetMapping("/payment/paymentMeanControlMgmt.paymentMeanControlSaveView.do")
	public String paymentMeanControlSaveView(Model model, OpPayMeanCtrlInfoRequest opPayMeanCtrlInfoRequest) throws Exception {
		// OM013 : 결제수단코드
		// OM026 : 은행코드
		// OM027 : 발급사코드
		// OM030 : PG구분코드
		// OM031 : 결제디바이스코드
		// OM032 : 제어구분코드
		Map<String, List<StStdCd>> codeList = codeService.getStStdCd("OM013,OM026,OM027,OM030,OM031,OM032");
		model.addAttribute("codeList", codeList);

		if (opPayMeanCtrlInfoRequest.getArgInsertUpdate().equals("I")) { // 등록
			model.addAttribute("requestData", opPayMeanCtrlInfoRequest);
		} else { // 수정
			OpPayMeanCtrlInfoResponse opPayMeanCtrlInfoResponse = paymentMeanControlMgmtService.methodsOfPaymentControlDetailInfo(opPayMeanCtrlInfoRequest);
			opPayMeanCtrlInfoResponse.setArgInsertUpdate(opPayMeanCtrlInfoRequest.getArgInsertUpdate());
			model.addAttribute("requestData", opPayMeanCtrlInfoResponse);
		}

		return "views/payment/paymentMeanControlSaveView";
	}

	/**
	 * 결제수단 제어관리 상세 _ 제어상세 목록 조회
	 * 
	 * @param opPayMeanCtrlInfoRequest
	 * @return realGridListResponse
	 * @throws Exception
	 */
	@GetMapping("/payment/paymentMeanControlMgmt.getPaymentMeanControlDetail.do")
	@ResponseBody
	public RealGridListResponse getMethodsOfPaymentControlDetail(OpPayMeanCtrlInfoRequest opPayMeanCtrlInfoRequest) throws Exception {
		int totalCount = paymentMeanControlMgmtService.getMethodsOfPaymentControlDetailCount(opPayMeanCtrlInfoRequest);
		List<OpPayMeanCtrlInfoResponse> controlList = paymentMeanControlMgmtService.getMethodsOfPaymentControlDetail(opPayMeanCtrlInfoRequest);
		RealGridListResponse response = new RealGridListResponse(controlList, totalCount);
		return response;
	}

	/**
	 * 결제수단 제어관리 상세 저장
	 * 
	 * @param rawCUDRequest 제어관리 상세 저장
	 * @param opPayMeanCtrlDtlInfoRequest
	 * @return 성공 메시지
	 * @throws Exception
	 */
	@PostMapping("/payment/paymentMeanControlMgmt.savePaymentMeanControlDetail.do")
	@ResponseBody
	public JSONResponseEntity savePaymentMeanControlDetail(@RawRealGridCUD RawRealGridCUDRequest rawCUDRequest,
			OpPayMeanCtrlDtlInfoRequest opPayMeanCtrlDtlInfoRequest) throws Exception {

		String payMeanCtrlNo = "";
		OpPayMeanCtrlInfo opPayMeanCtrlInfo = opPayMeanCtrlDtlInfoRequest.getOpPayMeanCtrlInfo();
		if (opPayMeanCtrlInfo.getPayMeanCtrlNo().equals("")) { // 등록
			opPayMeanCtrlInfo.setSysRegId(opPayMeanCtrlDtlInfoRequest.getSysRegId());
			paymentMeanControlMgmtService.opPayMeanCtrlInfoInsert(opPayMeanCtrlInfo);
		} else { // 수정
			opPayMeanCtrlInfo.setSysModId(opPayMeanCtrlDtlInfoRequest.getSysModId());
			paymentMeanControlMgmtService.opPayMeanCtrlInfoUpdate(opPayMeanCtrlInfo);
		}

		payMeanCtrlNo = opPayMeanCtrlInfo.getPayMeanCtrlNo();
		paymentMeanControlMgmtService.registCUD(payMeanCtrlNo, opPayMeanCtrlDtlInfoRequest);

		return new JSONResponseEntity(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
	}
}
