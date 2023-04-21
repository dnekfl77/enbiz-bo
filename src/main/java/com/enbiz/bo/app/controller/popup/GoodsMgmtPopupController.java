package com.enbiz.bo.app.controller.popup;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.context.annotation.Lazy;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.enbiz.bo.app.controller.BaseController;
import com.enbiz.bo.app.dto.request.popup.GoodsPopupRequest;
import com.enbiz.bo.app.dto.response.popup.GoodsPopupResponse;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.entity.StStdCd;
import com.enbiz.bo.app.service.code.CodeService;
import com.enbiz.bo.app.service.popup.GoodsMgmtPopupService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 상품 팝업 Controller
 */
@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class GoodsMgmtPopupController extends BaseController {

    
    private final GoodsMgmtPopupService goodsManagementPopupService;
    private final CodeService codeService;

    /**
     * 상품고시품목 조회 팝업 호출
     *
     * @return 상품고시품목 조회 팝업 화면, 상품 고시 품목 목록
     * @throws Exception
     */
    @GetMapping("/popup/goodsMgmtPopup.goodsNotiLisartCdListPopup.do")
    public String goodsNotiLisartCdListPopup(Model model) throws Exception {

        List<StStdCd> codeList = codeService.getStStdCd("PR012").get("PR012");
        RealGridListResponse response = new RealGridListResponse(codeList, codeList.size());
        model.addAttribute("goodsNotiLisartCdList", response.toJsonString());

        return "views/popup/goodsNotiLisartCdListPopup";
    }

    /**
     * 상품 조회 팝업 호출
     * @param model
     * @return 상품 조회 팝업 화면, 공통코드 목록
     * @throws Exception
     */
    @GetMapping("/popup/goodsMgmtPopup.goodsListPopup.do")
    public String goodsListPopup(Model model, @Valid GoodsPopupRequest goodsPopupRequest) throws Exception {

        // 판매상태코드(PR005), 상품구성코드(PR001), 상품유형코드(PR002)
        // 판매방식코드(PR003), 매입형태코드(PR006), 배송처리유형(PR008)
        Map<String, List<StStdCd>> codeList = codeService.getStStdCd("PR005,PR001,PR002,PR003,PR006,PR008");
        model.addAttribute("codeList", codeList);
        model.addAttribute("requestData", goodsPopupRequest);

        // 판매상태코드 옵션 값 설정
        if(goodsPopupRequest.getArgSaleState() != null) {
            if(!goodsPopupRequest.getArgSaleState().equals("")) {
                String[] argSaleStateList = goodsPopupRequest.getArgSaleState().split(",");
                Map<String, String> resultSaleState = new HashMap<>();

                for(int j=0; j<argSaleStateList.length; j++){
                    for(int i=0; i<codeList.get("PR005").size(); i++){
                        if(argSaleStateList[j].equals( codeList.get("PR005").get(i).getCd() )){
                            resultSaleState.put(codeList.get("PR005").get(i).getCdNm(), codeList.get("PR005").get(i).getCd());
                            break;
                        }
                    }
                }
                model.addAttribute("saleStateList", resultSaleState);
            }
        }

        return "views/popup/goodsListPopup";
    }

    /**
     * 상품 목록 조회
     * @param goodsPopupRequest
     * @return 상품목록
     * @throws Exception
     */
    @GetMapping(value="popup/goodsMgmtPopup.getGoodsList.do", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public RealGridListResponse getGoodsList(GoodsPopupRequest goodsPopupRequest) throws Exception {
        int totalCount = goodsManagementPopupService.getGoodsListCount(goodsPopupRequest);
        List<GoodsPopupResponse> goodsList = goodsManagementPopupService.getGoodsList(goodsPopupRequest);
        RealGridListResponse response = new RealGridListResponse(goodsList, totalCount);
        return response;
    }
}
