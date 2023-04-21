package com.enbiz.bo.app.controller.marketing;

import java.util.List;
import java.util.Map;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.enbiz.bo.app.controller.BaseController;
import com.enbiz.bo.app.dto.request.marketing.CouponCostRequest;
import com.enbiz.bo.app.dto.response.marketing.CouponCostResponse;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.entity.StStdCd;
import com.enbiz.bo.app.service.code.CodeService;
import com.enbiz.bo.app.service.marketing.CouponCostMgmtService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 마케팅 > 쿠폰비용관리 Controller
 */
@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class CouponCostMgmtController extends BaseController{

    private final CouponCostMgmtService couponCostMgmtService;
    private final CodeService codeService;

    /**
     * 쿠폰비용관리 화면 호출
     * @param response
     * @param model
     * @return
     * @throws Exception
     */
    @GetMapping("/marketing/couponMgmt.couponCostMgmtView.do")
    public String couponCostManageList(Model model) throws Exception {
        Map<String, List<StStdCd>> codeList = codeService.getStStdCd("MK002,MK003");
        model.addAttribute("codeList", codeList);
        return "views/marketing/couponCostMgmtView";
    }


    /**
     * 쿠폰비용관리 리스트 조회
     * @param couponCostRequest
     * @return
     * @throws Exception
     */
    @GetMapping("/marketing/couponMgmt.getCouponCostManageList.do")
    @ResponseBody
    public RealGridListResponse getCouponCostManageList(CouponCostRequest couponCostMgmtRequest) throws Exception {
        int totalCount = couponCostMgmtService.getCouponCostListCount(couponCostMgmtRequest);
        List<CouponCostResponse> couponCostList = couponCostMgmtService.getCouponCostList(couponCostMgmtRequest);
        RealGridListResponse response = new RealGridListResponse(couponCostList, totalCount);
        return response;
    }


}
