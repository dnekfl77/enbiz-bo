package com.enbiz.bo.app.controller.payment;

import java.util.List;
import java.util.Map;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.enbiz.bo.app.controller.BaseController;
import com.enbiz.bo.app.dto.ajax.JSONResponseEntity;
import com.enbiz.bo.app.dto.request.payment.OpPgByPayMeanRequest;
import com.enbiz.bo.app.dto.request.realgrid.RealGridCUDRequest;
import com.enbiz.bo.app.dto.response.payment.OpPgByPayMeanResponse;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.entity.OpPgByPayMean;
import com.enbiz.bo.app.entity.StStdCd;
import com.enbiz.bo.app.service.code.CodeService;
import com.enbiz.bo.app.service.payment.PaymentMeanMgmtService;
import com.enbiz.bo.base.annotation.RealGridCUD;
import com.enbiz.common.base.exception.MessageResolver;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class PaymentMeanMgmtController extends BaseController {

	private final CodeService codeService;
	private final PaymentMeanMgmtService paymentMeanMgmtService;

	/**
	 * 결제수단관리 화면 호출
	 * 
	 * @return html path
	 * @throws Exception
	 */
	@GetMapping("/payment/paymentMeanMgmt.paymentMeanView.do")
	public String methodsOfPaymentList(Model model) throws Exception {
		// OM013 : 결제수단코드
		Map<String, List<StStdCd>> codeList = codeService.getStStdCd("OM013");
		model.addAttribute("codeList", codeList);
		return "views/payment/paymentMeanMgmtView";
	}

	/**
	 * 결제수단관리 PG사 목록 조회
	 * 
	 * @return realGridListResponse
	 * @throws Exception
	 */
	@GetMapping("/payment/paymentMeanMgmt.getPgList.do")
	@ResponseBody
	public RealGridListResponse getPgList() throws Exception {
		int totalCount = paymentMeanMgmtService.getPgListCount();
		List<OpPgByPayMeanResponse> pgList = paymentMeanMgmtService.getPgList();
		RealGridListResponse response = new RealGridListResponse(pgList, totalCount);
		return response;
	}

	/**
	 * 결제수단관리 결제수단 목록 조회
	 * 
	 * @param opPgByPayMeanRequest
	 * @return realGridListResponse
	 * @throws Exception
	 */
	@GetMapping("/payment/paymentMeanMgmt.getPaymentMean.do")
	@ResponseBody
	public RealGridListResponse getPaymentMean(OpPgByPayMeanRequest opPgByPayMeanRequest) throws Exception {
		int totalCount = paymentMeanMgmtService.getMethodsOfPaymentListCount(opPgByPayMeanRequest);
		List<OpPgByPayMeanResponse> methodsOfPaymentList = paymentMeanMgmtService.getMethodsOfPaymentList(opPgByPayMeanRequest);
		RealGridListResponse response = new RealGridListResponse(methodsOfPaymentList, totalCount);
		return response;
	}

	/**
	 * 결제수단관리 PG사 목록 수정
	 * 
	 * @param realGridCUD 수정목록
	 * @return 성공 메시지
	 * @throws Exception
	 */
	@PostMapping("/payment/paymentMeanMgmt.savePgList.do")
	@ResponseBody
	public JSONResponseEntity savePgList(@RealGridCUD(type = StStdCd.class) RealGridCUDRequest<StStdCd> realGridCUD) throws Exception {
		List<StStdCd> updateList = realGridCUD.getUpdate();
		paymentMeanMgmtService.savePgList(updateList);
		JSONResponseEntity jsonResponseEntity = new JSONResponseEntity(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
		return jsonResponseEntity;
	}

	/**
	 * 결제수단 목록 입력, 수정
	 * 
	 * @param realGridCUD 입력, 수정목록
	 * @return 성공 메시지
	 * @throws Exception
	 */
	@RequestMapping("/payment/paymentMeanMgmt.savePaymentMean.do")
	@ResponseBody
	public JSONResponseEntity saveMethodsOfPaymentList(@RealGridCUD(type = OpPgByPayMean.class) RealGridCUDRequest<OpPgByPayMean> realGridCUD)
			throws Exception {
		List<OpPgByPayMean> createList = realGridCUD.getCreate(), updateList = realGridCUD.getUpdate();
		paymentMeanMgmtService.saveMethodsOfPaymentList(createList, updateList);
		JSONResponseEntity jsonResponseEntity = new JSONResponseEntity(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
		return jsonResponseEntity;
	}
}
