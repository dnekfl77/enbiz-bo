package com.enbiz.bo.app.controller.customer;

import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.enbiz.bo.app.constant.Constants;
import com.enbiz.bo.app.controller.BaseController;
import com.enbiz.bo.app.dto.ajax.JSONResponseEntity;
import com.enbiz.bo.app.dto.request.customer.CustomerDetailRequest;
import com.enbiz.bo.app.dto.request.customer.CustomerSearchRequest;
import com.enbiz.bo.app.dto.request.realgrid.RawRealGridCUDRequest;
import com.enbiz.bo.app.dto.response.customer.CustomerDeliveryInfoResponse;
import com.enbiz.bo.app.dto.response.customer.CustomerDetailResponse;
import com.enbiz.bo.app.dto.response.customer.CustomerDetailResponseEx;
import com.enbiz.bo.app.dto.response.customer.CustomerGradeHistoryResponse;
import com.enbiz.bo.app.dto.response.customer.CustomerRefundAccountInfoResponse;
import com.enbiz.bo.app.dto.response.customer.CustomerSearchResponse;
import com.enbiz.bo.app.dto.response.customer.CustomerTermsAgreeHistoryResponse;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.entity.EtMbrBase;
import com.enbiz.bo.app.entity.EtMbrRfdActnInfo;
import com.enbiz.bo.app.entity.StStdCd;
import com.enbiz.bo.app.service.code.CodeService;
import com.enbiz.bo.app.service.customer.CustomerMgmtService;
import com.enbiz.bo.base.annotation.RawRealGridCUD;
import com.enbiz.common.base.Validator;
import com.enbiz.common.base.exception.MessageResolver;

import groovy.util.logging.Slf4j;
import lombok.RequiredArgsConstructor;

/**
 * 회원 관리
 */
@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class CustomerMgmtController extends BaseController {

	private final CustomerMgmtService customerMgmtService;
	private final CodeService codeService;

	/**
	 * 회원관리 화면
	 */
	@GetMapping("/customer/customerMgmt.customerMgmtView.do")
	public String customerMgmtView(Model model) throws Exception {
		//회원관리코드(ME002), 회원상태코드(ME003)
		Map<String, List<StStdCd>> codeList = codeService.getStStdCd("ME002,ME003");
		model.addAttribute("codeList", codeList);
		return "views/customer/customerMgmtView";
	}

	/**
	 * 회원 조회
	 */
	@GetMapping(value = "/customer/customerMgmt.getCustomerList.do",produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public RealGridListResponse getCustomerList(CustomerSearchRequest customerSearchRequest) throws Exception {
		int totalCount = customerMgmtService.getCustomerListCount(customerSearchRequest);
		List<CustomerSearchResponse> partnerSearchResponseList = customerMgmtService.getCustomerList(customerSearchRequest);
		RealGridListResponse response = new RealGridListResponse(partnerSearchResponseList, totalCount);
		return response;
	}

	/**
	 * 회원 상세 뷰
	 */
	@GetMapping("/popup/customerMgmt.customerDetailAndOthersPopup.do")
	public String customerDetailAndOthersPopup(Model model, CustomerDetailRequest customerDetailRequest)
			throws Exception {
		//1. Parameters Validation
		Validator.throwIfNull(customerDetailRequest, MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"CustomerDetailRequest"}));
		
		Validator.throwIfEmpty(customerDetailRequest.getMbrNo(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"MbrNo"}));

		//2. get Data
		CustomerDetailResponseEx customerDetailResoponseEx = customerMgmtService.getCustomerDetail(customerDetailRequest);

		//3. get Code Array
		//휴대폰통신사코드(CM013), 회원탈퇴사유(ME006), 메일도메인(CM012)
		Map<String, List<StStdCd>> codeList = codeService.getStStdCd("CM013,ME006,CM012");

		//4. response model object
		model.addAttribute("codeList", codeList);

		CustomerDetailResponse customerDetailResponse = customerDetailResoponseEx;

		RealGridListResponse etMbrDlvpInfoList = new RealGridListResponse(customerDetailResoponseEx.getCustomerDeliveryInfoResponseList(),customerDetailResoponseEx.getCustomerDeliveryInfoResponseList().size());

		model.addAttribute("etMbrDlvpInfoList", etMbrDlvpInfoList.toJsonString());

		RealGridListResponse etMbrSvcAgrInfoList = new RealGridListResponse(customerDetailResoponseEx.getCustomerTermsAgreeInfoResponseList(),customerDetailResoponseEx.getCustomerTermsAgreeInfoResponseList().size());

		model.addAttribute("etMbrSvcAgrInfoList", etMbrSvcAgrInfoList.toJsonString());
		model.addAttribute("customerDetail", customerDetailResponse);

		return "views/popup/customerDetailAndOthersPopup";
	}
	
	/**
	 * 회원등급 이력 뷰
	 */
	@GetMapping("/popup/customerMgmt.customerGradeHistoryPopup.do")
	public String customerGradeHistoryPopup(Model model, CustomerDetailRequest customerDetailRequest)
			throws Exception {
		//1. Parameters Validation
		if (customerDetailRequest == null) throw new Exception("필수값 누락");
		if (StringUtils.isBlank(customerDetailRequest.getMbrNo())) throw new Exception("필수값 누락");
		model.addAttribute("customerDetail", customerDetailRequest);
		return "views/popup/customerGradeHistoryPopup";
	}

	/**
	 * 회원등급 이력 조회
	 */
	@GetMapping(value = "/customer/customerMgmt.getCustomerGradeHistory.do", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public RealGridListResponse getCustomerGradeHistory(CustomerDetailRequest customerDetailRequest) throws Exception {
		int totalCount = customerMgmtService.getCustomerGradeHistoryByMemberNoCount(customerDetailRequest);
		List<CustomerGradeHistoryResponse> responseData = customerMgmtService.getCustomerGradeHistoryByMemberNoData(customerDetailRequest);
		RealGridListResponse response = new RealGridListResponse(responseData, totalCount);
		return response;
	}
	
	/**
	 * 환불계좌관리 뷰
	 */
	@GetMapping("/popup/customerMgmt.customerRefundAccountPopup.do")
	public String customerRefundAccountPopup(Model model, CustomerDetailRequest customerDetailRequest) throws Exception {
		//1. Parameters Validation
		Validator.throwIfNull(customerDetailRequest, MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"customerDetailRequest"}));
		Validator.throwIfEmpty(customerDetailRequest.getMbrNo(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"MbrNo"}));
		
		//2. get Code Array
		//환불은행코드(OM026)
		Map<String, List<StStdCd>> codeList = codeService.getStStdCd("OM026");
		
		//3. get Data
		CustomerRefundAccountInfoResponse customerRefundAccountInfoResponse = customerMgmtService.getCustomerRefundAccountInfoByMemberNo(customerDetailRequest);
		
		//4. response model object
		model.addAttribute("codeList", codeList);
		model.addAttribute("customerRequest", customerDetailRequest);
		model.addAttribute("customerRefundAccount", customerRefundAccountInfoResponse);
		
		return "views/popup/customerRefundAccountPopup";
	}

	/**
	 * 환불계좌관리 저장
	 */
	@PostMapping(value= "/customer/customerMgmt.saveCustomerRefundAccount.do", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public JSONResponseEntity<Void> saveCustomerRefundAccount(EtMbrRfdActnInfo etMbrRfdActnInfo) throws Exception {
		//1. Parameters Validation
		Validator.throwIfNull(etMbrRfdActnInfo, MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"etMbrRfdActnInfo"}));
		Validator.throwIfEmpty(etMbrRfdActnInfo.getMbrNo(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"MbrNo"}));
		//2. 데이터저장
		customerMgmtService.saveCustomerRefundAccount(etMbrRfdActnInfo);
		JSONResponseEntity<Void> response = new JSONResponseEntity<Void>();
		response.setSucceeded(true);
		return response;
	}
	
	/**
	 * 회원 배송지 조회
	 */
	@GetMapping(value = "/customer/customerMgmt.getCustomerDelivery.do", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public RealGridListResponse getCustomerDelivery(CustomerDetailRequest customerDetailRequest) throws Exception {
		int totalCount = customerMgmtService.getCustomerDeliveryListCount(customerDetailRequest);
		List<CustomerDeliveryInfoResponse> responseData = customerMgmtService.getCustomerDeliveryList(customerDetailRequest);
		RealGridListResponse response = new RealGridListResponse(responseData, totalCount);
		return response;
	}
	
	/**
	 * 회원상세 저장
	 */
	@PostMapping("/popup/customerMgmt.saveCustomerDetailAndOthersData.do")
	@ResponseBody
	public JSONResponseEntity<Void> saveCustomerDetailAndOthersData(@RawRealGridCUD RawRealGridCUDRequest rawCUDRequest, EtMbrBase etMbrBase) throws Exception {
		//1. parameter check!!
		customerValidatorCheck(etMbrBase);
		customerMgmtService.saveCustomerDetailAndOthersData(rawCUDRequest, etMbrBase);
		JSONResponseEntity<Void> jsonResponseEntity = new JSONResponseEntity<Void>(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
		return jsonResponseEntity;
	}

	/**
	 * 회원 저장 정보 유효성 검증
	 */
	private void customerValidatorCheck(EtMbrBase etMbrBase) throws Exception{
		Validator.throwIfEmpty(etMbrBase.getMbrNo(), MessageResolver.getMessage(Constants.MSG_COMMON_PARAMETER_EMPTY_ERROR, new String[] {"MbrNo"}));
	}
	
	/**
	 * 동의정보 이력 뷰
	 */
	@GetMapping("/popup/customerMgmt.customerTermsAgreeHistoryPopup.do")
	public String customerTermsAgreeHistoryPopup(Model model, CustomerDetailRequest customerDetailRequest) throws Exception {
		Validator.throwIfNull(customerDetailRequest, MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"customerDetailRequest"}));
		
		Validator.throwIfEmpty(customerDetailRequest.getMbrNo(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"MbrNo"}));
		
		Validator.throwIfEmpty(customerDetailRequest.getSiteNo(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"SiteNo"}));

		model.addAttribute("customerDetail", customerDetailRequest);

		return "views/popup/customerTermsAgreeHistoryPopup";
	}
	
	/**
	 * 동의정보 이력 조회
	 */
	@GetMapping(value = "/customer/customerMgmt.getCustomerTermsAgreeHistory.do", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public RealGridListResponse getCustomerTermsAgreeHistory(CustomerDetailRequest customerDetailRequest) throws Exception {
		int totalCount = customerMgmtService.getCustomerTermsAgreeHistoryByMemberNoSiteNoCount(customerDetailRequest);
		List<CustomerTermsAgreeHistoryResponse> responseData = customerMgmtService.getCustomerTermsAgreeHistoryByMemberNoSiteNoData(customerDetailRequest);
		RealGridListResponse response = new RealGridListResponse(responseData, totalCount);
		return response;
	}

}