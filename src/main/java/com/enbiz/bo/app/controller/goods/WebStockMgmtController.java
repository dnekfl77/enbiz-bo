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
import com.enbiz.bo.app.dto.request.goods.WebStockMgmtRequest;
import com.enbiz.bo.app.dto.request.realgrid.RealGridCUDRequest;
import com.enbiz.bo.app.dto.response.goods.WebStockMgmtResponse;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.entity.PrItmBase;
import com.enbiz.bo.app.service.code.CodeService;
import com.enbiz.bo.app.service.goods.WebStockMgmtService;
import com.enbiz.bo.base.annotation.RealGridCUD;
import com.enbiz.common.base.exception.MessageResolver;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 웹재고관리(위수탁) Controller
 */
@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class WebStockMgmtController extends BaseController {

    private final CodeService codeService;
    private final WebStockMgmtService webStockMgmtService;

    /**
     * 웹재고관리(위수탁) 화면 호출
     * @param model
     * @return
     * @throws Exception
     */
    @RequestMapping("/goods/WebStockMgmt.webStockMgmtView.do")
    public String webStkMgmtView(Model model) throws Exception {
        model.addAttribute("codeList", codeService.getStStdCd("PR005"));
        return "views/goods/webStockMgmtView";
    }

    /**
     * 웹재고관리 목록 조회
     * @param request
     * @return
     * @throws Exception
     */
    @GetMapping("/goods/WebStockMgmt.getWebStockList.do")
    @ResponseBody
    public RealGridListResponse getWebStockList(WebStockMgmtRequest request) throws Exception {
        int totalCount = webStockMgmtService.getWebStockListCount(request);
        List<WebStockMgmtResponse> webStkList = webStockMgmtService.getWebStockList(request);
        return new RealGridListResponse(webStkList, totalCount);
    }

    /**
     * 웹재고수량 변경
     * @param realGridCUD
     * @return
     * @throws Exception
     */
    @PostMapping("/goods/WebStockMgmt.modifyWebStockList.do")
    @ResponseBody
    public JSONResponseEntity modifyWebStockList(@RealGridCUD(type = PrItmBase.class) RealGridCUDRequest<PrItmBase> realGridCUD) throws Exception {
        List<PrItmBase> updateList = realGridCUD.getUpdate();
        webStockMgmtService.modifyWebStockList(updateList);
        return new JSONResponseEntity(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
    }
}
