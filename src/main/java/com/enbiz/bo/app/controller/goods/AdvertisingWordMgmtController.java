package com.enbiz.bo.app.controller.goods;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.enbiz.bo.app.controller.BaseController;
import com.enbiz.bo.app.dto.ajax.JSONResponseEntity;
import com.enbiz.bo.app.dto.request.goods.AdvertisingWordMgmtRequest;
import com.enbiz.bo.app.dto.request.realgrid.RealGridCUDRequest;
import com.enbiz.bo.app.dto.response.goods.AdvertisingWordMgmtResponse;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.entity.PrAdveWrdHist;
import com.enbiz.bo.app.service.goods.AdvertisingWordMgmtService;
import com.enbiz.bo.base.annotation.RealGridCUD;
import com.enbiz.common.base.exception.MessageResolver;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 홍보문구관리 Controller
 */
@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class AdvertisingWordMgmtController extends BaseController {

    private final AdvertisingWordMgmtService advertisingWordMgmtService;

    /**
     * 홍보 문구 화면 호출
     * @return
     * @throws Exception
     */
    @GetMapping("/goods/AdvertisingWordMgmt.AdvertisingWordMgmtView.do")
    public String prAdveWrdHist() throws Exception {
        return "views/goods/advertisingWordMgmtView";
    }

    /**
     * 홍보 문구 목록 조회
     * @param request
     * @return
     * @throws Exception
     */
    @GetMapping("/goods/AdvertisingWordMgmt.getAdvertisingWordList.do")
    @ResponseBody
    public RealGridListResponse getAdvertisingWordList(AdvertisingWordMgmtRequest request) throws Exception {
        int totalCount = advertisingWordMgmtService.getAdvertisingWordListCount(request);
        List<AdvertisingWordMgmtResponse> goodsItemList = advertisingWordMgmtService.getAdvertisingWordList(request);
        return new RealGridListResponse(goodsItemList, totalCount);
    }

    /**
     * 홍보 문구 변경
     * @param realGridCUD
     * @return
     * @throws Exception
     */
    @PostMapping("/goods/AdvertisingWordMgmt.saveAdvertisingWordList.do")
    @ResponseBody
    public JSONResponseEntity saveAdvertisingWordList(
            @RealGridCUD(type = PrAdveWrdHist.class) RealGridCUDRequest<PrAdveWrdHist> realGridCUD) throws Exception{
        List<PrAdveWrdHist> createList = realGridCUD.getCreate(), updateList = realGridCUD.getUpdate();
        advertisingWordMgmtService.saveAdvertisingWordList(createList,updateList);
        return new JSONResponseEntity(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
    }
}
