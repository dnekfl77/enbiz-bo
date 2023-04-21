package com.enbiz.bo.app.controller.customer;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.enbiz.bo.app.controller.BaseController;
import com.enbiz.bo.app.dto.request.customer.CustomerSearchRequest;
import com.enbiz.bo.app.dto.response.customer.CustomerSearchResponse;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.service.customer.DormantCustomerInquiryService;

import groovy.util.logging.Slf4j;
import lombok.RequiredArgsConstructor;

/**
 * 관심고객관리
 */
@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class DormantCustomerInquiryController extends BaseController {

	private final DormantCustomerInquiryService dormantCustomerInquiryService;

	/**
	 * 휴면회원 조회 뷰
	 */
	@RequestMapping("/customer/dormantCustomerInquiry.dormantCustomerMgmtView.do")
	public String dormantCustomerMgmtView(Model model) throws Exception {
		return "views/customer/dormantCustomerMgmtView";
	}

	/**
	 * 휴면회원 조회 검색
	 */
	@RequestMapping(value = "/customer/dormantCustomerInquiry.getDormantCustomerBySearchCondition.do", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public RealGridListResponse getDormantCustomerBySearchCondition(CustomerSearchRequest customerSearchRequest) throws Exception {
		int totalCount = dormantCustomerInquiryService.getDormantCustomerBySearchConditionCount(customerSearchRequest);
		List<CustomerSearchResponse> data = dormantCustomerInquiryService.getDormantCustomerBySearchConditionData(customerSearchRequest);
		RealGridListResponse response = new RealGridListResponse(data, totalCount);
		return response;
	}

}