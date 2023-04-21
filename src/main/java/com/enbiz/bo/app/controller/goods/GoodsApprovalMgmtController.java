package com.enbiz.bo.app.controller.goods;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.enbiz.bo.app.controller.BaseController;
import com.enbiz.bo.app.dto.ajax.JSONResponseEntity;
import com.enbiz.bo.app.dto.request.goods.GoodsApprovalMgmtRequest;
import com.enbiz.bo.app.dto.response.goods.GoodsApprovalMgmtResponse;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.service.code.CodeService;
import com.enbiz.bo.app.service.goods.GoodsApprovalMgmtService;
import com.enbiz.common.base.Validator;
import com.enbiz.common.base.exception.MessageResolver;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 상품승인관리 Controller
 */
@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class GoodsApprovalMgmtController extends BaseController {

    private final GoodsApprovalMgmtService goodsApprovalMgmtService;
    private final CodeService codeService;

    /**
     * 상품 승인 관리 화면 호출
     * @return 상품 승인 관리 화면
     * @throws Exception
     */
    @RequestMapping("/goods/GoodsApprovalMgmt.goodsApprovalMgmtView.do")
    public String goodsApprovalMgmtView(Model model, GoodsApprovalMgmtRequest goodsApprovalMgmtRequest) throws Exception {
        model.addAttribute("codeList", codeService.getStStdCd("PR024,PR001,PR002,PR003,PR006"));
        model.addAttribute("goodsApprovalMgmtRequest", goodsApprovalMgmtRequest);
        return "views/goods/goodsApprovalMgmtView";
    }

    /**
     * 상품 승인 목록 조회
     * @param request
     * @return 상품 승인 목록
     * @throws Exception
     */
    @GetMapping("/goods/GoodsApprovalMgmt.getGoodsApprovalList.do")
    @ResponseBody
    public RealGridListResponse getGoodsApprovalList(GoodsApprovalMgmtRequest request) throws Exception {
        int totalCount = goodsApprovalMgmtService.getGoodsApprovalListCount(request);
        List<GoodsApprovalMgmtResponse> goodsApprovalList = goodsApprovalMgmtService.getGoodsApprovalList(request);
        return new RealGridListResponse(goodsApprovalList, totalCount);
    }

    /**
     * 상품 승인
     * @param request
     * @return
     * @throws Exception
     */
    @PostMapping("/goods/GoodsApprovalMgmt.approveGoods.do")
    @ResponseBody
    public JSONResponseEntity approveGoods (GoodsApprovalMgmtRequest request) throws Exception {
        goodsApprovalMgmtService.approveGoods(request);
        return new JSONResponseEntity(MessageResolver.getMessage("goodsApprovalMgmt.alert.msg.goodsApprovalSuccessMsg"));
    }

    /**
     * 상품 승인 반려 팝업 호출
     * @param model
     * @param model
     * @return
     * @throws Exception
     */
    @GetMapping("/goods/GoodsApprovalMgmt.goodsApprovalReturnView.do")
    public String goodsApprovalReturnView(String pregGoodsNo, Model model) throws Exception {

        Validator.throwIfEmpty(pregGoodsNo, MessageResolver.getMessage("adminCommon.message.parameter.null",new String[]{"임시상품번호 확인불가"}));

        model.addAttribute("codeList", codeService.getStStdCd("PR042"));
        model.addAttribute("pregGoodsNo",pregGoodsNo);

        return "views/goods/goodsApprovalReturnView";
    }

    /**
     * 상품 승인 반려
     * @param request
     * @return
     * @throws Exception
     */
    @PostMapping("/goods/GoodsApprovalMgmt.returnGoods.do")
    @ResponseBody
    public JSONResponseEntity returnGoods (GoodsApprovalMgmtRequest request) throws Exception {
        goodsApprovalMgmtService.returnGoods(request);
        return new JSONResponseEntity(MessageResolver.getMessage("goodsApprovalMgmt.alert.msg.goodsReturnSuccessMsg"));
    }
}
