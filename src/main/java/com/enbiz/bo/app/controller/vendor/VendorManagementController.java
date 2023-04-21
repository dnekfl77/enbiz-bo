package com.enbiz.bo.app.controller.vendor;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.enbiz.bo.app.constant.Constants;
import com.enbiz.bo.app.controller.BaseController;
import com.enbiz.bo.app.dto.ajax.JSONResponseEntity;
import com.enbiz.bo.app.dto.code.CodeReqDto;
import com.enbiz.bo.app.dto.request.realgrid.RawRealGridCUDRequest;
import com.enbiz.bo.app.dto.request.realgrid.RealGridCUDRequest;
import com.enbiz.bo.app.dto.request.vendor.CooperateAndOthersRequest;
import com.enbiz.bo.app.dto.request.vendor.CooperateSearchRequest;
import com.enbiz.bo.app.dto.request.vendor.PartnerSearchRequest;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.dto.response.vendor.CooperateAndOthersResponse;
import com.enbiz.bo.app.dto.response.vendor.CooperateResponse;
import com.enbiz.bo.app.dto.response.vendor.CooperateSearchResponse;
import com.enbiz.bo.app.dto.response.vendor.PartnerDeliveryPolicySearchResponse;
import com.enbiz.bo.app.dto.response.vendor.PartnerSearchResponse;
import com.enbiz.bo.app.entity.CcChlBase;
import com.enbiz.bo.app.entity.CcChlDtlInfo;
import com.enbiz.bo.app.entity.EtDeliPolcBase;
import com.enbiz.bo.app.entity.EtEntrBase;
import com.enbiz.bo.app.entity.StStdCd;
import com.enbiz.bo.app.enums.common.MIXEDCODE;
import com.enbiz.bo.app.service.code.CodeService;
import com.enbiz.bo.app.service.common.AdminCommonService;
import com.enbiz.bo.app.service.vendor.EtDeliPolcBaseService;
import com.enbiz.bo.app.service.vendor.VendorManagementService;
import com.enbiz.bo.base.annotation.RawRealGridCUD;
import com.enbiz.bo.base.annotation.RealGridCUD;
import com.enbiz.common.base.Validator;
import com.enbiz.common.base.exception.MessageResolver;

import groovy.util.logging.Slf4j;
import lombok.RequiredArgsConstructor;

/**
 * 협력사 관리
 */
@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class VendorManagementController extends BaseController {

	
	private final AdminCommonService adminCommonService;
	private final VendorManagementService vendorManagementService;
	private final EtDeliPolcBaseService etDeliPolcBaseService;
	private final CodeService codeService;

	/**
	 * 협력사관리 화면 호출
	 */
	@RequestMapping("/vendor/vendorMgmt.partnerView.do")
	public String getPartnerView(Model model) throws Exception {
		Map<String, List<StStdCd>> codeList = codeService.getStStdCd("VD003,VD002");
		model.addAttribute("codeList", codeList);

		return "views/vendor/partnerListView";
	}

	@RequestMapping(value = "/vendor/vendorMgmt.partnerListView.do", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public RealGridListResponse getPartnerListView(PartnerSearchRequest partnerSearchRequest) throws Exception {
		int totalCount = vendorManagementService.getPartnerSearchListCount(partnerSearchRequest);
		List<PartnerSearchResponse> partnerSearchResponseList = vendorManagementService.getPartnerSearchList(partnerSearchRequest);
		RealGridListResponse response = new RealGridListResponse(partnerSearchResponseList, totalCount);
		return response;
	}

	/**
	 * 배송비 관리 화면
	 */
	@RequestMapping("/vendor/vendorMgmt.deliveryPolicyView.do")
	public String getDeliveryPolicyView(Model model) throws Exception {
		Map<String, List<StStdCd>> codeList = codeService.getStStdCd("VD005");
		model.addAttribute("codeList", codeList);

		return "views/vendor/deliveryPolicyListView";
	}

	/**
	 * 배송비 관리 조회
	 */
	@RequestMapping(value = "/vendor/vendorMgmt.deliveryPolicyListView.do", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public RealGridListResponse getDeliveryPolicyListView(PartnerSearchRequest partnerSearchRequest) throws Exception {
		int totalCount = vendorManagementService.getDeliveryPolicySearchListCount(partnerSearchRequest);
		List<PartnerDeliveryPolicySearchResponse> partnerDeliveryPolicySearchResponseList = vendorManagementService.getDeliveryPolicySearchList(partnerSearchRequest);
		RealGridListResponse response = new RealGridListResponse(partnerDeliveryPolicySearchResponseList, totalCount);
		return response;
	}

	/**
	 * 배송비 관리 저장
	 */
	@PostMapping("/vendor/vendorMgmt.saveEtDeliPolcBase.do")
	@ResponseBody
	public JSONResponseEntity saveEtDeliPolcBase(
			@RealGridCUD(type = EtDeliPolcBase.class) RealGridCUDRequest<EtDeliPolcBase> realGridCUD)
			throws Exception {

		List<EtDeliPolcBase> createList = realGridCUD.getCreate(), updateList = realGridCUD.getUpdate(),
				deleteList = realGridCUD.getDelete();

		etDeliPolcBaseService.registCUD(createList, updateList, deleteList);

		JSONResponseEntity jsonResponseEntity = new JSONResponseEntity(
				MessageResolver.getMessage("adminCommon.message.saved.successfully"));

		return jsonResponseEntity;
	}

	/**
	 * 제휴사 관리 뷰
	 */
	@RequestMapping("/vendor/cooperateMgmtView.do")
	public String getCooperateMgmtView(Model model) throws Exception {
		Map<String, List<StStdCd>> codeList =
				codeService.getStStdCd("VD003");
		model.addAttribute("codeList", codeList);

		return "views/vendor/cooperateMgmtView";
	}

	/**
	 * 제휴사 조회
	 */
	@RequestMapping(value = "/vendor/getCooperateByConditionView.do", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public RealGridListResponse getCooperateByConditionView(CooperateSearchRequest cooperateSearchRequest) throws Exception {
		int totalCount = vendorManagementService.getCooperateSearchListCount(cooperateSearchRequest);
		List<CooperateSearchResponse> cooperateSearchList = vendorManagementService.getCooperateSearchList(cooperateSearchRequest);
		RealGridListResponse response = new RealGridListResponse(cooperateSearchList, totalCount);
		return response;
	}

	/**
	 * 제휴사 등록/수정 뷰
	 */
	@RequestMapping(value = "/popup/cooperateAndOthersPopupView.do")
	public String viewCooperateAndOthersPopup(Model model, CooperateAndOthersRequest cooperateAndOthersRequest)
			throws Exception {

		Map<String, List<StStdCd>> codeList =
				codeService.getStStdCd("VD003,VD002,VD004,VD005,VD006,VD007");

		model.addAttribute("codeList", codeList);

		if (StringUtils.equals("U", cooperateAndOthersRequest.getMode())) {
			CooperateAndOthersResponse cooperateAndOthersResponse =
					vendorManagementService.getCooperateAndOthersByEntrNo(cooperateAndOthersRequest);

			CooperateResponse cooperateResponse = cooperateAndOthersResponse;

			RealGridListResponse cooperateEmployeeList =
					new RealGridListResponse(cooperateAndOthersResponse.getCooperateEmployeeList(),
							cooperateAndOthersResponse.getCooperateEmployeeList().size());

			model.addAttribute("requestInfo", cooperateAndOthersRequest);
			model.addAttribute("cooperateInfo", cooperateResponse);
			model.addAttribute("cooperateEmployeeList", cooperateEmployeeList);
		} else {
			model.addAttribute("requestInfo", cooperateAndOthersRequest);
			model.addAttribute("cooperateInfo", null);
			model.addAttribute("cooperateEmployeeList", null);
		}

		return "views/popup/cooperateAndOthersPopup";

	}

	@PostMapping("/popup/saveCooperateWithOtherData.do")
	@ResponseBody
	public JSONResponseEntity saveCooperateWithOtherData(@RawRealGridCUD RawRealGridCUDRequest rawCUDRequest,
															 EtEntrBase etEntrBase) throws Exception {

		//1. parameter check!!
		cooperateValidatorCheck(etEntrBase);
		vendorManagementService.saveCooperateWithOtherData(rawCUDRequest, etEntrBase);

		JSONResponseEntity jsonResponseEntity = new JSONResponseEntity(
				MessageResolver.getMessage("adminCommon.message.saved.successfully"));

		return jsonResponseEntity;
	}

	private void cooperateValidatorCheck(EtEntrBase etEntrBase) throws Exception {
		Validator.throwIfEmpty(etEntrBase.getEntrNm()
				, MessageResolver.getMessage(Constants.MSG_COMMON_PARAMETER_EMPTY_ERROR
						, new String[] {"EntrNm"}));
	}

	/**
	 * 제휴채널 관리 뷰
	 */
	@RequestMapping("/vendor/cooperateChannelView.do")
	public String getCooperateChannelView(Model model) throws Exception {
		List<CodeReqDto> requestDtoList = new ArrayList<CodeReqDto>();

		CodeReqDto reqCode = new CodeReqDto();
		reqCode.setCode("CH001,CH002");
		reqCode.setReferCode("");
		reqCode.setType(MIXEDCODE.NORMAL_MULTI_CODE.getCd());	//normal
		requestDtoList.add(reqCode);

		CodeReqDto reqSiteBase = new CodeReqDto();
		reqSiteBase.setCode("SITE");
		reqSiteBase.setReferCode("CC_SITE_BASE");
		reqSiteBase.setType(MIXEDCODE.TABLE.getCd());	//table
		requestDtoList.add(reqSiteBase);

		model.addAttribute("codeList", codeService.getForwardCdCdNmByMixedCode(requestDtoList));

		return "views/vendor/cooperateChannelListView";
	}

	@GetMapping(value = "/vendor/getStStdCdByMixedCodeRef1Val.do", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public JSONResponseEntity getStStdCdByMixedCodeRef1ValForVendor(CodeReqDto CodeReqDto) throws Exception {
		CodeReqDto.setType(MIXEDCODE.REFER_CODE.getCd());

		JSONResponseEntity response = new JSONResponseEntity();

		response.setSucceeded(true);
		response.setData(codeService.getForwardCdCdNmFromStStdCdByGrpCdRef1Val(CodeReqDto));

		return response;
	}

	@RequestMapping(value = "/vendor/cooperateChannelListView.do", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public RealGridListResponse getCooperateChannelListView(CooperateSearchRequest cooperateSearchRequest) throws Exception {
		int totalCount = vendorManagementService.getCooperateChannelSearchListCount(cooperateSearchRequest);
		List<CooperateSearchResponse> cooperateSearchList = vendorManagementService.getCooperateChannelSearchList(cooperateSearchRequest);
		RealGridListResponse response = new RealGridListResponse(cooperateSearchList, totalCount);
		return response;
	}

	@RequestMapping(value = "/vendor/getCcChlBaseByEntrNo.do", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public RealGridListResponse getCcChlBaseByEntrNo(CcChlBase ccChlBase) throws Exception {
		int totalCount = vendorManagementService.getCcChlBaseByEntrNoCount(ccChlBase.getEntrNo());
		List<CcChlBase> listData = vendorManagementService.getCcChlBaseByEntrNoList(ccChlBase.getEntrNo());
		RealGridListResponse response = new RealGridListResponse(listData, totalCount);
		return response;
	}

	@PostMapping("/vendor/saveCcChlBase.do")
	@ResponseBody
	public JSONResponseEntity saveCcChlBase(@RealGridCUD(type = CcChlBase.class)
																	 RealGridCUDRequest<CcChlBase> realGridCUD)
			throws Exception {

		List<CcChlBase> createList = realGridCUD.getCreate(), updateList = realGridCUD.getUpdate(),
				deleteList = realGridCUD.getDelete();
		vendorManagementService.saveCcChlBase(createList, updateList, deleteList);

		JSONResponseEntity jsonResponseEntity = new JSONResponseEntity(
				MessageResolver.getMessage("adminCommon.message.saved.successfully"));

		return jsonResponseEntity;

	}

	@RequestMapping(value = "/vendor/getCcChlDtlInfoByChlNo.do", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public RealGridListResponse getCcChlDtlInfoByChlNo(CcChlDtlInfo ccChlDtlInfo) throws Exception {
		int totalCount = vendorManagementService.getCcChlDtlInfoByChlNoCount(ccChlDtlInfo.getChlNo());
		List<CcChlDtlInfo> listData = vendorManagementService.getCcChlDtlInfoByChlNoList(ccChlDtlInfo.getChlNo());
		RealGridListResponse response = new RealGridListResponse(listData, totalCount);
		return response;
	}

	@PostMapping("/vendor/saveCcChlDtlInfo.do")
	@ResponseBody
	public JSONResponseEntity saveCcChlDtlInfo(@RealGridCUD(type = CcChlDtlInfo.class)
																	 RealGridCUDRequest<CcChlDtlInfo> realGridCUD)
			throws Exception {

		List<CcChlDtlInfo> createList = realGridCUD.getCreate(), updateList = realGridCUD.getUpdate(),
				deleteList = realGridCUD.getDelete();
		vendorManagementService.saveCcChlDtlInfo(createList, updateList, deleteList);

		JSONResponseEntity jsonResponseEntity = new JSONResponseEntity(
				MessageResolver.getMessage("adminCommon.message.saved.successfully"));

		return jsonResponseEntity;

	}

}