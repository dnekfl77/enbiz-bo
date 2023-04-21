package com.enbiz.bo.app.controller.delivery;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.context.annotation.Lazy;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.enbiz.bo.app.controller.BaseController;
import com.enbiz.bo.app.dto.request.delivery.FullOrderRequest;
import com.enbiz.bo.app.dto.response.delivery.FullOrderResponse;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.entity.StStdCd;
import com.enbiz.bo.app.service.code.CodeService;
import com.enbiz.bo.app.service.delivery.FullOrderInquiryService;
import com.enbiz.common.base.util.ExcelUtils;
import com.enbiz.common.base.util.ReflectionUtils;

import groovy.util.logging.Slf4j;
import lombok.RequiredArgsConstructor;
import net.sf.json.JSONArray;

/**
 * 전체주문조회
 */
@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class FullOrderInquiryListController extends BaseController {

//	private final getFullOrderInquiryListService getFullOrderInquiryListService;
	private final FullOrderInquiryService fullOrderInquiryService;
//	private final DeliveryInquiryService deliveryInquiryService;
//	private final IndividualSendInstructService individualSendInstructService;
	private final CodeService codeService;
	private final Environment env;
//
//	/**
//	 * 배송지역관리 화면 호출
//	 *
//	 * @return html path
//	 * @throws Exception
//	 */
//	@RequestMapping("/delivery/deliveryMgmt.deliveryRegnZipList.do")
//	public String deliveryRegnZipList(Model model) {
//		Map<String, List<StStdCd>> codeList = codeService.getStStdCd("PR023");
//		List<String> regnGripList = getFullOrderInquiryListService.getRgnGrpList();
//		model.addAttribute("codeList", codeList);
//		model.addAttribute("regnGripList", regnGripList);
//
//		return "views/delivery/deliveryRegnZipList";
//	}
//
//	/**
//	 * 배송지역별 우편번호 목록 조회 - 우측 grid
//	 *
//	 * @param etDeliRegnByZipCdRequest
//	 * @return realGridListResponse
//	 * @throws Exception
//	 */
//	@RequestMapping(value = "/delivery/deliveryMgmt.getDeliRegnByZipCdList.do", produces = "application/json;charset=UTF-8")
//	@ResponseBody
//	@RealGridSearch
//	public String getDeliRegnByZipCdList(EtDeliRegnByZipCdRequest etDeliRegnByZipCdRequest) throws Exception {
//		int totalCount = getFullOrderInquiryListService.getDeliRegnByZipCdListCount(etDeliRegnByZipCdRequest);
//		List<EtDeliRegnByZipCdResponse> deliRegnByZipCdList = getFullOrderInquiryListService
//				.getDeliRegnByZipCdList(etDeliRegnByZipCdRequest);
//		RealGridListResponse response = new RealGridListResponse(deliRegnByZipCdList, totalCount);
//
//		return response.toJsonString();
//	}
//
//	/**
//	 * 지역별 우편번호 목록 조회 - 좌측 grid
//	 *
//	 * @param etDeliRegnByZipCdRequest
//	 * @return realGridListResponse
//	 * @throws Exception
//	 */
//	@RequestMapping(value = "/delivery/deliveryMgmt.getRegnPostNoList.do", produces = "application/json;charset=UTF-8")
//	@ResponseBody
//	@RealGridSearch
//	public String getRegnPostNoList(EtDeliRegnByZipCdRequest etDeliRegnByZipCdRequest) throws Exception {
//		int totalCount = getFullOrderInquiryListService.getRegnPostNoListCount(etDeliRegnByZipCdRequest);
//		List<EtDeliRegnByZipCdResponse> regnByZipCdList = getFullOrderInquiryListService
//				.getRegnPostNoList(etDeliRegnByZipCdRequest);
//		RealGridListResponse response = new RealGridListResponse(regnByZipCdList, totalCount);
//
//		return response.toJsonString();
//	}
//
//	/**
//	 * 배송지역 등록, 삭제
//	 *
//	 * @param realGridCUD
//	 * @return ResponseEntity<String>
//	 * @throws Exception
//	 */
//	@PostMapping(value = "/delivery/deliveryMgmt.cdDeliRegnByZipCd.do", produces = MediaType.APPLICATION_JSON_VALUE)
//	@RealGridCUDResponse
//	@ResponseBody
//	public JSONResponseEntity cudDeliRgnZipNoList(
//			@RealGridCUD(type = EtDeliRegnByZipCdCudRequest.class) RealGridCUDRequest<EtDeliRegnByZipCdCudRequest> realGridCUD)
//			throws Exception {
//		List<EtDeliRegnByZipCdCudRequest> createList = realGridCUD.getCreate(), deleteList = realGridCUD.getDelete();
//		getFullOrderInquiryListService.registCUD(createList, deleteList);
//
//		JSONResponseEntity jsonResponseEntity = new JSONResponseEntity(
//				MessageResolver.getMessage("adminCommon.message.saved.successfully"));
//
//		return jsonResponseEntity;
//	}
//
	/**
	 * 전체주문조회 화면 호출
	 * 
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@GetMapping("/delivery/fullOrderInquiryList.fullOrderInquiryListView.do")
	public String fullOrderInquiryList(Model model) throws Exception {
		// OM007 : 주문매체코드 / ordMediaCd
		// PR003 : 판매방식코드 / saleMethCd
		// OM005 : 주문내역상태코드 / ordDtlStatCd
		// PR008 : 배송처리유형코드 / deliProcTypCd
		// PR009 : 배송수단코드 / deliWayCd
		Map<String, List<StStdCd>> codeList = codeService.getStStdCd("OM005,OM007,PR003,PR008,PR009");
		model.addAttribute("codeList", codeList);
		model.addAttribute("nonMembersNumber", env.getProperty("delivery.nonMembersNumber"));
		return "views/delivery/fullOrderInquiryListView";
	}

	/**
	 * 전체주문조회 목록 조회
	 * 
	 * @param fullOrderRequest
	 * @return realGridListResponse
	 * @throws Exception
	 */
	@GetMapping(value = "/delivery/fullOrderInquiryList.getFullOrderInquiryList.do")
	@ResponseBody
	public RealGridListResponse getFullOrderInquiryList(FullOrderRequest fullOrderRequest) throws Exception {
		fullOrderRequest.setUmem(env.getProperty("delivery.nonMembersNumber"));
		int totalCount = fullOrderInquiryService.getFullOrderInquiryListCount(fullOrderRequest);
		List<FullOrderResponse> fullOrderList = fullOrderInquiryService.getFullOrderInquiryList(fullOrderRequest);
		RealGridListResponse response = new RealGridListResponse(fullOrderList, totalCount);
		return response;
	}

	/**
	 * 엑셀 다운로드 _ 전체주문조회 목록 조회
	 * 
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@GetMapping("/delivery/fullOrderInquiryList.fullOrderInquiryExcelDownload.do")
	public void getDlvOrdExcelDownload(HttpServletResponse response, FullOrderRequest fullOrderRequest)
			throws Exception {
		String strExcelHeader = fullOrderRequest.getExcelHeader().replaceAll("&quot;", "\"");
		List<Map<String, Object>> titles = JSONArray.fromObject(strExcelHeader);
		List<Map<String, Object>> convertFullOrders = ReflectionUtils.convertToMaps(fullOrderInquiryService.getExcelFullOrderInquiryList(fullOrderRequest));

		// 마스킹 데이터 가공
		for (Map<String, Object> data : convertFullOrders) {
			String formattingValue = "";
			if (data.get("mbrNo").equals(env.getProperty("delivery.nonMembersNumber"))) { // 비회원인 경우
				formattingValue += data.get("umemCellSctNo") == null || data.get("umemCellSctNo").toString().equals("")
						? ""
						: data.get("umemCellSctNo").toString() + "-";
				formattingValue += data.get("umemCellTxnoNo") == null
						|| data.get("umemCellTxnoNo").toString().equals("") ? ""
								: data.get("umemCellTxnoNo").toString() + "-";
				formattingValue += data.get("umemCellEndNo") == null || data.get("umemCellEndNo").toString().equals("")
						? ""
						: data.get("umemCellEndNo").toString();
				data.put("ordManTel", formattingValue);
			} else { // 회원인 경우
				formattingValue += data.get("cellSctNo") == null || data.get("cellSctNo").toString().equals("") ? ""
						: data.get("cellSctNo").toString() + "-";
				formattingValue += data.get("cellTxnoNo") == null || data.get("cellTxnoNo").toString().equals("") ? ""
						: data.get("cellTxnoNo").toString() + "-";
				formattingValue += data.get("cellEndNo") == null || data.get("cellEndNo").toString().equals("") ? ""
						: data.get("cellEndNo").toString();
				data.put("ordManTel", formattingValue);
			}

			formattingValue = "";
			formattingValue += data.get("rcvmnCellSctNo") == null || data.get("rcvmnCellSctNo").toString().equals("")
					? ""
					: data.get("rcvmnCellSctNo").toString() + "-";
			formattingValue += data.get("rcvmnCellTxnoNo") == null || data.get("rcvmnCellTxnoNo").toString().equals("")
					? ""
					: data.get("rcvmnCellTxnoNo").toString() + "-";
			formattingValue += data.get("rcvmnCellEndNo") == null || data.get("rcvmnCellEndNo").toString().equals("")
					? ""
					: data.get("rcvmnCellEndNo").toString();
			data.put("rcvmnTel", formattingValue);

			formattingValue = "";
			formattingValue += data.get("zipAddr") == null || data.get("zipAddr").toString().equals("") ? ""
					: data.get("zipAddr").toString() + " ";
			formattingValue += data.get("dtlAddr") == null || data.get("dtlAddr").toString().equals("") ? ""
					: data.get("dtlAddr").toString();
			data.put("addr", formattingValue);
		}

		// 엑셀 공통함수 호출
		ExcelUtils.createExcelToResponse(convertFullOrders // 보내주는 데이터
				, titles // 해더
				, String.format("%s-%s", "fullOrder", LocalDate.now().toString()) // 엑셀파일 명칭
				, "전체주문조회" // 시트명칭
				, response);
	}

//	/**
//	 * 배송조회 화면 호출
//	 * 
//	 * @param model
//	 * @return
//	 * @throws Exception
//	 */
//	@GetMapping("/delivery/getFullOrderInquiryList.deliveryInquiryList.do")
//	public String deliveryInquiryList(Model model) throws Exception {
//		// LO003 : 배송진행상태코드 / deliPrgsStatCd
//		// LO002 : 배송유형코드 / deliTypCd
//		// PR010 : 배송상품구분코드 / deliGoodsGbCd
//		// PR008 : 배송처리유형코드 / deliProcTypCd
//		// PR009 : 배송수단코드 / deliWayCd
//		Map<String, List<StStdCd>> codeList = codeService.getStStdCd("LO003,LO002,PR010,PR008,PR009");
//		model.addAttribute("codeList", codeList);
//		return "views/delivery/deliveryInquiryList";
//	}
//
//	/**
//	 * 배송조회 목록 조회
//	 * 
//	 * @param deliveryRequest
//	 * @return realGridListResponse
//	 * @throws Exception
//	 */
//	@RequestMapping(value = "/delivery/getFullOrderInquiryList.getDeliveryInquiryList.do", produces = MediaType.APPLICATION_JSON_VALUE)
//	@ResponseBody
//	@RealGridSearch
//	public String getDeliveryInquiryList(DeliveryRequest deliveryRequest) throws Exception {
//		int totalCount = deliveryInquiryService.getDeliveryInquiryListCount(deliveryRequest);
//		List<DeliveryResponse> sendInstructList = deliveryInquiryService.getDeliveryInquiryList(deliveryRequest);
//		RealGridListResponse response = new RealGridListResponse(sendInstructList, totalCount);
//		return response.toJsonString();
//	}
//
//	/**
//	 * 엑셀 다운로드 _ 배송조회 목록 조회
//	 * 
//	 * @param response
//	 * @return
//	 * @throws Exception
//	 */
//	@GetMapping("/delivery/getFullOrderInquiryList.getDeliveryExcelDownload.do")
//	public void getDeliveryExcelDownload(HttpServletResponse response, DeliveryRequest deliveryRequest)
//			throws Exception {
//		List<Map<String, Object>> titles = JSONArray.fromObject(deliveryRequest.getExcelHeader());
//		List<Map<String, Object>> convertFullOrders = ReflectionUtil
//				.convertToMaps(deliveryInquiryService.getExcelDeliveryInquiryList(deliveryRequest));
//
//		// 마스킹 데이터 가공
//		for (Map<String, Object> data : convertFullOrders) {
//			String formattingValue = "";
//
//			formattingValue += data.get("rcvmnTelRgnNo") == null || data.get("rcvmnTelRgnNo").toString().equals("") ? ""
//					: data.get("rcvmnTelRgnNo").toString() + "-";
//			formattingValue += data.get("rcvmnTelTxnoNo") == null || data.get("rcvmnTelTxnoNo").toString().equals("")
//					? ""
//					: data.get("rcvmnTelTxnoNo").toString() + "-";
//			formattingValue += data.get("rcvmnTelEndNo") == null || data.get("rcvmnTelEndNo").toString().equals("") ? ""
//					: data.get("rcvmnTelEndNo").toString();
//			data.put("rcvmnTel", formattingValue);
//
//			formattingValue = "";
//			formattingValue += data.get("rcvmnCellSctNo") == null || data.get("rcvmnCellSctNo").toString().equals("")
//					? ""
//					: data.get("rcvmnCellSctNo").toString() + "-";
//			formattingValue += data.get("rcvmnCellTxnoNo") == null || data.get("rcvmnCellTxnoNo").toString().equals("")
//					? ""
//					: data.get("rcvmnCellTxnoNo").toString() + "-";
//			formattingValue += data.get("rcvmnCellEndNo") == null || data.get("rcvmnCellEndNo").toString().equals("")
//					? ""
//					: data.get("rcvmnCellEndNo").toString();
//			data.put("rcvmnCell", formattingValue);
//
//			formattingValue = "";
//			formattingValue += data.get("zipAddr") == null || data.get("zipAddr").toString().equals("") ? ""
//					: data.get("zipAddr").toString() + " ";
//			formattingValue += data.get("dtlAddr") == null || data.get("dtlAddr").toString().equals("") ? ""
//					: data.get("dtlAddr").toString();
//			data.put("addr", formattingValue);
//		}
//
//		// 엑셀 공통함수 호출
//		ExcelUtils.createExcelToResponse(convertFullOrders // 보내주는 데이터
//				, titles // 해더
//				, String.format("%s-%s", "delivery", LocalDate.now().toString()) // 엑셀파일 명칭
//				, "배송조회" // 시트명칭
//				, response);
//	}
//
//	/**
//	 * 배송조회 배송상세내역 팝업 호출
//	 * 
//	 * @param model
//	 * @return
//	 * @throws Exception
//	 */
//	@GetMapping("/delivery/getFullOrderInquiryList.deliveryDetailPopup.do")
//	public String deliveryDetailPopup(Model model, DeliveryRequest deliveryRequest) throws Exception {
//		DeliveryResponse deliveryResponse = deliveryInquiryService.getDeliveryDetail(deliveryRequest);
//
//		// 마스킹 컬럼 셋팅
//		String formattingValue = "";
//		String rcvmnTelRgnNo = deliveryResponse.getRcvmnTelRgnNo();
//		String rcvmnTelTxnoNo = deliveryResponse.getRcvmnTelTxnoNo();
//		String rcvmnTelEndNo = deliveryResponse.getRcvmnTelEndNo();
//		formattingValue += rcvmnTelRgnNo == null || rcvmnTelRgnNo.equals("") ? "" : rcvmnTelRgnNo + "-";
//		formattingValue += rcvmnTelTxnoNo == null || rcvmnTelTxnoNo.equals("") ? "" : rcvmnTelTxnoNo + "-";
//		formattingValue += rcvmnTelEndNo == null || rcvmnTelEndNo.equals("") ? "" : rcvmnTelEndNo;
//		deliveryResponse.setRcvmnTel(formattingValue);
//
//		formattingValue = "";
//		String rcvmnCellSctNo = deliveryResponse.getRcvmnCellSctNo();
//		String rcvmnCellTxnoNo = deliveryResponse.getRcvmnCellTxnoNo();
//		String rcvmnCellEndNo = deliveryResponse.getRcvmnCellEndNo();
//		formattingValue += rcvmnCellSctNo == null || rcvmnCellSctNo.equals("") ? "" : rcvmnCellSctNo + "-";
//		formattingValue += rcvmnCellTxnoNo == null || rcvmnCellTxnoNo.equals("") ? "" : rcvmnCellTxnoNo + "-";
//		formattingValue += rcvmnCellEndNo == null || rcvmnCellEndNo.equals("") ? "" : rcvmnCellEndNo;
//		deliveryResponse.setRcvmnCell(formattingValue);
//
//		formattingValue = "";
//		String zipAddr = deliveryResponse.getZipAddr();
//		String dtlAddr = deliveryResponse.getDtlAddr();
//		formattingValue += zipAddr == null || zipAddr.equals("") ? "" : zipAddr + " ";
//		formattingValue += dtlAddr == null || dtlAddr.equals("") ? "" : dtlAddr;
//		deliveryResponse.setAddr(formattingValue);
//
//		model.addAttribute("deliveryDetail", deliveryResponse);
//		return "views/delivery/deliveryDetailPopup";
//	}
//
//	/**
//	 * 배송조회 배송상세내역_상품내역 목록 조회
//	 * 
//	 * @param deliveryRequest
//	 * @return realGridListResponse
//	 * @throws Exception
//	 */
//	@RequestMapping(value = "/delivery/getFullOrderInquiryList.getDeliveryGoodsList.do", produces = MediaType.APPLICATION_JSON_VALUE)
//	@ResponseBody
//	@RealGridSearch
//	public String getDeliveryGoodsList(DeliveryRequest deliveryRequest) throws Exception {
//		int totalCount = deliveryInquiryService.getDeliveryGoodsListCount(deliveryRequest);
//		List<DeliveryResponse> sendInstructList = deliveryInquiryService.getDeliveryGoodsList(deliveryRequest);
//		RealGridListResponse response = new RealGridListResponse(sendInstructList, totalCount);
//		return response.toJsonString();
//	}
//
//	/**
//	 * 개별발송지시 화면 호출
//	 * 
//	 * @param model
//	 * @return
//	 * @throws Exception
//	 */
//	@GetMapping("/delivery/getFullOrderInquiryList.individualSendInstructList.do")
//	public String individualSendInstructList(Model model) throws Exception {
//		// PR003 : 판매방식코드 / saleMethCd
//		// PR008 : 배송처리유형코드 / deliProcTypCd
//		Map<String, List<StStdCd>> codeList = codeService.getStStdCd("PR003,PR008");
//		model.addAttribute("codeList", codeList);
//		model.addAttribute("nonMembersNumber", env.getProperty("delivery.nonMembersNumber"));
//		return "views/delivery/individualSendInstructList";
//	}
//
//	/**
//	 * 개별발송지시 목록 조회
//	 * 
//	 * @param individualSendInstructRequest
//	 * @return realGridListResponse
//	 * @throws Exception
//	 */
//	@RequestMapping(value = "/delivery/getFullOrderInquiryList.getIndividualSendInstructList.do", produces = MediaType.APPLICATION_JSON_VALUE)
//	@ResponseBody
//	@RealGridSearch
//	public String getIndividualSendInstructList(IndividualSendInstructRequest individualSendInstructRequest)
//			throws Exception {
//		int totalCount = individualSendInstructService
//				.getIndividualSendInstructListCount(individualSendInstructRequest);
//		List<IndividualSendInstructResponse> sendInstructList = individualSendInstructService
//				.getIndividualSendInstructList(individualSendInstructRequest);
//		RealGridListResponse response = new RealGridListResponse(sendInstructList, totalCount);
//		return response.toJsonString();
//	}
//
//	/**
//	 * 발송지시 _ 주문상세 업데이트, 주문상세상태변경이력 입력, 배송기본 입력, 배송상세 입력
//	 * 
//	 * @param individualSendInstructRequest
//	 * @return
//	 * @throws Exception
//	 */
//	@PostMapping(value = "/delivery/getFullOrderInquiryList.sendInstruct.do", produces = MediaType.APPLICATION_JSON_VALUE)
//	@ResponseBody
//	public JSONResponseEntity sendInstruct(IndividualSendInstructRequest individualSendInstructRequest)
//			throws Exception {
//		individualSendInstructService.sendInstruct(individualSendInstructRequest);
//		JSONResponseEntity response = new JSONResponseEntity();
//		response.setSucceeded(true);
//		return response;
//	}

}