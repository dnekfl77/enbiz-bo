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
import com.enbiz.bo.app.dto.request.goods.GoodsItemMgmtRequest;
import com.enbiz.bo.app.dto.request.goods.GoodsItemMgmtSaveRequest;
import com.enbiz.bo.app.dto.request.realgrid.RealGridCUDRequest;
import com.enbiz.bo.app.dto.response.goods.GoodsItemMgmtResponse;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.service.code.CodeService;
import com.enbiz.bo.app.service.goods.GoodsItemMgmtService;
import com.enbiz.bo.base.annotation.RealGridCUD;
import com.enbiz.common.base.exception.MessageResolver;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 단품관리 Controller
 */
@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class GoodsItemMgmtController extends BaseController {

    private final GoodsItemMgmtService goodsItemMgmtService;
    private final CodeService codeService;

    /**
     * 단품관리 목록 화면
     * @param model
     * @return String
     * @throws Exception
     */
    @GetMapping("/goods/GoodsItemMgmt.goodsItemMgmtView.do")
    public String goodsItemMgmtView(Model model) throws Exception {
        model.addAttribute("codeList", codeService.getStStdCd("PR005,PR008"));
        return "views/goods/goodsItemMgmtView";
    }

    /**
     * 단품관리 목록 조회
     * @param request
     * @return
     * @throws Exception
     */
    @GetMapping("/goods/GoodsItemMgmt.getGoodsItemList.do")
    @ResponseBody
    public RealGridListResponse getGoodsItemList(GoodsItemMgmtRequest request) throws Exception {
        int totalCount = goodsItemMgmtService.getGoodsItemListCount(request);
        List<GoodsItemMgmtResponse> goodsItemList = goodsItemMgmtService.getGoodsItemList(request);
        return new RealGridListResponse(goodsItemList, totalCount);
    }

    /**
     * 단품품절알림 일괄변경 팝업 호출
     * @return String
     * @throws Exception
     */
    @GetMapping("/goods/GoodsItemMgmt.goodsItemSoldOutNotificationYnModifyView.do")
    public String goodsItemSoldOutNotificationYnModifyView() throws Exception {
        return "views/goods/goodsItemSoldOutNotificationYnModifyView";
    }

    /**
     * 재고수량 일괄변경 팝업 호출
     * @return String
     * @throws Exception
     */
    @GetMapping("/goods/GoodsItemMgmt.goodsItemStockQuantityModifyView.do")
    public String goodsItemStockQuantityModifyView() throws Exception {
        return "views/goods/goodsItemStockQuantityModifyView";
    }

    /**
     * 단품판매상태 일괄변경 팝업 호출
     * @return String
     * @throws Exception
     */
    @GetMapping("/goods/GoodsItemMgmt.goodsItemSaleStateModifyView.do")
    public String goodsItemSaleStateModifyView(Model model) throws Exception {
        model.addAttribute("codeList", codeService.getStStdCd("PR005"));
        return "views/goods/goodsItemSaleStateModifyView";
    }

    /**
     * 단품관리 목록 저장
     * @param realGridCUD
     * @return
     * @throws Exception
     */
    @PostMapping("/goods/GoodsItemMgmt.saveGoodsItemList.do")
    @ResponseBody
    public JSONResponseEntity saveGoodsItemList(
            @RealGridCUD(type = GoodsItemMgmtSaveRequest.class) RealGridCUDRequest<GoodsItemMgmtSaveRequest> realGridCUD) throws Exception{
        List<GoodsItemMgmtSaveRequest> updateList = realGridCUD.getUpdate();
        goodsItemMgmtService.saveGoodsItemList(updateList);
        return new JSONResponseEntity(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
    }
}
