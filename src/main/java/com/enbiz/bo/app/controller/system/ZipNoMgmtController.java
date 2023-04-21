package com.enbiz.bo.app.controller.system;

import java.util.List;

import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;

import org.springframework.context.annotation.Lazy;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.enbiz.bo.app.controller.BaseController;
import com.enbiz.bo.app.dto.ajax.JSONResponseEntity;
import com.enbiz.bo.app.dto.request.realgrid.RealGridCUDRequest;
import com.enbiz.bo.app.dto.request.system.ZipNoMgmtCudRequest;
import com.enbiz.bo.app.dto.request.system.ZipNoMgmtRequest;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.dto.response.system.ZipNoMgmtResponse;
import com.enbiz.bo.app.service.system.ZipNoService;
import com.enbiz.bo.base.annotation.RealGridCUD;
import com.enbiz.common.base.exception.MessageResolver;

import groovy.util.logging.Slf4j;
import lombok.RequiredArgsConstructor;

/**
 * 시스템 관리 > 기본정보관리 > 우편번호관리
 */
@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class ZipNoMgmtController extends BaseController {

	private final ZipNoService zipNoService;

	/**
	 * 우편번호 조회 화면 호출
	 *
	 * @return 우편번호 조회 html path
	 * @throws Exception
	 */
	@GetMapping("/system/zipNoMgmt.zipNoMgmtView.do")
	public String zipNoMgmtView(Model model) throws Exception {
		model.addAttribute("ctpNmList", zipNoService.getCityProvinceNameList());
		return "views/system/zipNoMgmtView";
	}

	/**
	 * 우편번호 목록 조회
	 *
	 * @params ZipNoMgmtRequest req
	 * @return
	 * @throws Exception
	 */
    @GetMapping(value = "/system/zipNoMgmt.getZipNoList.do")
    @ResponseBody
	public RealGridListResponse getZipNoList(@Valid ZipNoMgmtRequest req) throws Exception {
        int zipNoListTotalCnt = zipNoService.getZipNoListCount(req);
        List<ZipNoMgmtResponse> zipNoList = zipNoService.getZipNoList(req);
        RealGridListResponse response = new RealGridListResponse(zipNoList, zipNoListTotalCnt);
		return response;
	}

	/**
	 * 시군구명 조회
	 *
	 * @param String ctpNm
	 * @return List<String>
	 * @throws Exception
	 */
    @GetMapping(value = "/system/zipNoMgmt.getSiGunGuNameList.do", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<String> getSiGunGuNameList(@NotEmpty String ctpNm) throws Exception {
        return zipNoService.getSiGunGuNameList(ctpNm);
    }

	/**
	 * 우편번호 수정, 삭제
	 *
	 * @param RealGridCUDRequest<ZipNoMgmtCudRequest> cudReq
	 * @return ResponseEntity<String>
	 * @throws Exception
	 */
	@PostMapping(value = "/system/zipNoMgmt.saveZipNo.do", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public JSONResponseEntity<Void> saveZipNo(@RealGridCUD(type = ZipNoMgmtCudRequest.class) RealGridCUDRequest<ZipNoMgmtCudRequest> cudReq) throws Exception {
		zipNoService.saveZipNoList(cudReq);
		return new JSONResponseEntity<Void>(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
	}

}