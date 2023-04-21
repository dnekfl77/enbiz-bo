package com.enbiz.bo.app.controller.goods;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.enbiz.bo.app.constant.Constants;
import com.enbiz.bo.app.controller.BaseController;
import com.enbiz.bo.app.dto.ajax.JSONResponseEntity;
import com.enbiz.bo.app.dto.request.goods.GeneralGoodsRequest;
import com.enbiz.bo.app.dto.request.goods.GoodsPriceHistoryRequest;
import com.enbiz.bo.app.dto.request.goods.PackageGoodsRequest;
import com.enbiz.bo.app.dto.request.login.LoginRequest;
import com.enbiz.bo.app.dto.request.realgrid.RawRealGridCUDRequest;
import com.enbiz.bo.app.dto.response.goods.GoodsBaseResponse;
import com.enbiz.bo.app.dto.response.goods.GoodsPriceHistoryResponse;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.enums.PR001;
import com.enbiz.bo.app.enums.PR002;
import com.enbiz.bo.app.enums.PR008;
import com.enbiz.bo.app.enums.UR002;
import com.enbiz.bo.app.service.code.CodeService;
import com.enbiz.bo.app.service.goods.GoodsCommonService;
import com.enbiz.bo.base.annotation.RawRealGridCUD;
import com.enbiz.common.base.Validator;
import com.enbiz.common.base.exception.MessageResolver;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 상품 Controller
 */
@Controller
@Slf4j
@Lazy
@RequiredArgsConstructor
public class GoodsCommonController extends BaseController {

    private static final String READ_ONLY_PAGE_TYPE = "R";  // 읽기전용
    private static final String EDIT_PAGE_TYPE = "E";       // 편집가능(MD외 편집불가)

    private static final String GEN_GOODS_MIN_PRICE = "100";
    private static final String GFT_GOODS_MIN_PRICE = "0";

    private final GoodsCommonService goodsCommonService;
    private final CodeService codeService;

    /**
     * 일반 상품 상세 팝업 호출
     * @param model
     * @param type
     * @param goodsNo
     * @return
     * @throws Exception
     */
    @RequestMapping("/goods/GoodsCommon.goodsView.do")
    public String goodsView(Model model, @RequestParam(required = false) String type,
                                   @RequestParam(required = false) String goodsNo, @AuthenticationPrincipal LoginRequest loginRequest ) throws Exception {

        String returnUrl = "", codeList = "";

        Validator.throwIfEmpty( type, MessageResolver.getMessage("adminCommon.message.parameter.null", new String[] {"편집가능여부 확인불가"}));
        Validator.throwIfEmpty( goodsNo , MessageResolver.getMessage("adminCommon.message.parameter.null", new String[] {"상품번호 확인불가"}));

        // MD 사용자 이외 편집 불가
        if(!UR002.MD.isEquals(loginRequest.getJobGrpCd())) type = READ_ONLY_PAGE_TYPE;
        //model.addAttribute("pageType", type.trim().toUpperCase());
        model.addAttribute("pageType", EDIT_PAGE_TYPE); // 테스트

        /**
         * 상품정보조회
         */
        GoodsBaseResponse goodsBaseInfo = goodsCommonService.getGoodsBaseInfo(goodsNo);

        if (PR001.GEN_GOODS.isEquals(goodsBaseInfo.getGoodsCompCd())) {

            /**
             * 일반상품 정보 조회
             */
            model.addAttribute("goodsInfo", goodsCommonService.getGeneralGoodsInfo(goodsBaseInfo) );

            /**
             * 상품고시품목정보 조회
             *  - 상품고시항목코드 목록
             *  - 안전인증대상여부
             *  - 안전인증구분코드
             */
            model.addAttribute("goodsNotiItemCodeList", goodsCommonService.getGoodsNotificationItemList(goodsBaseInfo.getGoodsNotiLisartCd()));
            model.addAttribute("safeCertiNeedYn", goodsBaseInfo.getSafeCertiTgtYn());
            model.addAttribute("safeCertiGbCdList", codeService.getStStdCd("PR026").get("PR026"));

            /**
             * 배송정보 조회
             *  - 반품비/베송비 정책 목록
             *  - 센터배송일 경우 : 0
             */
            model.addAttribute("deliPolcList", goodsCommonService.getDeliveryPolicyList(
                    PR008.CNTR_DLV.isEquals(goodsBaseInfo.getDeliProcTypCd()) ? Constants.CNTR_DLV_BASE_ENTR_NO : goodsBaseInfo.getEntrNo()));

            /**
             * 가격 변경 예약건이 있는지 여부 조회
             */
            model.addAttribute("isReserved", goodsCommonService.checkGoodsReservedPriceHistoryYn(goodsNo));

            /**
             * 공통 코드 조회
             *   예약중단사유코드 : PR034
             *   판매상태코드 : PR005
             *   구입자나이제한코드  : PR004
             *   상품고시품목코드 : PR012
             *   매입형태코드 : PR006
             *   과면세구분코드 : PR007
             *   가격변경사유코드 : PR033
             *   결제가능수단코드 : OM013
             *   배송처리유형 : PR008
             *   배송상품구분코드 : PR010
             *   배송수단코드 : PR009
             *
             *   판매상태코드 : PR005
             *   묶음상품우선순위코드 : PR035
             */
            codeList = "PR034,PR005,PR004,PR012,PR006,PR007,PR033,OM013,PR008,PR010,PR009";
            returnUrl = "views/goods/generalGoodsView";

        } else if (PR001.PKG_GOODS.isEquals(goodsBaseInfo.getGoodsCompCd())) {

            /**
             * 묶음상품 정보 조회
             */
            model.addAttribute("goodsInfo", goodsCommonService.getPackageGoodsInfo(goodsBaseInfo) );

            /**
             * 공통 코드 조회
             *   판매상태코드 : PR005
             *   묶음상품우선순위코드 : PR035
             */
            codeList = "PR005,PR035";
            returnUrl = "views/goods/packageGoodsView";
        }

        model.addAttribute("codeList", codeService.getStStdCd(codeList));
        return returnUrl;
    }

    /**
     * 일반 상품 상세 > 가격 이력 목록 조회
     * @param request
     * @return 상품 가격 이력 목록
     * @throws Exception
     */
    @GetMapping("/goods/GoodsCommon.getGeneralGoodsPriceHistList.do")
    @ResponseBody
    public RealGridListResponse getGeneralGoodsPriceHistList(GoodsPriceHistoryRequest request) throws Exception {
        int totalCount = goodsCommonService.getGeneralGoodsPriceHistoryListCount(request);
        List<GoodsPriceHistoryResponse> goodsPriceHistList = goodsCommonService.getGeneralGoodsPriceHistoryList(request);
        return new RealGridListResponse(goodsPriceHistList, totalCount);
    }

    /**
     * 일반 상품 상세 > 가격 변경 예약 팝업 호출
     * @param model
     * @param goodsNo
     * @param goodsTypCd 상품 유형
     * @return
     * @throws Exception
     */
    @RequestMapping("/goods/GoodsCommon.generalGoodsPriceReservationModifyView.do")
    public String generalGoodsPriceReservationModifyView(Model model, @RequestParam(required = false) String goodsNo,
                                          @RequestParam(required = false) String goodsTypCd ) throws Exception {

        Validator.throwIfEmpty( goodsNo     , MessageResolver.getMessage("adminCommon.message.parameter.null", new String[] {"상품번호 확인불가"}));
        Validator.throwIfEmpty( goodsTypCd  , MessageResolver.getMessage("adminCommon.message.parameter.null", new String[] {"상품유형 확인불가"}));

        String minPrice = "0";
        if ( PR002.GEN_GOODS.isEquals(goodsTypCd) ) minPrice = GEN_GOODS_MIN_PRICE;
        if ( PR002.GFT_GOODS.isEquals(goodsTypCd) ) minPrice = GFT_GOODS_MIN_PRICE;

        model.addAttribute("priceInfo", goodsCommonService.getPresentGoodsPriceHistory(goodsNo));
        model.addAttribute("minPrice" , minPrice);
        model.addAttribute("codeList" , codeService.getStStdCd("PR033"));

        return "views/goods/generalGoodsPriceReservationModifyView";
    }

    /**
     * 일반 상품 상세 > 가격 변경 예약 팝업 > 가격 변경 예약
     * @param request
     * @return
     * @throws Exception
     */
    @PostMapping("/goods/GoodsCommon.modifyGeneralGoodsPriceReservation.do")
    @ResponseBody
    public JSONResponseEntity modifyGeneralGoodsPriceReservation(GoodsPriceHistoryRequest request) throws Exception {
        goodsCommonService.modifyGoodsPriceReservation(request);
        return new JSONResponseEntity(MessageResolver.getMessage("generalGoods.priceInfo.prcRsvModPopup.alert.msg.reservePrcChgSuccessMsg"));
    }

    /**
     * 일반상품 상세 > 일반상품 수정
     * @param rawCUDRequest
     * @param request
     * @return
     * @throws Exception
     */
    @PostMapping("/goods/GoodsCommon.modifyGeneralGoods.do")
    @ResponseBody
    public JSONResponseEntity modifyGeneralGoods(@RawRealGridCUD RawRealGridCUDRequest rawCUDRequest, GeneralGoodsRequest request) throws Exception {
        goodsCommonService.modifyGeneralGoods(rawCUDRequest, request);
        return new JSONResponseEntity(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
    }

    /**
     * 묶음상품 상세 > 묶음상품 수정
     * @param rawCUDRequest
     * @param request
     * @return
     * @throws Exception
     */
    @PostMapping("/goods/GoodsCommon.modifyPackageGoods.do")
    @ResponseBody
    public JSONResponseEntity modifyPackageGoods(@RawRealGridCUD RawRealGridCUDRequest rawCUDRequest, PackageGoodsRequest request) throws Exception {
        goodsCommonService.modifyPackageGoods(rawCUDRequest, request);
        return new JSONResponseEntity(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
    }
}
