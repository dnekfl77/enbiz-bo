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
import com.enbiz.bo.app.dto.request.payment.OpClmDcGdBaseRequest;
import com.enbiz.bo.app.dto.response.payment.OpClmDcGdBaseResponse;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.entity.OpClmDcGdBase;
import com.enbiz.bo.app.entity.StStdCd;
import com.enbiz.bo.app.service.code.CodeService;
import com.enbiz.bo.app.service.payment.ClaimDiscountGuideMgmtService;
import com.enbiz.common.base.exception.MessageResolver;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 청구할인안내 관리
 */
@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class ClaimDiscountGuideMgmtController extends BaseController {

	private final CodeService codeService;
	private final ClaimDiscountGuideMgmtService claimDiscountGuideMgmtService;

	/**
	 * 청구할인 안내관리 화면 호출
	 * 
	 * @return html path
	 * @throws Exception
	 */
	@GetMapping("/payment/ClaimDiscountGuideMgmt.claimDiscountGuideView.do")
	public String getClaimDiscountInfo(Model model) throws Exception {
		// OM028 : 매입사코드
		Map<String, List<StStdCd>> codeList = codeService.getStStdCd("OM028");
		model.addAttribute("codeList", codeList);

		// 가맹점 정보
		List<OpClmDcGdBaseResponse> mersList = claimDiscountGuideMgmtService.getMersList();
		model.addAttribute("mersList", mersList);
		return "views/payment/claimDiscountGuideView";
	}

	/**
	 * 청구할인 안내관리 목록 조회
	 * 
	 * @param opClmDcGdBaseRequest
	 * @return
	 * @throws Exception
	 */
	@GetMapping("/payment/ClaimDiscountGuideMgmt.getClaimDiscountGuide.do")
	@ResponseBody
	public RealGridListResponse getClaimDiscountInfoList(OpClmDcGdBaseRequest opClmDcGdBaseRequest) throws Exception {
		int totalCount = claimDiscountGuideMgmtService.getClaimDiscountInfoListCount(opClmDcGdBaseRequest);
		List<OpClmDcGdBaseResponse> claimDiscountList = claimDiscountGuideMgmtService.getClaimDiscountInfoList(opClmDcGdBaseRequest);
		RealGridListResponse response = new RealGridListResponse(claimDiscountList, totalCount);
		return response;
	}

	/**
	 * 청구할인 안내관리 등록/수정 화면 호출
	 * 
	 * @param model
	 * @param opClmDcGdBaseRequest
	 * @return
	 * @throws Exception
	 */
	@GetMapping("/payment/ClaimDiscountGuideMgmt.claimDiscountGuideSaveView.do")
	public String getClaimDiscountInfoUpdate(Model model, OpClmDcGdBaseRequest opClmDcGdBaseRequest) throws Exception {
		// OM028 : 매입사코드
		// MK005 : 정액정율구분코드
		Map<String, List<StStdCd>> codeList = codeService.getStStdCd("OM028,MK005");
		model.addAttribute("codeList", codeList);

		if (opClmDcGdBaseRequest.getArgInsertUpdate().equals("I")) { // 등록
			model.addAttribute("requestData", opClmDcGdBaseRequest);
		} else { // 수정
			OpClmDcGdBaseResponse base = claimDiscountGuideMgmtService.getClaimDiscountInfoDetail(opClmDcGdBaseRequest); // 청구할인안내기본
			base.setArgInsertUpdate(opClmDcGdBaseRequest.getArgInsertUpdate());
			model.addAttribute("requestData", base);
			model.addAttribute("mersList", null);

			OpClmDcGdBaseResponse mappingMersList = claimDiscountGuideMgmtService.getMappingMersList(opClmDcGdBaseRequest); // 청구할인안내가맹점정보
			model.addAttribute("mersList", mappingMersList);
		}

		return "views/payment/claimDiscountGuideSaveView";
	}

	/**
	 * 청구할인 안내관리 _ 적용기간 내 매입사 중복 여부 확인
	 * 
	 * @param opClmDcGdBaseRequest
	 * @return
	 * @throws Exception
	 */
	@PostMapping("/payment/ClaimDiscountGuideMgmt.getClaimDiscountAcqrCheck.do")
	@ResponseBody
	public JSONResponseEntity getClaimDiscountAcqrCheck(OpClmDcGdBaseRequest opClmDcGdBaseRequest) throws Exception {
		boolean result = claimDiscountGuideMgmtService.getAcqrCheck(opClmDcGdBaseRequest);
		JSONResponseEntity response = new JSONResponseEntity();
		response.setSucceeded(result);
		return response;
	}

	/**
	 * 청구할인 안내관리 저장
	 * 
	 * @param opClmDcGdBaseRequest
	 * @param opClmDcGdBase
	 * @return 성공 메시지
	 * @throws Exception
	 */
	@PostMapping("/payment/ClaimDiscountGuideMgmt.saveClaimDiscountGuide.do")
	@ResponseBody
	public JSONResponseEntity saveClaimDiscountDetail(OpClmDcGdBaseRequest opClmDcGdBaseRequest, OpClmDcGdBase opClmDcGdBase) throws Exception {
		claimDiscountGuideMgmtService.saveClaimDiscount(opClmDcGdBaseRequest, opClmDcGdBase);
		JSONResponseEntity jsonResponseEntity = new JSONResponseEntity(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
		return jsonResponseEntity;
	}

	/**
	 * 청구할인 안내관리 삭제
	 * 
	 * @param opClmDcGdBase
	 * @return 성공 메시지
	 * @throws Exception
	 */
	@PostMapping("/payment/ClaimDiscountGuideMgmt.deleteClaimDiscountGuide.do")
	@ResponseBody
	public JSONResponseEntity deleteClaimDiscount(OpClmDcGdBase opClmDcGdBase) throws Exception {
		claimDiscountGuideMgmtService.deleteOpClmDcGdBase(opClmDcGdBase);
		JSONResponseEntity jsonResponseEntity = new JSONResponseEntity(MessageResolver.getMessage("claimDiscountGuideMgmt.message.deleteSuccessfull"));
		return jsonResponseEntity;
	}
}
