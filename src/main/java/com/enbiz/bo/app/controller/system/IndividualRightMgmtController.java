package com.enbiz.bo.app.controller.system;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.context.annotation.Lazy;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.enbiz.bo.app.controller.BaseController;
import com.enbiz.bo.app.dto.ajax.JSONResponseEntity;
import com.enbiz.bo.app.dto.request.realgrid.RealGridCUDRequest;
import com.enbiz.bo.app.dto.request.system.IndividualRtInfoRequest;
import com.enbiz.bo.app.dto.request.system.RtTargetBaseRequest;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.dto.response.system.IndividualRtInfoResponse;
import com.enbiz.bo.app.entity.StIndivRtBaseInfo;
import com.enbiz.bo.app.entity.StRtInfo;
import com.enbiz.bo.app.entity.StStdCd;
import com.enbiz.bo.app.service.code.CodeService;
import com.enbiz.bo.app.service.system.IndividualRightMgmtService;
import com.enbiz.bo.base.annotation.RealGridCUD;
import com.enbiz.common.base.exception.MessageResolver;
import com.enbiz.common.base.util.ExcelUtils;
import com.enbiz.common.base.util.ReflectionUtils;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.sf.json.JSONArray;

/**
 * 시스템 관리 / 개별권한관리
 */
@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class IndividualRightMgmtController extends BaseController {

	private final CodeService codeService;
	private final IndividualRightMgmtService individualRightMgmtService;
	private final Environment env;

	/**
	 * 개별 권한 관리
	 * @param
	 * @return 개별권한관리 화면
	 * @throws Exception 
	 * @throws
	 */
	@GetMapping("/system/individualRightMgmt.individualRightMgmtView.do")
	public String individualRightMgmtView(Model model) throws Exception {
		Map<String, List<StStdCd>> codeList = codeService.getStStdCd("UR005,UR010");
		model.addAttribute("codeList", codeList);
		return "views/system/individualRightMgmtView";
	}
	
	/**
     * 개별 권한 관리 목록 조회
     * @param prTmplBaseRequest
     * @return
     * @throws Exception
     */
    @GetMapping(value = "/system/individualRightMgmt.getIndividualRightMgmt.do", produces = "application/json;charset=UTF-8")
    @ResponseBody
    public RealGridListResponse getIndividualRightList(IndividualRtInfoRequest individualRtInfoRequest) throws Exception {
        int totalCount = individualRightMgmtService.getIndividualRightListCount(individualRtInfoRequest);
        List<IndividualRtInfoResponse> individualRightList = individualRightMgmtService.getIndividualRightList(individualRtInfoRequest);
        RealGridListResponse response = new RealGridListResponse(individualRightList, totalCount);
        
        return response;
    }
    
    /**
     * 메뉴 트리 리스트 조회
     * @param RtTargetBaseRequest
     * @return
     *
     */
    @GetMapping("/system/individualRightMgmt.getIndividualMenuTreeList.do")
    @ResponseBody
    public Map<String, Object> getIndividualMenuTreeList(RtTargetBaseRequest rtTargetBaseRequest) throws Exception {
    	Map<String, Object> data = new HashMap<String, Object>();
    	data.put("category", individualRightMgmtService.getIndividualMenuTreeList(rtTargetBaseRequest));
    	data.put("menu", individualRightMgmtService.getIndividualMenuTreeList(rtTargetBaseRequest));
        return data;
    }
    
    /**
     * 개별 권한 관리 저장
     * @param realGridCUD 신규, 수정, 삭제목록
     * @return
     * @throws Exception
     */
    @PostMapping("/system/individualRightMgmt.saveIndividualRightMgmt.do")
    @ResponseBody
    public JSONResponseEntity<Void> saveIndividualRightList(@RealGridCUD(type = StIndivRtBaseInfo.class) RealGridCUDRequest<StIndivRtBaseInfo> realGridCUD) throws Exception {
    	individualRightMgmtService.saveIndividualRightList(realGridCUD);
        JSONResponseEntity<Void> jsonResponseEntity = new JSONResponseEntity(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
        return jsonResponseEntity;
    }
    
    /**
     * 개별 권한 관리 버튼권한 저장 수정
     * @param realGridCUD 신규, 수정
     * @return
     * @throws Exception
     */
    @PostMapping("/system/individualRightMgmt.saveIndividualRightButtonGridList.do")
    @ResponseBody
    public JSONResponseEntity<Void> saveIndividualRightButtonGridList(@RealGridCUD(type = StRtInfo.class) RealGridCUDRequest<StRtInfo> realGridCUD) throws Exception {
    	individualRightMgmtService.saveIndividualRightButtonGridList(realGridCUD);
        JSONResponseEntity<Void> jsonResponseEntity = new JSONResponseEntity(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
        return jsonResponseEntity;
    }
    
    /**
	 * 엑셀 다운로드 _ 전체주문조회 목록 조회
	 * 
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@GetMapping("/system/individualRightList.individualRightListExcelDownload.do")
	public void getIndividualRightListExcelDownload(HttpServletResponse response, IndividualRtInfoRequest individualRtInfoRequest) throws Exception {
		String strExcelHeader = individualRtInfoRequest.getExcelHeader().replaceAll("&quot;", "\"");
		List<Map<String, Object>> titles = JSONArray.fromObject(strExcelHeader);
		//individualRtInfoRequest.setPageIdx(individualRtInfoRequest.getPageIdx() == 0 ? 1 : individualRtInfoRequest.getPageIdx());
		//individualRtInfoRequest.setRowsPerPage(individualRtInfoRequest.getRowsPerPage() == 0 ? 10 : individualRtInfoRequest.getRowsPerPage());
		List<Map<String, Object>> individualRightList = ReflectionUtils.convertToMaps(individualRightMgmtService.getIndividualRightList(individualRtInfoRequest));

		for (Map<String, Object> individualRight : individualRightList) {
			String formattingValue = "";
			formattingValue += individualRight.get("userId");
			formattingValue += " / ";
			formattingValue += individualRight.get("userNm");
			individualRight.put("userNm", formattingValue);
			
			formattingValue = "";
			formattingValue += individualRight.get("rtGrpNm") == null || individualRight.get("rtGrpNm").toString().equals("") ? ""
						: individualRight.get("rtGrpNm").toString();
			individualRight.put("rtGrpNm", formattingValue);
			
			formattingValue = "";
			formattingValue += individualRight.get("regCausCont") == null || individualRight.get("regCausCont").toString().equals("") ? ""
						: individualRight.get("regCausCont").toString();
			individualRight.put("regCausCont", formattingValue);
			
			formattingValue = "";
			formattingValue += individualRight.get("atchFileNm") == null || individualRight.get("atchFileNm").toString().equals("") ? ""
						: individualRight.get("atchFileNm").toString();
			individualRight.put("atchFileNm", formattingValue);
			
			formattingValue = "";
			formattingValue += individualRight.get("sysModNm") == null || individualRight.get("sysModNm").toString().equals("") ? ""
						: individualRight.get("sysModNm").toString();
			individualRight.put("sysModNm", formattingValue);
			
			formattingValue = "";
			formattingValue += individualRight.get("sysModDtm") == null || individualRight.get("sysModDtm").toString().equals("") ? ""
						: individualRight.get("sysModDtm").toString();
			individualRight.put("sysModDtm", formattingValue);
		}
		// 엑셀 공통함수 호출
		ExcelUtils.createExcelToResponse(individualRightList // 보내주는 데이터
				, titles // 해더
				, String.format("%s-%s", "individualRightList", LocalDate.now().toString()) // 엑셀파일 명칭
				, "개별권한조회" // 시트명칭
				, response);
	}
}
