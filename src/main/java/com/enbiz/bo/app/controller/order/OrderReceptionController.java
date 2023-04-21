package com.enbiz.bo.app.controller.order;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.enbiz.bo.app.controller.BaseController;
import com.enbiz.bo.app.dto.ajax.JSONResponseEntity;
import com.enbiz.bo.app.dto.request.login.LoginRequest;
import com.enbiz.bo.app.dto.request.order.orderreception.DlvAmtRequest;
import com.enbiz.bo.app.dto.request.order.orderreception.DlvCouponRequest;
import com.enbiz.bo.app.dto.request.order.orderreception.GoodsBest100Request;
import com.enbiz.bo.app.dto.request.order.orderreception.GoodsKeyWordRequest;
import com.enbiz.bo.app.dto.request.order.orderreception.GoodsOrderHistRequest;
import com.enbiz.bo.app.dto.request.order.orderreception.GoodsWishRequest;
import com.enbiz.bo.app.dto.request.order.orderreception.ManualOrderRequest;
import com.enbiz.bo.app.dto.request.order.orderreception.OrderBenefitRequest;
import com.enbiz.bo.app.dto.request.order.orderreception.OrderGiftRequest;
import com.enbiz.bo.app.dto.request.realgrid.RealGridCUDRequest;
import com.enbiz.bo.app.dto.response.customer.CustomerNoMaskingResponse;
import com.enbiz.bo.app.dto.response.login.PrivacyPolicyInfo;
import com.enbiz.bo.app.dto.response.order.orderreception.DlvAmtResponse;
import com.enbiz.bo.app.dto.response.order.orderreception.DlvCouponResponse;
import com.enbiz.bo.app.dto.response.order.orderreception.GoodsListResponse;
import com.enbiz.bo.app.dto.response.order.orderreception.MbrAstSumResponse;
import com.enbiz.bo.app.dto.response.order.orderreception.MbrDlvpInfoResponse;
import com.enbiz.bo.app.dto.response.order.orderreception.OrderBenefitResponse;
import com.enbiz.bo.app.dto.response.order.orderreception.OrderGiftResponse;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.entity.EtMbrDlvpInfo;
import com.enbiz.bo.app.entity.PrStdCtg;
import com.enbiz.bo.app.entity.StStdCd;
import com.enbiz.bo.app.service.code.CodeService;
import com.enbiz.bo.app.service.order.OrderReceptionService;
import com.enbiz.bo.base.annotation.RealGridCUD;
import com.enbiz.common.base.exception.MessageResolver;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 상담사 주문접수
 */
@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class OrderReceptionController extends BaseController {

    private final CodeService codeService;
    private final OrderReceptionService orderReceptionService;

    /**
     * 상담원 주문접수 화면 호출
     */
    @GetMapping("/order/orderReception.orderReceptionView.do")
    public String orderReceptionView(@AuthenticationPrincipal LoginRequest loginRequest, ManualOrderRequest request, Model model) throws Exception {

        //회원 / 비회원
        request.setMbrNo("100000001");
//        request.setMbrNo("999999999");

        final Map<String, List<StStdCd>> codeList = codeService.getStStdCd("CM012,CM013,PR024,PR001,PR003,PR002,PR006");
        final List<PrivacyPolicyInfo> stIndInfoQryRtInfoList = loginRequest.getPrivacyPolicyInfoList();
        final String indInfodealYn = (stIndInfoQryRtInfoList == null || stIndInfoQryRtInfoList.size() < 1) ? "N" : "Y";
        CustomerNoMaskingResponse memberData = null;
        List<MbrDlvpInfoResponse> memberDlvpInfo = null;

        if (StringUtils.isNotEmpty(request.getMbrNo())) {
            memberData = orderReceptionService.getMemberData(request.getMbrNo());
            memberDlvpInfo = orderReceptionService.getMemberDeliveryList(request.getMbrNo());
        }

        model.addAttribute("codeList", codeList);
        model.addAttribute("indInfodealYn", indInfodealYn);    //개인정보취급여부
        model.addAttribute("memberData", memberData);          //회원 Data
        model.addAttribute("memberDlvpInfo", memberDlvpInfo);  //회원 배송지

        return "views/order/orderreception/orderReceptionView";
    }

    /**
     * 배송비 가져오기
     */
    @GetMapping("/order/orderReception.getMemberDlvpData.do")
    @ResponseBody
    public List<MbrDlvpInfoResponse> getMemberDlvpData(ManualOrderRequest request) throws Exception {
        return orderReceptionService.getMemberDeliveryList(request.getMbrNo());
    }

    /**
     * 상담원 주문접수 > 상품추가 팝업
     */
    @GetMapping("/order/orderReception.addOrderGoodsPopup.do")
    public String addOrderGoodsPopup(ManualOrderRequest request, Model model) throws Exception {
        final Map<String, List<StStdCd>> codeList = codeService.getStStdCd("PR005");
        final List<PrStdCtg> prStdCtgList = orderReceptionService.getPrStdCtgList();

        model.addAttribute("mbrNo", request.getMbrNo());
        model.addAttribute("prStdCtgList", prStdCtgList);
        model.addAttribute("codeList", codeList);
        return "views/order/orderreception/popup/addOrderGoodsPopup";
    }

    /**
     * 상담원 주문접수 > 상품추가 팝업 > 키워드 조회
     */
    @GetMapping("/order/orderReception.getGoodsKeyWordListPopup.do")
    @ResponseBody
    public RealGridListResponse getGoodsKeyWordListPopup(GoodsKeyWordRequest goodsKeyWordListRequest) throws Exception {
        List<GoodsListResponse> goodsKeyWordList = orderReceptionService.getGoodsKeyWordList(goodsKeyWordListRequest);
        int totalCount = orderReceptionService.getGoodsKeyWordListCount(goodsKeyWordListRequest);
        return new RealGridListResponse(goodsKeyWordList, totalCount);
    }

    /**
     * 상담원 주문접수 > 상품추가 팝업 > 고객주문이력 조회
     */
    @GetMapping("/order/orderReception.getGoodsOrderHistListPopup.do")
    @ResponseBody
    public RealGridListResponse getGoodsOrderHistListPopup(GoodsOrderHistRequest goodsOrderHistRequest) throws Exception {
        List<GoodsListResponse> goodsOrderList = orderReceptionService.getGoodsOrderHistList(goodsOrderHistRequest);
        int totalCount = orderReceptionService.getGoodsOrderHistListCount(goodsOrderHistRequest);
        return new RealGridListResponse(goodsOrderList, totalCount);
    }

    /**
     * 상담원 주문접수 > 상품추가 팝업 > 위시리스트 조회
     */
    @GetMapping("/order/orderReception.getWishListPopup.do")
    @ResponseBody
    public RealGridListResponse getWishListPopup(GoodsWishRequest goodsWishRequest) throws Exception {
        List<GoodsListResponse> goodsWishList = orderReceptionService.getWishList(goodsWishRequest);
        int totalCount = orderReceptionService.getWishListCount(goodsWishRequest);
        return new RealGridListResponse(goodsWishList, totalCount);
    }

    /**
     * 상담원 주문접수 > 상품추가 팝업 > 베스트 100 조회
     */
    @GetMapping("/order/orderReception.getBest100ListPopup.do")
    @ResponseBody
    public RealGridListResponse getBest100ListPopup(GoodsBest100Request goodsBest100Request) throws Exception {
        List<GoodsListResponse> getBest100List = orderReceptionService.getBest100List(goodsBest100Request);
        int totalCount = orderReceptionService.getBest100ListCount(goodsBest100Request);
        return new RealGridListResponse(getBest100List, totalCount);
    }

    /**
     * 상담원 주문접수 > 배송지 선택 팝업 > 회원
     */
    @GetMapping("/order/orderReception.orderDeliveryPopup.do")
    public String orderDeliveryPopup(ManualOrderRequest request,Model model) throws Exception {
        model.addAttribute("mbrNo", request.getMbrNo());
        return "views/order/orderreception/popup/orderDeliveryPopup";
    }


    /**
     * 상담원 주문접수 > 배송지 선택 팝업 > 회원 배송지 List 가져오기
     */
    @GetMapping("/order/orderReception.getMemberDeliveryList.do")
    @ResponseBody
    public RealGridListResponse getMemberDeliveryList(ManualOrderRequest request) throws Exception {
        //배송지 목록 조회
        List<MbrDlvpInfoResponse> deliveryList = orderReceptionService.getMemberDeliveryList(request.getMbrNo());
        return new RealGridListResponse(deliveryList, deliveryList.size());
    }

    /**
     * 상담원 주문접수 > 배송지 선택 팝업 > 회원 배송지 List 저장
     */
    @PostMapping("/order/orderReception.saveMemberDeliveryList.do")
    @ResponseBody
    public JSONResponseEntity saveMemberDeliveryList(@RealGridCUD(type = EtMbrDlvpInfo.class) RealGridCUDRequest<EtMbrDlvpInfo> realGridCUD) throws Exception {
        List<EtMbrDlvpInfo> createList = realGridCUD.getCreate();
        List<EtMbrDlvpInfo> updateList = realGridCUD.getUpdate();
        orderReceptionService.saveMemberDeliveryList(createList,updateList);
        return new JSONResponseEntity(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
    }

    /**
     * 상담원 주문접수 > 배송지 선택 팝업 > 비회원
     */
    @GetMapping("/order/orderReception.orderDeliveryNoMemberPopup.do")
    public String appendDeliveryNomember(Model model) throws Exception {
        final Map<String, List<StStdCd>> codeList = codeService.getStStdCd("CM012,CM013,PR024,PR001,PR003,PR002,PR006");
        model.addAttribute("codeList", codeList);
        return "views/order/orderreception/popup/orderDeliveryNoMemberPopup";
    }

    /**
     * 상담원 주문접수 > 사은품 선택 > 사은품 조회
     */
    @PostMapping("/order/orderReception.getOrderGiftList.do")
    @ResponseBody
    public List<OrderGiftResponse> getOrderGiftList(@RequestBody OrderGiftRequest orderGiftRequest) throws Exception{
        return  orderReceptionService.getOrderGiftList(orderGiftRequest);
    }

    /**
     * 상담원 주문접수 > 혜택 적용 > 혜택 가져오기
     */
    @PostMapping("/order/orderReception.getBenefitList.do")
    @ResponseBody
    public List<OrderBenefitResponse> getBenefitList(@RequestBody OrderBenefitRequest orderBenefitRequest) throws Exception{
        return orderReceptionService.getBenefitList(orderBenefitRequest);
    }

    /**
     * 상담원 주문접수 > 배송비
     */
    @PostMapping("/order/orderReception.getDlvAmtList.do")
    @ResponseBody
    public List<DlvAmtResponse> getDlvAmtList(@RequestParam Map<String,Object> dlvList) throws Exception{
        String json = dlvList.get("dlvList").toString().replaceAll("&quot;", "\"");
        ObjectMapper mapper = new ObjectMapper();
        ArrayList<DlvAmtRequest> dlvAmtRequestList = mapper.readValue(json, new TypeReference<ArrayList<DlvAmtRequest>>() {});
        return orderReceptionService.getDlvAmtList(dlvAmtRequestList);
    }

    /**
     * 상담원 주문접수 > 배송비 쿠폰
     */
    @PostMapping("/order/orderReception.getDlvCouponList.do")
    @ResponseBody
    public List<DlvCouponResponse> getDlvCouponList(DlvCouponRequest dlvCouponRequest) throws Exception{
        return orderReceptionService.getDlvCouponList(dlvCouponRequest);
    }

    /**
     * 상담원 주문접수 > 예치금 , 적립금 가져오기
     */
    @GetMapping("/order/orderReception.getMeMbrAstSum.do")
    @ResponseBody
    public List<MbrAstSumResponse> getMbrAstSumList(ManualOrderRequest request) throws Exception{
        return orderReceptionService.getMbrAstSumList(request.getMbrNo());
    }


}
