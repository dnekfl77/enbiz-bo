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
import com.enbiz.bo.app.dto.request.goods.OptionMgmtRequest;
import com.enbiz.bo.app.dto.request.realgrid.RealGridCUDRequest;
import com.enbiz.bo.app.dto.response.goods.OptionMgmtResponse;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.entity.PrOptnCd;
import com.enbiz.bo.app.entity.PrOptnClssCd;
import com.enbiz.bo.app.service.code.CodeService;
import com.enbiz.bo.app.service.goods.OptionMgmtService;
import com.enbiz.bo.base.annotation.RealGridCUD;
import com.enbiz.common.base.exception.MessageResolver;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 옵션관리 Controller
 */
@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class OptionMgmtController extends BaseController {

    private final OptionMgmtService optionMgmtService;
    private final CodeService codeService;

    /**
     * 옵션관리 화면 호출
     * @param model
     * @return
     * @throws Exception
     */
    @RequestMapping("/goods/OptionMgmt.optionMgmtView.do")
    public String optionMgmtView(Model model) throws Exception {
        model.addAttribute("codeList", codeService.getStStdCd("PR018,PR019"));
        return "views/goods/optionMgmtView";
    }

    /**
     * 옵션분류코드 목록 조회
     * @param request
     * @return
     * @throws Exception
     */
    @GetMapping("/goods/OptionMgmt.getOptionCategoryList.do")
    @ResponseBody
    public RealGridListResponse getOptionCategoryList(OptionMgmtRequest request) throws Exception {
        int totalCount = optionMgmtService.getOptionCategoryListCount(request);
        List<OptionMgmtResponse> goodsItemList = optionMgmtService.getOptionCategoryList(request);
        return new RealGridListResponse(goodsItemList, totalCount);
    }

    /**
     * 옵션코드 목록 조회
     * @param request
     * @return
     * @throws Exception
     */
    @GetMapping("/goods/OptionMgmt.getOptionList.do")
    @ResponseBody
    public RealGridListResponse getOptionList(OptionMgmtRequest request) throws Exception {
        int totalCount = optionMgmtService.getOptionListCount(request);
        List<OptionMgmtResponse> responseData = optionMgmtService.getOptionList(request);
        return new RealGridListResponse(responseData, totalCount);
    }

    /**
     * 옵션분류코드 목록 저장
     * @param realGridCUD
     * @return
     * @throws Exception
     */
    @PostMapping("/goods/OptionMgmt.saveOptionCategoryList.do")
    @ResponseBody
    public JSONResponseEntity saveOptionCategoryList(@RealGridCUD(type = PrOptnClssCd.class) RealGridCUDRequest<PrOptnClssCd> realGridCUD) throws Exception {
        List<PrOptnClssCd> createList = realGridCUD.getCreate(), updateList = realGridCUD.getUpdate();
        optionMgmtService.saveOptionCategoryList(createList, updateList);
        return new JSONResponseEntity(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
    }

    /**
     * 옵션코드 목록 저장
     * @param realGridCUD
     * @return
     * @throws Exception
     */
    @PostMapping("/goods/OptionMgmt.saveOptionList.do")
    @ResponseBody
    public JSONResponseEntity saveOptionList(@RealGridCUD(type = PrOptnCd.class) RealGridCUDRequest<PrOptnCd> realGridCUD) throws Exception {
        List<PrOptnCd> createList = realGridCUD.getCreate(), updateList = realGridCUD.getUpdate();
        optionMgmtService.saveOptionList(createList, updateList);
        return new JSONResponseEntity(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
    }
}
