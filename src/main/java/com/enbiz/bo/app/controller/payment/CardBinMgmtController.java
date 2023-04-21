package com.enbiz.bo.app.controller.payment;

import java.util.List;
import java.util.Map;

import org.springframework.context.annotation.Lazy;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.enbiz.bo.app.controller.BaseController;
import com.enbiz.bo.app.dto.ajax.JSONResponseEntity;
import com.enbiz.bo.app.dto.request.payment.OpCardBinInfoRequest;
import com.enbiz.bo.app.dto.request.realgrid.RealGridCUDRequest;
import com.enbiz.bo.app.dto.response.payment.OpCardBinInfoResponse;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.entity.OpCardBinInfo;
import com.enbiz.bo.app.entity.StStdCd;
import com.enbiz.bo.app.service.code.CodeService;
import com.enbiz.bo.app.service.payment.CardBinMgmtService;
import com.enbiz.bo.base.annotation.RealGridCUD;
import com.enbiz.common.base.exception.MessageResolver;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class CardBinMgmtController extends BaseController {

	private final CodeService codeService;
	private final CardBinMgmtService cardBinMgmtService;

	/**
	 *  카드Bin관리 화면 호출
	 * @return html path
	 * @throws Exception
	 */
	@GetMapping("/payment/cardBinMgmt.cardBinView.do")
	public String getCardBin(Model model) throws Exception{
		// OM027 : 발급사코드
		// OM033 : 회원구분코드
		// OM035 : 카드유형코드
		Map<String, List<StStdCd>> codeList = codeService.getStStdCd("OM027,OM033,OM035");
		model.addAttribute("codeList", codeList);
		return "views/payment/cardBinView";
	}

	/**
	 * 카드Bin목록 조회
	 * @param opCardBinInfoRequest
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/payment/cardBinMgmt.getCardBin.do", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public RealGridListResponse getCardBinList(OpCardBinInfoRequest opCardBinInfoRequest) throws Exception {
		int totalCount = cardBinMgmtService.getCardBinListCount(opCardBinInfoRequest);
		List<OpCardBinInfoResponse> cardBinList = cardBinMgmtService.getCardBinList(opCardBinInfoRequest);
		RealGridListResponse response = new RealGridListResponse(cardBinList, totalCount);
		return response;
	}
	
	/**
	 * 카드Bin관리 저장
	 *
	 * @param realGridCUD 신규, 수정, 삭제목록
	 * @return 성공 메시지
	 * @throws Exception
	 */
	@RequestMapping("/payment/cardBinMgmt.saveCardBin.do")
	@ResponseBody
	public JSONResponseEntity saveCardBinList(@RealGridCUD(type = OpCardBinInfo.class) RealGridCUDRequest<OpCardBinInfo> realGridCUD) throws Exception {
		List<OpCardBinInfo> createList = realGridCUD.getCreate(), updateList = realGridCUD.getUpdate(), deleteList = realGridCUD.getDelete();
		cardBinMgmtService.registCUD(createList, updateList, deleteList);
		JSONResponseEntity jsonResponseEntity = new JSONResponseEntity(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
		return jsonResponseEntity;
	}
	
	/**
	 * 카드Bin관리 > Bin번호 중복 여부 확인
	 * @param opCardBinInfoRequest
	 * @return
	 * @throws Exception
	 */
	@PostMapping(value = "/payment/cardBinMgmt.getCheckCardBinno.do", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public JSONResponseEntity checkCardBinno(OpCardBinInfoRequest opCardBinInfoRequest) throws Exception {
		boolean result = cardBinMgmtService.checkCardBinno(opCardBinInfoRequest);

		JSONResponseEntity response = new JSONResponseEntity();
		response.setSucceeded(result);
		return response;
	}
}
