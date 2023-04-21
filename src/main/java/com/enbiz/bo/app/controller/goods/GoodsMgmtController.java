package com.enbiz.bo.app.controller.goods;
import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.enbiz.bo.app.controller.BaseController;
import com.enbiz.bo.app.dto.request.goods.GoodsMgmtRequest;
import com.enbiz.bo.app.dto.response.goods.GoodsMgmtResponse;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.service.code.CodeService;
import com.enbiz.bo.app.service.goods.GoodsMgmtService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 상품 관리 Controller
 */
@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class GoodsMgmtController extends BaseController {

    private final GoodsMgmtService goodsMgmtService;
    private final CodeService codeService;

    /**
     * 상품관리 화면 호출
     * @param model
     * @return
     * @throws Exception
     * GoodsMgmt
     */
    @RequestMapping("/goods/GoodsMgmt.goodsMgmtView.do")
    public String goodsMgmtView(Model model, GoodsMgmtRequest goodsMgmtRequest) throws Exception {

        model.addAttribute("codeList", codeService.getStStdCd("PR005,PR001,PR002,PR003,PR006,PR008,PR010"));
        model.addAttribute("goodsMgmtRequest", goodsMgmtRequest);
        return "views/goods/goodsMgmtView";
    }

    /**
     * 상품 목록 조회
     * @param request
     * @return
     * @throws Exception
     * goods/GoodsMgmt.getGoodsList.do
     */
    @GetMapping("/goods/GoodsMgmt.getGoodsList.do")
    @ResponseBody
    public RealGridListResponse getGoodsList(GoodsMgmtRequest request) throws Exception {
        int totalCount = goodsMgmtService.getGoodsListCount(request);
        List<GoodsMgmtResponse> goodsList = goodsMgmtService.getGoodsList(request);
        return new RealGridListResponse(goodsList, totalCount);
    }
}



