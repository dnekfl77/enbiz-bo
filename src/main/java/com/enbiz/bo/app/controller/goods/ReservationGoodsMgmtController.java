package com.enbiz.bo.app.controller.goods;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.enbiz.bo.app.controller.BaseController;
import com.enbiz.bo.app.dto.ajax.JSONResponseEntity;
import com.enbiz.bo.app.dto.request.goods.ReservationGoodsMgmtRequest;
import com.enbiz.bo.app.dto.request.goods.ReservationGoodsModifyRequest;
import com.enbiz.bo.app.dto.response.goods.ReservationGoodsMgmtResponse;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.service.code.CodeService;
import com.enbiz.bo.app.service.goods.ReservationGoodsMgmtService;
import com.enbiz.common.base.exception.MessageResolver;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 예약상품관리 Controller
 */
@Controller
@Slf4j
@Lazy
@RequiredArgsConstructor
public class ReservationGoodsMgmtController extends BaseController {

    private final ReservationGoodsMgmtService reservationGoodsMgmtService;
    private final CodeService codeService;

    /**
     * 예약상품관리 화면 호출
     * @param model
     * @return String
     * @throws Exception
     */
    @GetMapping("/goods/ReservationGoodsMgmt.reservationGoodsMgmtView.do")
    public String reservationGoodsMgmtView(Model model) throws Exception {
        model.addAttribute("codeList", codeService.getStStdCd("PR003,PR005"));
        return "views/goods/reservationGoodsMgmtView";
    }

    /**
     * 예약상품 목록 조회
     * @param request
     * @return
     * @throws Exception
     */
    @GetMapping("/goods/ReservationGoodsMgmt.getReservationGoodsList.do")
    @ResponseBody
    public RealGridListResponse getReservationGoodsList(ReservationGoodsMgmtRequest request) throws Exception {
        int totalCount = reservationGoodsMgmtService.getReservationGoodsListCount(request);
        List<ReservationGoodsMgmtResponse> goodsList = reservationGoodsMgmtService.getReservationGoodsList(request);
        return new RealGridListResponse(goodsList, totalCount);
    }

    /**
     * 예약상품 일괄등록/해제 팝업 호출
     * @param reservationGoodsMgmtRequest
     * @param model
     * @return
     * @throws Exception
     */
    @GetMapping("/goods/ReservationGoodsMgmt.reservationGoodsModifyView.do")
    public String reservationGoodsModifyView(ReservationGoodsMgmtRequest reservationGoodsMgmtRequest, Model model) throws Exception {
        model.addAttribute("codeList", codeService.getStStdCd("PR011,PR034"));
        model.addAttribute("goodsNoList", reservationGoodsMgmtRequest.getGoodsNoList());
        model.addAttribute("saleMethCd", reservationGoodsMgmtRequest.getSaleMethCd());
        return "views/goods/reservationGoodsModifyView";
    }

    /**
     * 예약상품 일괄등록/해제
     * @param reservationGoodsModifyRequest
     * @return
     * @throws Exception
     */
    @PostMapping("/goods/ReservationGoodsMgmt.modifyGoodsSaleMethod.do")
    @ResponseBody
    public JSONResponseEntity modifyGoodsSaleMethod(ReservationGoodsModifyRequest reservationGoodsModifyRequest) throws Exception{
        reservationGoodsMgmtService.modifyGoodsSaleMethod(reservationGoodsModifyRequest);
        return new JSONResponseEntity(MessageResolver.getMessage("reservationGoodsMgmt.reservationGoodsModify.alert.msg.normalToRsvChangeSuccess"
                , new String[]{reservationGoodsModifyRequest.getSaleMethCd().equals("10") ? "해제" : "등록"}));
    }

    /**
     * 예약상품이력 팝업 호출
     * @param model
     * @return String
     * @throws Exception
     */
    @GetMapping("/goods/ReservationGoodsMgmt.reservationGoodsHistoryView.do")
    public String reservationGoodsHistoryView(String goodsNo,Model model) throws Exception {
        model.addAttribute("goodsInfo", reservationGoodsMgmtService.getReservationGoodsInfo(goodsNo));
        return "views/goods/reservationGoodsHistoryView";
    }

    /**
     * 예약상품이력 조회
     * @param goodsNo
     * @return
     * @throws Exception
     */
    @GetMapping("/goods/ReservationGoodsMgmt.getReservationGoodsHistory.do")
    @ResponseBody
    public RealGridListResponse getReservationGoodsHistory(String goodsNo) throws Exception {
        List<ReservationGoodsMgmtResponse> rsvList = reservationGoodsMgmtService.getReservationGoodsHistory(goodsNo);
        return new RealGridListResponse(rsvList, rsvList.size());
    }
}
