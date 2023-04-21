package com.enbiz.bo.app.controller.goods;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.enbiz.bo.app.controller.BaseController;
import com.enbiz.bo.app.dto.request.goods.GoodsInfoModificationHistoryRequest;
import com.enbiz.bo.app.dto.response.goods.GoodsInfoModificationHistoryResponse;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.service.code.CodeService;
import com.enbiz.bo.app.service.goods.GoodsInfoModificationHistoryService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 상품정보수정이력조회 Controller
 */
@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class GoodsInfoModificationHistoryController extends BaseController {

    private final CodeService codeService;
    private final GoodsInfoModificationHistoryService goodsInfoModificationHistoryService;

    /**
     * 상품정보수정이력조회 화면 호출
     * @param model
     * @return
     * @throws Exception
     */
    @RequestMapping("/goods/GoodsInfoModificationHistory.goodsInfoModificationHistoryView.do")
    public String goodsInfoModificationHistoryView(Model model) throws Exception {
        model.addAttribute("codeList", codeService.getStStdCd("PR038"));
        return "views/goods/goodsInfoModificationHistoryView";
    }

    /**
     * 상품정보수정이력 조회
     * @param request
     * @return
     * @throws Exception
     */
    @GetMapping("/goods/GoodsInfoModificationHistory.getGoodsInfoModificationHistoryList.do")
    @ResponseBody
    public RealGridListResponse getGoodsInfoModificationHistoryList(GoodsInfoModificationHistoryRequest request) throws Exception {
        int totalCount = goodsInfoModificationHistoryService.getGoodsInfoModificationHistoryListCount(request);
        List<GoodsInfoModificationHistoryResponse> goodsInfoModHistList = goodsInfoModificationHistoryService.getGoodsInfoModificationHistoryList(request);
        return new RealGridListResponse(goodsInfoModHistList, totalCount);
    }

    /**
     * 수정상품목록 조회
     * @param request
     * @return
     * @throws Exception
     */
    @GetMapping("/goods/GoodsInfoModificationHistory.getModifiedGoodsList.do")
    @ResponseBody
    public RealGridListResponse getModifiedGoodsList(GoodsInfoModificationHistoryRequest request) throws Exception {
        int totalCount = goodsInfoModificationHistoryService.getModifiedGoodsListCount(request);
        List<GoodsInfoModificationHistoryResponse> modGoodsList = goodsInfoModificationHistoryService.getModifiedGoodsList(request);
        return new RealGridListResponse(modGoodsList, totalCount);
    }
}
