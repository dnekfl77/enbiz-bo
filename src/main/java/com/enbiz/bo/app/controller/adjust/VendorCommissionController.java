package com.enbiz.bo.app.controller.adjust;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.enbiz.bo.app.controller.BaseController;
import com.enbiz.bo.app.dto.request.adjust.VendorCommissionRequest;
import com.enbiz.bo.app.dto.response.adjust.VendorCommissionResponse;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.service.adjust.VendorCommissionService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 업체매출수수료조회
 */
@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class VendorCommissionController extends BaseController {
	private final VendorCommissionService vendorCommissionService;
	
	/**
	 * 업체매출수수료조회 화면 호출
	 *
	 * @return html path
	 * @throws Exception
	 */
	@RequestMapping("/adjust/vendorCommission.vendorCommissionView.do")
	public String vendorCommissionView(Model model) throws Exception {
		return "views/adjust/vendorCommissionView";
	}
	
	/**
	 * 업체매출수수료조회
	 *
	 * @param vendorCommissionRequest
	 * @return realGridListResponse
	 * @throws Exception
	 */
	@GetMapping(value = "/adjust/vendorCommission.getVendorCommissionList.do", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public RealGridListResponse getVendorCommissionList(VendorCommissionRequest vendorCommissionRequest) throws Exception {
		int totalCount = vendorCommissionService.getVendorCommissionListCount(vendorCommissionRequest);
		List<VendorCommissionResponse> vendorCommissionList =  vendorCommissionService.getVendorCommissionList(vendorCommissionRequest);
		RealGridListResponse response = new RealGridListResponse(vendorCommissionList, totalCount);
		
		return response;
	}
}