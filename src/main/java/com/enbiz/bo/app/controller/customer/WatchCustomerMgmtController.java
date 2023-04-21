package com.enbiz.bo.app.controller.customer;

import java.util.List;
import java.util.Map;

import org.springframework.context.annotation.Lazy;
import org.springframework.http.MediaType;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.enbiz.bo.app.controller.BaseController;
import com.enbiz.bo.app.dto.ajax.JSONResponseEntity;
import com.enbiz.bo.app.dto.login.CurrentUser;
import com.enbiz.bo.app.dto.request.customer.CustomerDetailRequest;
import com.enbiz.bo.app.dto.request.customer.CustomerSearchRequest;
import com.enbiz.bo.app.dto.request.customer.WatchCustomerRequest;
import com.enbiz.bo.app.dto.response.customer.CustomerDetailOrderCallCountResponse;
import com.enbiz.bo.app.dto.response.customer.WatchCustomerResponse;
import com.enbiz.bo.app.dto.response.customer.WatchCustomerSearchResponse;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.entity.EtMgrMbrInfo;
import com.enbiz.bo.app.entity.StStdCd;
import com.enbiz.bo.app.service.code.CodeService;
import com.enbiz.bo.app.service.customer.WatchCustomerMgmtService;
import com.enbiz.common.base.Validator;
import com.enbiz.common.base.exception.MessageResolver;

import groovy.util.logging.Slf4j;
import lombok.RequiredArgsConstructor;

/**
 * 관심고객관리
 */
@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class WatchCustomerMgmtController extends BaseController {

	private final WatchCustomerMgmtService watchCustomerMgmtService;
	private final CodeService codeService;

	/**
	 * 관심회원관리 뷰
	 */
	@GetMapping("/customer/watchCustomerMgmt.watchCustomerMgmtView.do")
	public String watchCustomerMgmtView(Model model) throws Exception {
		//관리구분코드(ME019), 관리유형코드(ME009)
		Map<String, List<StStdCd>> codeList = codeService.getStStdCd("ME019,ME009");
		model.addAttribute("codeList", codeList);
		return "views/customer/watchCustomerMgmtView";
	}

	/**
	 * 관심회원관리 조회
	 */
	@GetMapping(value = "/customer/watchCustomerMgmt.getWatchCustomerList.do", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public RealGridListResponse getWatchCustomerList(CustomerSearchRequest customerSearchRequest) throws Exception {
		int totalCount = watchCustomerMgmtService.getWatchCustomerSearchByViewConditionCount(customerSearchRequest);
		List<WatchCustomerSearchResponse> dataList = watchCustomerMgmtService.getWatchCustomerSearchByViewConditionData(customerSearchRequest);
		RealGridListResponse response = new RealGridListResponse(dataList, totalCount);
		return response;
	}

	/**
	 * 관심고객 상세 뷰
	 */
	@GetMapping("/popup/watchCustomerMgmt.watchCustomerDetailPopup.do")
	public String watchCustomerDetailPopup(Model model, CustomerDetailRequest customerDetailRequest)
			throws Exception {
		Validator.throwIfNull(customerDetailRequest, MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"customerDetailRequest"}));
		Validator.throwIfEmpty(customerDetailRequest.getMbrNo(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"MbrNo"}));
		CustomerDetailOrderCallCountResponse response = watchCustomerMgmtService.getCustomerDetailOrderCallCountByMemberNo(customerDetailRequest);
		model.addAttribute("customerDetail", response);
		return "views/popup/watchCustomerDetailPopup";
	}

	/**
	 * 관심고객 유형 정보 조회
	 */
	@GetMapping(value = "/customer/watchCustomerMgmt.getWatchCustomerInfo.do", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public RealGridListResponse getWatchCustomerInfo(CustomerDetailRequest customerDetailRequest) throws Exception {
		int totalCount = watchCustomerMgmtService.getWatchCustomerInfoByMemberNoCount(customerDetailRequest);
		List<WatchCustomerResponse> responseData = watchCustomerMgmtService.getWatchCustomerInfoByMemberNoData(customerDetailRequest);
		RealGridListResponse response = new RealGridListResponse(responseData, totalCount);
		return response;
	}

	/**
	 * 관심고객 해제
	 */
	@PutMapping(value = "/customer/watchCustomerMgmt.unlockWatchCustomer.do", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public JSONResponseEntity<Void> unlockWatchCustomer(WatchCustomerRequest watchCustomerRequest)
			throws Exception {
		Validator.throwIfNull(watchCustomerRequest.getMgrMbrNoArray(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"MbrNoArray"}));
		CurrentUser currentUser = (CurrentUser)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		String loginedId = currentUser.getLoginId();
		watchCustomerRequest.setMgrMbrRvcId(loginedId);
		watchCustomerMgmtService.unlockWatchCustomer(watchCustomerRequest);
		JSONResponseEntity<Void> jsonResponseEntity = new JSONResponseEntity<Void>(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
		return jsonResponseEntity;
	}

	/**
	 * 관심고객 등록/수정 뷰
	 */
	@GetMapping("/popup/watchCustomerMgmt.watchCustomerSaveView.do")
	public String watchCustomerSaveView(Model model) throws Exception {
		//관리구분코드(ME019), 관리유형코드(ME009)
		Map<String, List<StStdCd>> codeList = codeService.getStStdCd("ME019,ME009");
		model.addAttribute("codeList", codeList);
		return "views/popup/watchCustomerSaveView";
	}

	/**
	 * 관심고객 등록/수정
	 */
	@PostMapping(value= "/customer/watchCustomerMgmt.saveWatchCustomer.do", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public JSONResponseEntity<Void> saveWatchCustomer(EtMgrMbrInfo etMgrMbrInfo) throws Exception {
		Validator.throwIfNull(etMgrMbrInfo, MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"etMgrMbrInfo"}));
		Validator.throwIfEmpty(etMgrMbrInfo.getMbrNo(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"MbrNo"}));
		//2. 데이터저장
		CurrentUser currentUser = (CurrentUser)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		etMgrMbrInfo.setMgrMbrRegId(currentUser.getLoginId());
		watchCustomerMgmtService.saveWatchCustomer(etMgrMbrInfo);
		JSONResponseEntity<Void> response = new JSONResponseEntity<Void>();
		response.setSucceeded(true);
		return response;
	}

}