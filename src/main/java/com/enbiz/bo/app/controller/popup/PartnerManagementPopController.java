package com.enbiz.bo.app.controller.popup;

import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.enbiz.bo.app.constant.Constants;
import com.enbiz.bo.app.controller.BaseController;
import com.enbiz.bo.app.dto.ajax.JSONResponseEntity;
import com.enbiz.bo.app.dto.request.realgrid.RawRealGridCUDRequest;
import com.enbiz.bo.app.dto.request.vendor.PartnerCruRequest;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.dto.response.vendor.PartnerCruPopupResponseEx;
import com.enbiz.bo.app.entity.EtEntrBase;
import com.enbiz.bo.app.entity.StStdCd;
import com.enbiz.bo.app.service.code.CodeService;
import com.enbiz.bo.app.service.popup.PartnerManagementPopService;
import com.enbiz.bo.base.annotation.RawRealGridCUD;
import com.enbiz.bo.base.annotation.RealGridCUDResponse;
import com.enbiz.common.base.Validator;
import com.enbiz.common.base.exception.MessageResolver;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 협력사 CRU 팝업
 */
@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class PartnerManagementPopController extends BaseController {

    
    private final PartnerManagementPopService partnerManagementPopService;
    private final CodeService codeService;

    /**
     * 협력사 CRU 팝업 화면 호출
     */
    @GetMapping("/popup/partnerCruNewPopup.do")
    public String viewPartnerCruNewPopup(Model model, @Valid PartnerCruRequest partnerCruRequest) throws Exception {

        Map<String, List<StStdCd>> codeList =
                codeService.getStStdCd("VD003,VD002,VD004,CM013,VD006,VD005,VD007");
        model.addAttribute("codeList", codeList);
        model.addAttribute("requestData", partnerCruRequest);

        return "views/popup/partnerCruNewPopup";

    }
    @GetMapping("/popup/partnerCruDetailPopup.do")
    public String viewPartnerCruDetailPopup(Model model, @Valid PartnerCruRequest partnerCruRequest) throws Exception {

        Map<String, List<StStdCd>> codeList =
                codeService.getStStdCd("VD003,VD002,VD004,CM013,VD006,VD005,VD007");
        model.addAttribute("codeList", codeList);
        model.addAttribute("requestData", partnerCruRequest);

        PartnerCruPopupResponseEx partnerCruPopupResponseEx =
                partnerManagementPopService.getPartnerDetailWithOtherData(partnerCruRequest);

        RealGridListResponse etDeliPolcBaseListResponse =
                new RealGridListResponse(partnerCruPopupResponseEx.getEtDeliPolcBaseList(),
                        partnerCruPopupResponseEx.getEtDeliPolcBaseList().size());

        model.addAttribute("etDeliPolcBaseList", etDeliPolcBaseListResponse.toJsonString());

        RealGridListResponse etEntrAempInfoListResponse =
                new RealGridListResponse(partnerCruPopupResponseEx.getEtEntrAempInfoList(),
                        partnerCruPopupResponseEx.getEtEntrAempInfoList().size());

        model.addAttribute("etEntrAempInfoList", etEntrAempInfoListResponse.toJsonString());

        RealGridListResponse etEntrDlvpInfoListResponse =
                new RealGridListResponse(partnerCruPopupResponseEx.getEtEntrDlvpInfoList(),
                        partnerCruPopupResponseEx.getEtEntrDlvpInfoList().size());

        model.addAttribute("etEntrDlvpInfoList", etEntrDlvpInfoListResponse.toJsonString());

        model.addAttribute("partnerCruPopupResponseEx", partnerCruPopupResponseEx);

        return "views/popup/partnerCruDetailPopup";

    }

    @PostMapping("/popup/saveVendorWithOtherData.do")
    @ResponseBody
    @RealGridCUDResponse
    public JSONResponseEntity saveVendorWithOtherData(@RawRealGridCUD RawRealGridCUDRequest rawCUDRequest,
                                             EtEntrBase etEntrBase) throws Exception {

        //parameter check!!
        vendorValidatorCheck(etEntrBase);
        partnerManagementPopService.saveVendorWithOtherData(rawCUDRequest, etEntrBase);

        JSONResponseEntity jsonResponseEntity = new JSONResponseEntity(
                MessageResolver.getMessage("adminCommon.message.saved.successfully"));

        return jsonResponseEntity;
    }

    @PostMapping("/popup/updateVendorWithOtherData.do")
    @ResponseBody
    @RealGridCUDResponse
    public JSONResponseEntity updateVendorWithOtherData(@RawRealGridCUD RawRealGridCUDRequest rawCUDRequest,
                                                          EtEntrBase etEntrBase) throws Exception {

        //parameter check!!
        vendorValidatorCheck(etEntrBase);
        partnerManagementPopService.updateVendorWithOtherData(rawCUDRequest, etEntrBase);

        JSONResponseEntity jsonResponseEntity = new JSONResponseEntity(
                MessageResolver.getMessage("adminCommon.message.saved.successfully"));

        return jsonResponseEntity;
    }

    private void vendorValidatorCheck(EtEntrBase etEntrBase) throws Exception{
        Validator.throwIfEmpty(etEntrBase.getTrdTypCd()
                , MessageResolver.getMessage(Constants.MSG_COMMON_PARAMETER_EMPTY_ERROR
                        , new String[] {"trdTypCd"}));
        Validator.throwIfEmpty(etEntrBase.getEntrNm()
                , MessageResolver.getMessage(Constants.MSG_COMMON_PARAMETER_EMPTY_ERROR
                        , new String[] {"entrNm"}));
    }
}
