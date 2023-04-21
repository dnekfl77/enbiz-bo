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
import com.enbiz.bo.app.dto.request.customerservice.CsMvotTypeCodeRequest;
import com.enbiz.bo.app.dto.request.realgrid.RealGridCUDRequest;
import com.enbiz.bo.app.dto.response.customerservice.CsTransferTypeCodeResponse;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.entity.CsMvotTypCd;
import com.enbiz.bo.app.service.customerservice.TransferTypeMgmtService;
import com.enbiz.bo.base.annotation.RealGridCUD;
import com.enbiz.common.base.exception.MessageResolver;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 이관유형관리 Controller
 */
@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class TransferTypeMgmtController extends BaseController{
	
	private final TransferTypeMgmtService transferTypeMgmtService;
	
	/**
     * 이관유형관리 화면 호출
     * @return
     * @throws Exception
     */
    @GetMapping("/customerservice/transferTypeMgmt.transferTypeMgmtView.do")
    public String transferTypeMgmtView() throws Exception{
        return "views/customerservice/transferTypeMgmtView";
    }

    /**
     * 이관유형 목록 조회
     * @param CsMvotTypeCodeRequest
     * @return
     * @throws Exception
     */
    @GetMapping(value = "/customerservice/transferTypeMgmt.getTransferTypeList.do", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public RealGridListResponse getTransferTypeList(CsMvotTypeCodeRequest CsMvotTypeCodeRequest) throws Exception{
        int totalCount = transferTypeMgmtService.getTransferTypeListCount(CsMvotTypeCodeRequest);
        List<CsTransferTypeCodeResponse> csMvotTypCdList = transferTypeMgmtService.getTransferTypeList(CsMvotTypeCodeRequest);
        RealGridListResponse response = new RealGridListResponse(csMvotTypCdList, totalCount);
        return response;
    }

    /**
     * 이관유형 등록 및 업데이트
     * @param realGridCUD
     * @return
     * @throws Exception
     */
    @PostMapping("/customerservice/transferTypeMgmt.saveTransferTypeList.do")
    @ResponseBody
    public JSONResponseEntity<Void> saveTransferTypeList(@RealGridCUD(type = CsMvotTypCd.class) RealGridCUDRequest<CsMvotTypCd> realGridCUD) throws Exception{
        List<CsMvotTypCd> createList = realGridCUD.getCreate(), updateList = realGridCUD.getUpdate();
        transferTypeMgmtService.saveList(createList, updateList);
        JSONResponseEntity<Void> jsonResponseEntity = new JSONResponseEntity<Void>(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
        return jsonResponseEntity;
    }

    /**
     * 이관유형명의 중복여부 확인
     * @param CsMvotTypeCodeRequest
     * @return
     * @throws Exception
     */
    @PostMapping(value = "/customerservice/transferTypeMgmt.checkCsMvotTypeName.do", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public JSONResponseEntity<Void> checkCsMvotTypeName(CsMvotTypeCodeRequest CsMvotTypeCodeRequest) throws Exception {
        boolean result = transferTypeMgmtService.checkCsMvotTypeName(CsMvotTypeCodeRequest);
        JSONResponseEntity<Void> response = new JSONResponseEntity<Void>();
        response.setSucceeded(result);
        return response;
    }
}
