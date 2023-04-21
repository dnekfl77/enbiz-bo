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
import com.enbiz.bo.app.dto.request.goods.GoodsTemporarySaveMgmtRequest;
import com.enbiz.bo.app.dto.response.goods.GoodsTemporarySaveMgmtResponse;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.service.code.CodeService;
import com.enbiz.bo.app.service.goods.GoodsTemporarySaveMgmtService;
import com.enbiz.common.base.exception.MessageResolver;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 상품임시저장관리 Controller
 */
@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class GoodsTemporarySaveMgmtController extends BaseController {

    private final GoodsTemporarySaveMgmtService goodsTemporarySaveMgmtService;
    private final CodeService codeService;

    /**
     * 상품임시저장관리 화면 호출
     * @return
     * @throws Exception
     *
     */
    @RequestMapping("/goods/GoodsTemporarySaveMgmt.goodsTemporarySaveMgmtView.do")
    public String goodsTemporarySaveMgmtView(Model model) throws Exception{
        model.addAttribute("codeList", codeService.getStStdCd("PR024,PR001,PR003,PR002,PR006"));
        return "views/goods/goodsTemporarySaveMgmtView";
    }

    /**
     * 상품임시저장 목록 조회
     * @param request
     * @return
     * @throws Exception
     */
    @GetMapping("/goods/GoodsTemporarySaveMgmt.getGoodsTemporarySaveList.do")
    @ResponseBody
    public RealGridListResponse getGoodsTemporarySaveList(GoodsTemporarySaveMgmtRequest request) throws Exception {

        if(request.getPregGoodsNoList() != null && !"".equals(request.getPregGoodsNoList())){
            request.setPregGoodsNoArray(request.getPregGoodsNoList().split("\r\n"));
        }

        int totalCount = goodsTemporarySaveMgmtService.getGoodsTemporarySaveListCount(request);
        List<GoodsTemporarySaveMgmtResponse> tempSaveGoodsList = goodsTemporarySaveMgmtService.getGoodsTemporarySaveList(request);
        return new RealGridListResponse(tempSaveGoodsList, totalCount);
    }

    /**
     * 임시 저장 상품 삭제
     * @param request
     * @return
     * @throws Exception
     */
    @PostMapping("/goods/GoodsTemporarySaveMgmt.deleteTemporarySaveGoods.do")
    @ResponseBody
    public JSONResponseEntity deleteTemporarySaveGoods(GoodsTemporarySaveMgmtRequest request) throws Exception {
        goodsTemporarySaveMgmtService.deleteTemporarySaveGoods(request);
        return new JSONResponseEntity(MessageResolver.getMessage("adminCommon.message.deleted.successfully"));
    }

    /**
     * 임시 저장 상품 승인요청
     * @param request
     * @return
     * @throws Exception
     */
    @PostMapping("/goods/GoodsTemporarySaveMgmt.requestTemporarySaveGoodsApproval.do")
    @ResponseBody
    public JSONResponseEntity requestTemporarySaveGoodsApproval(GoodsTemporarySaveMgmtRequest request) throws Exception {
        goodsTemporarySaveMgmtService.requestTemporarySaveGoodsApproval(request);
        return new JSONResponseEntity(MessageResolver.getMessage("goodsTemporarySaveMgmt.alert.msg.approvalSuccessMsg"));
    }
}
