package com.enbiz.bo.app.controller.marketing;

import java.util.List;
import java.util.Map;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.enbiz.bo.app.controller.BaseController;
import com.enbiz.bo.app.dto.ajax.JSONResponseEntity;
import com.enbiz.bo.app.dto.request.marketing.PromotionCudRequest;
import com.enbiz.bo.app.dto.request.marketing.PromotionRequest;
import com.enbiz.bo.app.dto.response.marketing.PromotionDetailResponse;
import com.enbiz.bo.app.dto.response.marketing.PromotionResponse;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.entity.StStdCd;
import com.enbiz.bo.app.service.code.CodeService;
import com.enbiz.bo.app.service.marketing.PromotionMgmtService;
import com.enbiz.common.base.exception.MessageResolver;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 마케팅 > 프로모션 Controller
 */
@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class PromotionMgmtController extends BaseController{

    private final PromotionMgmtService promotionMgmtService;
    private final CodeService codeService;

    /**
     * 프로모션 관리 화면 호출
     * @param response
     * @param model
     * @return
     * @throws Exception
     */
    @GetMapping("/marketing/promotionMgmt.promotionMgmtView.do")
    public String promotionManagingList(Model model) throws Exception {
        Map<String, List<StStdCd>> codeList = codeService.getStStdCd("MK002,MK003");
        model.addAttribute("codeList", codeList);
        return "views/marketing/promotionMgmtView";
    }


    /**
     * 프로모션 관리 목록 조회
     * @param promotionRequest
     * @return
     * @throws Exception
     */
    @GetMapping("/marketing/promotionMgmt.getPromotionManagingList.do")
    @ResponseBody
    public RealGridListResponse getPromotionManagingList(PromotionRequest promotionRequest) throws Exception {
        int totalCount = promotionMgmtService.getPromotionListCount(promotionRequest);
        List<PromotionResponse> promotionList = promotionMgmtService.getPromotionList(promotionRequest);
        RealGridListResponse response = new RealGridListResponse(promotionList, totalCount);
        return response;
    }

    /**
     * 프로모션 등록 화면 호출
     * @param response
     * @param model
     * @return
     * @throws Exception
     */
    @GetMapping("/marketing/promotionMgmt.promotionRegistView.do")
    public String getPromotionInit(Model model) throws Exception {
        Map<String, List<StStdCd>> codeList = codeService.getStStdCd("MK002,MK003,OM027");
        Map<String, List<StStdCd>> mbrGradeList = codeService.getReverseStStdCd("ME024");
        model.addAttribute("codeList", codeList);
        model.addAttribute("mbrGradeList", mbrGradeList);
        return "views/marketing/promotionSaveView";
    }

    /**
     * 프로모션 상세 화면 호출
     * @param response
     * @param model
     * @return
     * @throws Exception
     */
    @GetMapping("/marketing/promotionMgmt.promotionModifyView.do")
    public String getPromotionDetail(@RequestParam String promoNo,Model model) throws Exception {
        Map<String, List<StStdCd>> codeList = codeService.getStStdCd("MK002,MK003,OM027");
        Map<String, List<StStdCd>> mbrGradeList = codeService.getReverseStStdCd("ME024");
        PromotionDetailResponse promotion = promotionMgmtService.getPromotion(promoNo);
        model.addAttribute("codeList", codeList);
        model.addAttribute("mbrGradeList", mbrGradeList);
        model.addAttribute("promotion", promotion);
        return "views/marketing/promotionSaveView";
    }

    /**
     * 프로모션 등록 및 업데이트
     * @param promotionCudRequest
     * @return
     * @throws Exception
     */
    @PostMapping("/marketing/promotionMgmt.savePromotion.do")
    @ResponseBody
    public JSONResponseEntity<Void> cudPromotion(@RequestBody PromotionCudRequest promotionCudRequest) throws Exception{
    	promotionMgmtService.savePromotion(promotionCudRequest);
        return new JSONResponseEntity<Void>(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
    }

    /**
     * 쿠폰 삭제
     */
    @GetMapping("/marketing/promotionMgmt.deletePromotion.do")
    @ResponseBody
    public JSONResponseEntity<Void> deletePromotion(@RequestParam String promoNo) throws Exception{
    	promotionMgmtService.deletePromotion(promoNo);
        return new JSONResponseEntity<Void>(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
    }

}
