package com.enbiz.bo.app.controller.system;

import java.util.List;
import java.util.Map;

import org.springframework.context.annotation.Lazy;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.enbiz.bo.app.controller.BaseController;
import com.enbiz.bo.app.dto.ajax.JSONResponseEntity;
import com.enbiz.bo.app.dto.request.realgrid.RealGridCUDRequest;
import com.enbiz.bo.app.dto.request.system.HolidayMgmtRequest;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.dto.response.system.HolidayMgmtResponse;
import com.enbiz.bo.app.entity.StHoliInfo;
import com.enbiz.bo.app.entity.StStdCd;
import com.enbiz.bo.app.service.code.CodeService;
import com.enbiz.bo.app.service.system.HolidayMgmtService;
import com.enbiz.bo.base.annotation.RealGridCUD;
import com.enbiz.common.base.entity.BaseCommonEntity;
import com.enbiz.common.base.exception.MessageResolver;
import com.enbiz.common.base.util.ExcelUtils;

import groovy.util.logging.Slf4j;
import lombok.RequiredArgsConstructor;

/**
 * 시스템 관리
 */
@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class HolidayMgmtController extends BaseController {

	private final HolidayMgmtService holidayMgmtService;
	private final CodeService codeService;

	/**
	 * 휴일관리 화면 호출
	 *
	 * @return 휴일관리 html path
	 * @throws Exception
	 */
	@GetMapping("/system/holidayMgmt.holidayMgmtView.do")
	public String holidayMgmtView(Model model) throws Exception {
		Map<String, List<StStdCd>> codeList = codeService.getStStdCd("CM001,CM002");
		model.addAttribute("codeList", codeList);
		return "views/system/holidayMgmtView";
	}

	/**
	 * 휴일 목록 조회
	 *
	 * @params HolidayMgmtRequest
	 * @return RealGridListResponse
	 * @throws Exception
	 */
	@GetMapping(value = "/system/holidayMgmt.getHolidayList.do", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public RealGridListResponse getHolidayList(HolidayMgmtRequest req) throws Exception {
		int holidayListCount = holidayMgmtService.getHolidayListCount(req);
		List<HolidayMgmtResponse> holidayList = holidayMgmtService.getHolidayList(req);
		RealGridListResponse response = new RealGridListResponse(holidayList, holidayListCount);
		return response;
	}

	/**
	 * 휴일관리 CUD
	 *
	 * @param realGridRequest 신규, 수정, 삭제목록
	 * @return 성공 메시지
	 * @throws Exception
	 */
	@PostMapping("/system/holidayMgmt.saveHolidayList.do")
	@ResponseBody
	public JSONResponseEntity<Void> saveHolidayList(@RealGridCUD(type = StHoliInfo.class) RealGridCUDRequest<StHoliInfo> realGridCUD) throws Exception {
		List<StHoliInfo> createList = realGridCUD.getCreate(), updateList = realGridCUD.getUpdate(),deleteList = realGridCUD.getDelete();
		JSONResponseEntity<Void> jsonResponseEntity = new JSONResponseEntity<Void>(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
		try	{
			holidayMgmtService.saveHolidayList(createList, updateList, deleteList);
		} catch ( IllegalArgumentException e ) {
			// 공휴일자, 업무구분이 중복되는 경우
			jsonResponseEntity.setSucceeded(false);
			jsonResponseEntity.setMessage(e.getMessage());
		}
		return jsonResponseEntity;
	}

	/**
	 * 휴일 일괄등록 팝업 호출
	 *
	 * @param
	 * @return
	 * @throws Exception
	 */
	@GetMapping("/system/holidayMgmt.holidayRegistView.do")
	public String holidayRegistView(Model model) throws Exception {
		Map<String, List<StStdCd>> codeList = codeService.getStStdCd("CM001,CM002");
		model.addAttribute("codeList", codeList);
		return "views/popup/holidayRegistView";
	}

	/**
	 * 휴일 목록 엑셀 일괄 등록
	 *
	 * @param MultipartFile
	 * @return String
	 *
	 */
	@GetMapping(value = "/system/holidayMgmt.getHolidayListExcel.do")
	@ResponseBody
	public RealGridListResponse getHolidayListExcel(@RequestParam("holidayBatchFile") MultipartFile file)
	{
		String fileName = file.getOriginalFilename();
		String extension = fileName.substring(fileName.lastIndexOf(".") + 1);

		String[] columns = { "holiDt", "holiGbCd", "holiJobGbCd", "useYn" };
		List<? extends BaseCommonEntity> stHlList;

		if (extension.contains("csv")) {
			stHlList = ExcelUtils.extractCSVList(file, columns, StHoliInfo.class);
		} else if (extension.contains("xls")) {
			stHlList = ExcelUtils.extractExcelList(file, columns, StHoliInfo.class);
		} else {
			throw new IllegalArgumentException("Unsupported File Type : " + extension);
		}
		RealGridListResponse response = new RealGridListResponse(stHlList, stHlList.size());

		return response;
	}

	/**
	 * 휴일 일괄등록
	 * @param realGridCUD
	 * @return
	 * @throws Exception
	 */
	@GetMapping("/system/holidayMgmt.registHolidayExcelList.do")
	@ResponseBody
	public JSONResponseEntity<List<StHoliInfo>> registHolidayExcelList(@RealGridCUD(type = StHoliInfo.class) RealGridCUDRequest<StHoliInfo> realGridCUD) throws Exception {
		JSONResponseEntity<List<StHoliInfo>> jsonResponseEntity = new JSONResponseEntity<List<StHoliInfo>>(MessageResolver.getMessage("adminCommon.message.saved.successfully"),holidayMgmtService.registHolidayExcelList(realGridCUD.getCreate()));
		return jsonResponseEntity;
	}

}