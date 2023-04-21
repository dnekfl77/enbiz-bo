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
import com.enbiz.bo.app.dto.request.goods.GoodsQATemplateMgmtRequest;
import com.enbiz.bo.app.dto.request.realgrid.RealGridCUDRequest;
import com.enbiz.bo.app.dto.response.goods.GoodsQATemplateMgmtResponse;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.entity.PrGoodsQaAnsTmplInfo;
import com.enbiz.bo.app.service.goods.GoodsQATemplateMgmtService;
import com.enbiz.bo.base.annotation.RealGridCUD;
import com.enbiz.common.base.exception.MessageResolver;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 상품Q&A답변 템플릿관리 Controller
 */
@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class GoodsQATemplateMgmtController extends BaseController {

    private final GoodsQATemplateMgmtService goodsQATemplateMgmtService;

    /**
     * 상품Q&A 답변 템플릿 관리 화면 호출
     * @return
     * @throws Exception
     */
    @RequestMapping("/goods/GoodsQATemplateMgmt.goodsQATemplateMgmtView.do")
    public String goodsQATemplateMgmtView() throws Exception{
        return "views/goods/goodsQATemplateMgmtView";
    }

    /**
     * 상품Q&A 답변 템플릿 목록 조회
     * @param request
     * @return
     * @throws Exception
     */
    @GetMapping("/goods/GoodsQATemplateMgmt.getGoodsQATemplateList.do")
    @ResponseBody
    public RealGridListResponse getGoodsQATemplateList(GoodsQATemplateMgmtRequest request) throws Exception {
        int totalCount = goodsQATemplateMgmtService.getGoodsQATemplateListCount(request);
        List<GoodsQATemplateMgmtResponse> qaAnsTmplList = goodsQATemplateMgmtService.getGoodsQATemplateList(request);
        return new RealGridListResponse(qaAnsTmplList, totalCount);
    }

    /**
     * 상품Q&A 답변 템플릿 등록/수정 팝업 호출
     * @param ansTmplNm
     * @param ansTmplCont
     * @param model
     * @return
     * @throws Exception
     */
    @GetMapping("/goods/GoodsQATemplateMgmt.goodsQATemplateSaveView.do")
    public String goodsQATemplateSaveView(String ansTmplNm, String ansTmplCont, Model model) throws Exception{
        model.addAttribute("ansTmplNm", ansTmplNm);
        model.addAttribute("ansTmplCont", ansTmplCont);
        return "views/goods/goodsQATemplateSaveView";
    }

    /**
     * 상품Q&A 답변 템플릿 목록 저장
     * @param realGridCUD
     * @return
     * @throws Exception
     */
    @PostMapping("/goods/GoodsQATemplateMgmt.saveGoodsQATemplateList.do")
    @ResponseBody
    public JSONResponseEntity saveGoodsQATemplateList(@RealGridCUD(type = PrGoodsQaAnsTmplInfo.class) RealGridCUDRequest<PrGoodsQaAnsTmplInfo> realGridCUD) throws Exception {
        List<PrGoodsQaAnsTmplInfo> createList = realGridCUD.getCreate(), updateList = realGridCUD.getUpdate(), deleteList = realGridCUD.getDelete();
        goodsQATemplateMgmtService.saveGoodsQATemplateList(createList,updateList,deleteList);
        return new JSONResponseEntity(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
    }
}
