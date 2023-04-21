package com.enbiz.bo.app.controller.customerservice;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.enbiz.bo.app.controller.BaseController;
import com.enbiz.bo.app.dto.ajax.JSONResponseEntity;
import com.enbiz.bo.app.dto.request.customerservice.CsObTypCdRequest;
import com.enbiz.bo.app.dto.request.realgrid.RealGridCUDRequest;
import com.enbiz.bo.app.dto.response.customerservice.CsObTypCdResponse;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.entity.CsObTypCd;
import com.enbiz.bo.app.service.customerservice.ObTypeMgmtService;
import com.enbiz.bo.base.annotation.RealGridCUD;
import com.enbiz.common.base.exception.MessageResolver;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * Ob유형관리 Controller
 */
@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class ObTypeMgmtController extends BaseController{
	
	private final ObTypeMgmtService obTypeMgmtService;
	
	/**
     * OB유형 관리 화면 호출
     * @return
     * @throws Exception
     */
    @GetMapping("/customerservice/obTypeMgmt.obTypeMgmtView.do")
    public String obTypeMgmtView() throws Exception{
        return "views/customerservice/obTypeMgmtView";
    }

    /**
     * OB유형 목록 조회
     * @param csObTypCdRequest
     * @return
     * @throws Exception
     */
    @GetMapping(value = "/customerservice/obTypeMgmt.getObTypeList.do", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public RealGridListResponse getObTypeList(CsObTypCdRequest csObTypCdRequest) throws Exception{
        int totalCount = obTypeMgmtService.getObTypeListCount(csObTypCdRequest);
        List<CsObTypCdResponse> csObTypCdList = obTypeMgmtService.getObTypeList(csObTypCdRequest);
        RealGridListResponse response = new RealGridListResponse(csObTypCdList, totalCount);
        return response;
    }

    /**
     * OB유형 등록 및 업데이트
     * @param realGridCUD
     * @return
     * @throws Exception
     */
    @PostMapping("/customerservice/obTypeMgmt.saveObTypeList.do")
    @ResponseBody
    public JSONResponseEntity<Void> saveObTypeList(@RealGridCUD(type = CsObTypCd.class) RealGridCUDRequest<CsObTypCd> realGridCUD) throws Exception{
        List<CsObTypCd> createList = realGridCUD.getCreate(), updateList = realGridCUD.getUpdate();
        obTypeMgmtService.saveList(createList, updateList);
        JSONResponseEntity<Void> jsonResponseEntity = new JSONResponseEntity<Void>(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
        return jsonResponseEntity;
    }

    /**
     * OB유형명의 중복여부 확인
     * @param csObTypCdRequest
     * @return
     * @throws Exception
     */
    @PostMapping(value = "/customerservice/obTypeMgmt.checkObTypeName.do", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public JSONResponseEntity<Void> checkObTypeName(CsObTypCdRequest csObTypCdRequest) throws Exception {
        boolean result = obTypeMgmtService.checkObTypNm(csObTypCdRequest);
        JSONResponseEntity<Void> response = new JSONResponseEntity<Void>();
        response.setSucceeded(result);
        return response;
    }
}
