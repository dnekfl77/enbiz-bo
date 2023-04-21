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

import com.enbiz.bo.app.controller.BaseController;
import com.enbiz.bo.app.dto.ajax.JSONResponseEntity;
import com.enbiz.bo.app.dto.request.payment.OpNintInstGdBaseRequest;
import com.enbiz.bo.app.dto.response.payment.OpNintInstGdBaseResponse;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.entity.OpNintInstGdBase;
import com.enbiz.bo.app.entity.StStdCd;
import com.enbiz.bo.app.service.code.CodeService;
import com.enbiz.bo.app.service.payment.NoInterestInstallmentGuideMgmtService;
import com.enbiz.common.base.exception.MessageResolver;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class NoInterestInstallmentGuideMgmtController extends BaseController {

	private final CodeService codeService;
	private final NoInterestInstallmentGuideMgmtService noInterestInstallmentGuideMgmtService;

	/**
	 * 무이자 할부 안내관리 화면 호출
	 * 
	 * @return html path
	 * @throws Exception
	 */
	@GetMapping("/payment/NoInterestInstallmentGuideMgmt.noInterestInstallmentGuideView.do")
	public String getInterestFreeInstallmentInfo(Model model) throws Exception {
		// OM028 : 매입사코드
		Map<String, List<StStdCd>> codeList = codeService.getStStdCd("OM028");
		model.addAttribute("codeList", codeList);

		// 가맹점 정보
		List<OpNintInstGdBaseResponse> mersList = noInterestInstallmentGuideMgmtService.getMersList();
		model.addAttribute("mersList", mersList);
		return "views/payment/noInterestInstallmentGuideView";
	}

	/**
	 * 무이자 할부 안내관리 목록 조회
	 * 
	 * @param opNintInstGdBaseRequest
	 * @return
	 * @throws Exception
	 */
	@GetMapping("/payment/NoInterestInstallmentGuideMgmt.getNoInterestInstallmentGuide.do")
	@ResponseBody
	public RealGridListResponse getInterestFreeInstallmentInfoList(OpNintInstGdBaseRequest opNintInstGdBaseRequest) throws Exception {
		int totalCount = noInterestInstallmentGuideMgmtService.getInterestFreeInstallmentInfoListCount(opNintInstGdBaseRequest);
		List<OpNintInstGdBaseResponse> interestFreeInstallmentInfoList = noInterestInstallmentGuideMgmtService
				.getInterestFreeInstallmentInfoList(opNintInstGdBaseRequest);
		RealGridListResponse response = new RealGridListResponse(interestFreeInstallmentInfoList, totalCount);
		return response;
	}

	/**
	 * 무이자 할부 안내관리 등록/수정 화면 호출
	 * 
	 * @param model
	 * @param opNintInstGdBaseRequest
	 * @return
	 * @throws Exception
	 */
	@GetMapping("/payment/NoInterestInstallmentGuideMgmt.noInterestInstallmentGuideSaveView.do")
	public String getInterestFreeInstallmentInfoUpdate(Model model, OpNintInstGdBaseRequest opNintInstGdBaseRequest) throws Exception {
		// OM028 : 매입사코드
		Map<String, List<StStdCd>> codeList = codeService.getStStdCd("OM028");
		model.addAttribute("codeList", codeList);

		if (opNintInstGdBaseRequest.getArgInsertUpdate().equals("I")) { // 등록
			model.addAttribute("requestData", opNintInstGdBaseRequest);
		} else { // 수정
			OpNintInstGdBaseResponse base = noInterestInstallmentGuideMgmtService.getInterestFreeInstallmentInfoDetail(opNintInstGdBaseRequest); // 무이자 할부 안내 기본
			base.setArgInsertUpdate(opNintInstGdBaseRequest.getArgInsertUpdate());
			model.addAttribute("requestData", base);
			model.addAttribute("monthList", null);
			model.addAttribute("mersList", null);

			List<OpNintInstGdBaseResponse> detailList = noInterestInstallmentGuideMgmtService.getDetailList(opNintInstGdBaseRequest); // 무이자 할부 안내 상세
			OpNintInstGdBaseResponse mappingMersList = noInterestInstallmentGuideMgmtService.getMappingMersList(opNintInstGdBaseRequest); // 무이자할부안내가맹점정보
			model.addAttribute("monthList", detailList);
			model.addAttribute("mersList", mappingMersList);
		}

		return "views/payment/noInterestInstallmentGuideSaveView";
	}

	/**
	 * 무이자 할부 안내관리 _ 가맹점 전체 목록 조회
	 * 
	 * @return
	 * @throws Exception
	 */
	@GetMapping(value = "/payment/NoInterestInstallmentGuideMgmt.getTotalMersList.do", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public RealGridListResponse getTotalMersList() throws Exception {
		int totalCount = noInterestInstallmentGuideMgmtService.getTotalMersListCount();
		List<OpNintInstGdBaseResponse> mersList = noInterestInstallmentGuideMgmtService.getTotalMersList();
		RealGridListResponse response = new RealGridListResponse(mersList, totalCount);
		return response;
	}

	/**
	 * 무이자 할부 안내관리 _ 적용기간 내 매입사 중복 여부 확인
	 * 
	 * @param opNintInstGdBaseRequest
	 * @return
	 * @throws Exception
	 */
	@PostMapping(value = "/payment/NoInterestInstallmentGuideMgmt.getAcqrCheck.do", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public JSONResponseEntity getAcqrCheck(OpNintInstGdBaseRequest opNintInstGdBaseRequest) throws Exception {
		boolean result = noInterestInstallmentGuideMgmtService.getAcqrCheck(opNintInstGdBaseRequest);
		JSONResponseEntity response = new JSONResponseEntity();
		response.setSucceeded(result);
		return response;
	}

	/**
	 * 무이자 할부 안내관리 저장
	 * 
	 * @param opNintInstGdBaseRequest
	 * @param opNintInstGdBase
	 * @return 성공 메시지
	 * @throws Exception
	 */
	@PostMapping("/payment/NoInterestInstallmentGuideMgmt.saveNoInterestInstallmentGuide.do")
	@ResponseBody
	public JSONResponseEntity saveFranchiseeInstallmentDetail(OpNintInstGdBaseRequest opNintInstGdBaseRequest, OpNintInstGdBase opNintInstGdBase)
			throws Exception {
		noInterestInstallmentGuideMgmtService.saveFranchiseeInstallment(opNintInstGdBaseRequest, opNintInstGdBase);
		JSONResponseEntity jsonResponseEntity = new JSONResponseEntity(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
		return jsonResponseEntity;
	}

	/**
	 * 무이자 할부 안내관리 삭제
	 * 
	 * @param opNintInstGdBase
	 * @return 성공 메시지
	 * @throws Exception
	 */
	@PostMapping("/payment/NoInterestInstallmentGuideMgmt.deleteNoInterestInstallmentGuide.do")
	@ResponseBody
	public JSONResponseEntity deleteFranchiseeInstallment(OpNintInstGdBase opNintInstGdBase) throws Exception {
		noInterestInstallmentGuideMgmtService.deleteFranchiseeInstallment(opNintInstGdBase);
		JSONResponseEntity jsonResponseEntity = new JSONResponseEntity(MessageResolver.getMessage("noInterestInstallmentGuideMgmt.message.deleteSuccessfull"));
		return jsonResponseEntity;
	}
}
