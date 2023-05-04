package com.enbiz.bo.app.controller.system;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.enbiz.bo.app.controller.BaseController;
import com.enbiz.bo.app.dto.request.system.StBatchLogRequest;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.dto.response.system.StBatchLogResponse;
import com.enbiz.bo.app.entity.StStdCd;
import com.enbiz.bo.app.service.code.CodeService;
import com.enbiz.bo.app.service.common.AdminCommonService;
import com.enbiz.bo.app.service.system.BatchLogService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 시스템 관리 / 배치 로그
 */
@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class BatchLogController extends BaseController {
	
	private final BatchLogService batchLogService;
	private final CodeService codeService;
	
	/**
	 * 배치로그 화면
	 *
	 * @param
	 * @return 배치로그 화면
	 * @throws
	 */
	@GetMapping("/system/batchLog.batchLogView.do")
	public String batchLogView(Model model) throws Exception {
		Map<String, List<StStdCd>> codeList = codeService.getStStdCd("CM008");
	      model.addAttribute("codeList", codeList);
	        
		return "views/system/batchLogView";
	}
	
	/**
	 * 배치로그 목록 조회
	 *
	 * @param
	 * @return
	 * @throws
	 */
	@GetMapping("/system/batchLog.getBatchLogList.do")
	@ResponseBody
	public RealGridListResponse getBatchLogList(StBatchLogRequest stBatchLogRequest) throws Exception {
		int totalCount = batchLogService.getBatchLogListCount(stBatchLogRequest);
		List<StBatchLogResponse> batchLogList = batchLogService.getBatchLogList(stBatchLogRequest);
		RealGridListResponse response = new RealGridListResponse(batchLogList, totalCount);
		
		return response;
	}
	
}