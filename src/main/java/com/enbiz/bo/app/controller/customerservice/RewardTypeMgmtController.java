package com.enbiz.bo.app.controller.customerservice;

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
import com.enbiz.bo.app.dto.request.customerservice.CsCompensTypeCodeRequest;
import com.enbiz.bo.app.dto.request.realgrid.RealGridCUDRequest;
import com.enbiz.bo.app.dto.response.customerservice.CsCompensTypeCodeResponse;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.entity.CsCpnsTypCd;
import com.enbiz.bo.app.entity.StStdCd;
import com.enbiz.bo.app.service.code.CodeService;
import com.enbiz.bo.app.service.customerservice.RewardTypeMgmtService;
import com.enbiz.bo.base.annotation.RealGridCUD;
import com.enbiz.common.base.exception.MessageResolver;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 보상유형관리 Controller
 */
@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class RewardTypeMgmtController extends BaseController{
	private final RewardTypeMgmtService rewardTypeMgmtService;
	private final CodeService codeService;
	
	/**
     * 보상유형 관리 화면 호출
     * @param model
     * @return
     * @throws Exception
     */
    @GetMapping("/customerservice/rewardTypeMgmt.rewardTypeMgmtView.do")
    public String rewardTypeMgmtView(Model model) throws Exception{
        Map<String, List<StStdCd>> codeList = codeService.getStStdCd("CS017,CS018");
        model.addAttribute("codeList", codeList);
        return "views/customerservice/rewardTypeMgmtView";
    }

    /**
     * 보상유형관리 Tree 목록 조회
     * @param CsCompensTypeCodeRequest
     * @return
     * @throws Exception
     */
    @GetMapping(value = "/customerservice/rewardTypeMgmt.getRewardTypeList.do" , produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<CsCompensTypeCodeResponse> getRewardTypeList(CsCompensTypeCodeRequest CsCompensTypeCodeRequest) throws Exception{
        return rewardTypeMgmtService.getRewardTypeList(CsCompensTypeCodeRequest);
    }

    /**
     * 보상유형관리 하위 보상 정보 목록 조회
     * @param CsCompensTypeCodeRequest
     * @return
     * @throws Exception
     */
    @GetMapping(value = "/customerservice/rewardTypeMgmt.getLowerRewardTypeList.do", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public RealGridListResponse getLowerRewardTypeList(CsCompensTypeCodeRequest CsCompensTypeCodeRequest) throws Exception{
        int totalCount = rewardTypeMgmtService.getLowerRewardTypeListCount(CsCompensTypeCodeRequest);
        List<CsCompensTypeCodeResponse> csCpnsTypCdList = rewardTypeMgmtService.getLowerRewardTypeList(CsCompensTypeCodeRequest);
        RealGridListResponse response = new RealGridListResponse(csCpnsTypCdList, totalCount);
        return response;
    }

    /**
     * 보상유형관리 하위 보상 정보 등록 및 업데이트
     * @param realGridCUD
     * @return
     * @throws Exception
     */
    @PostMapping("/customerservice/rewardTypeMgmt.saveRewardTypeList.do")
    @ResponseBody
    public JSONResponseEntity<Void> saveRewardTypeList(@RealGridCUD(type = CsCpnsTypCd.class) RealGridCUDRequest<CsCpnsTypCd> realGridCUD) throws Exception{
        List<CsCpnsTypCd> createList = realGridCUD.getCreate(), updateList = realGridCUD.getUpdate();
        rewardTypeMgmtService.saveRewardTypeList(createList, updateList);
        JSONResponseEntity<Void> jsonResponseEntity = new JSONResponseEntity<Void>(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
        return jsonResponseEntity;
    }

    /**
     * 보상유형조회 화면 호출
     * @return
     * @throws Exception
     */
    @GetMapping("/customerservice/rewardTypeMgmt.rewardTypeListPopup.do")
    public String rewardTypeListPopup() throws Exception{
        return "views/customerservice/rewardTypeListPopup";
    }

    /**
     * 보상유형조회 팝업 조회
     * @param CsCompensTypeCodeRequest
     * @return
     * @throws Exception
     */
    @GetMapping(value = "/customerservice/rewardTypeMgmt.getCsCompensTypeCodePopup.do", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public RealGridListResponse getCsCompensTypeCodePopup(CsCompensTypeCodeRequest CsCompensTypeCodeRequest) throws Exception{
        int totalCount = rewardTypeMgmtService.getCsCompensTypeCodePopupCount(CsCompensTypeCodeRequest);
        List<CsCompensTypeCodeResponse> csCpnsTypeList = rewardTypeMgmtService.getCsCompensTypeCodePopup(CsCompensTypeCodeRequest);
        RealGridListResponse response = new RealGridListResponse(csCpnsTypeList, totalCount);
        return response;
    }
}
