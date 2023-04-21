package com.enbiz.bo.app.controller.goods;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.enbiz.bo.app.constant.Constants;
import com.enbiz.bo.app.controller.BaseController;
import com.enbiz.bo.app.dto.ajax.JSONResponseEntity;
import com.enbiz.bo.app.dto.request.goods.DeliveryPolicyRequest;
import com.enbiz.bo.app.dto.request.goods.GoodsNotificationItemRequest;
import com.enbiz.bo.app.dto.request.goods.GoodsOptionRequest;
import com.enbiz.bo.app.dto.request.goods.StandardCategoryDisplayRequest;
import com.enbiz.bo.app.dto.request.goods.TemporaryGeneralGoodsRequest;
import com.enbiz.bo.app.dto.request.realgrid.RawRealGridCUDRequest;
import com.enbiz.bo.app.dto.response.goods.DeliveryPolicyResponse;
import com.enbiz.bo.app.dto.response.goods.GoodsOptionResponse;
import com.enbiz.bo.app.dto.response.goods.StandardCategoryDisplayResponse;
import com.enbiz.bo.app.dto.response.goods.TemporaryGeneralGoodsResponse;
import com.enbiz.bo.app.entity.PrPregGoodsContInfo;
import com.enbiz.bo.app.entity.StStdCd;
import com.enbiz.bo.app.enums.PR006;
import com.enbiz.bo.app.enums.PR008;
import com.enbiz.bo.app.enums.PR024;
import com.enbiz.bo.app.enums.common.AttacheFileKind;
import com.enbiz.bo.app.service.code.CodeService;
import com.enbiz.bo.app.service.common.AdminCommonService;
import com.enbiz.bo.app.service.goods.TemporaryGeneralGoodsService;
import com.enbiz.bo.base.annotation.RawRealGridCUD;
import com.enbiz.common.base.Validator;
import com.enbiz.common.base.exception.MessageResolver;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 임시 일반상품 Controller
 */
@Controller
@Slf4j
@Lazy
@RequiredArgsConstructor
public class TemporaryGeneralGoodsController extends BaseController {

    private final TemporaryGeneralGoodsService temporaryGeneralGoodsService;
    private final AdminCommonService adminCommonService;
    private final CodeService codeService;

    /**
     * 임시 일반상품화면 호출
     * @param model
     * @param pageType
     * @return 임시 일반상품 등록화면
     * @throws Exception
     */
    @RequestMapping("/goods/TemporaryGeneralGoods.temporaryGeneralGoodsView.do")
    public String temporaryGeneralGoodsView(Model model, @RequestParam(required = false) String pageType
            , @RequestParam(required = false) String pregGoodsNo) throws Exception {

        /**
         * PageType
         * A : 상품등록
         * B : 상품등록(위수탁)
         * C : 임시상품상세
         */
        Validator.throwIfEmpty(pageType, MessageResolver.getMessage("adminCommon.message.parameter.null", new String[] {"pageType 확인불가"}));
        String pType = pageType.trim().toUpperCase();

        TemporaryGeneralGoodsResponse response = new TemporaryGeneralGoodsResponse();
        List<DeliveryPolicyResponse> deliPolcList = new ArrayList<>();


        switch ( pType ) {
            case "A" :
                response.setBuyTypCd(PR006.DIRC_PUR.getCd());      // 매입형태 : 직매입
                response.setDeliProcTypCd(PR008.CNTR_DLV.getCd()); // 배송처리유형 : 센터배송
                response.setPregStatCd(PR024.SAVED.getCd());       // 승인상태 : 임시저장

                // 배송비 & 반품비 정책
                DeliveryPolicyRequest deliveryPolicyRequest = new DeliveryPolicyRequest(Constants.CNTR_DLV_BASE_ENTR_NO);
                deliPolcList = temporaryGeneralGoodsService.getDeliveryPolicyList(deliveryPolicyRequest);
                break;
            case "B" :
                response.setBuyTypCd(PR006.CNSG_PUR.getCd());      // 매입형태 : 위탁판매
                response.setDeliProcTypCd(PR008.CORP_DLV.getCd()); // 배송처리유형 : 업체배송
                response.setPregStatCd(PR024.SAVED.getCd());       // 승인상태 : 임시저장
                break;
            case "C" :
                Validator.throwIfEmpty(pregGoodsNo  , MessageResolver.getMessage("adminCommon.message.parameter.null", new String[] {"임시상품번호 확인불가"}));
                response = temporaryGeneralGoodsService.getTemporaryGeneralGoodsInfo(pregGoodsNo.trim());
                break;
        }

        model.addAttribute("pageType", pType);
        model.addAttribute("goodsInfo", response);
        model.addAttribute("deliPolcList", deliPolcList);

        /**
         * 공통 코드 조회
         *   가등록상태코드 : PR024
         *   반려사유코드 : PR042
         *   구입자나이제한코드  : PR004
         *   상품고시품목코드 : PR012
         *   안전인증구분코드 : PR026
         *
         *   매입형태코드 : PR006
         *   과면세구분코드 : PR007
         *   결제가능수단코드 : OM013
         *
         *   배송처리유형 : PR008
         *   배송상품구분코드 : PR010
         *   배송수단코드 : PR009
         */
        Map<String, List<StStdCd>> codeList = codeService.getStStdCd("PR024,PR042,PR004,PR012,PR026,PR006,PR007,OM013,PR008,PR010,PR009");
        model.addAttribute("codeList", codeList);

        return "views/goods/temporaryGeneralGoodsView";
    }

    /**
     * 상품고시항목 목록 조회
     * @param model
     * @param request
     * @return 상품고시항목 목록
     * @throws Exception
     */
    @RequestMapping("/goods/TemporaryGeneralGoods.getGoodsNotificationItemList.do")
    public String getGoodsNotificationItemList(Model model, GoodsNotificationItemRequest request) throws Exception {

        model.addAttribute("goodsNotiItemCodeList", temporaryGeneralGoodsService.getGoodsNotificationItemList(request.getGoodsNotiLisartCd()));
        model.addAttribute("safeCertiNeedYn", request.getSafeCertiNeedYn());

        //공통 코드 조회 -> 안전인증구분코드 : PR026
        model.addAttribute("safeCertiGbCdList", codeService.getStStdCd("PR026").get("PR026"));

        return "fragments/goods/goods-announcementInfo-itemInfo :: goods-announcementInfo-itemInfo";
    }

    /**
     * 배송비/반품비 정책 목록 조회
     * @param request
     * @return 반품비/배송비 정책 목록
     * @throws Exception
     */
    @GetMapping("/goods/TemporaryGeneralGoods.getDeliveryPolicyList.do")
    @ResponseBody
    public List<DeliveryPolicyResponse> getDeliveryPolicyList(DeliveryPolicyRequest request) throws Exception {
        return temporaryGeneralGoodsService.getDeliveryPolicyList(request);
    }

    /**
     * 옵션분류 목록 조회
     * @param request
     * @return 옵션분류 목록
     * @throws Exception
     */
    @GetMapping("/goods/TemporaryGeneralGoods.getOptionCategoryList.do")
    @ResponseBody
    public List<GoodsOptionResponse> getOptionCategoryList(GoodsOptionRequest request) throws Exception {
        return temporaryGeneralGoodsService.getOptionCategoryList(request);
    }

    /**
     * 옵션목록 조회
     * @param request
     * @return 옵션목록
     * @throws Exception
     */
    @GetMapping("/goods/TemporaryGeneralGoods.getOptionList.do")
    @ResponseBody
    public List<GoodsOptionResponse> getOptionList(GoodsOptionRequest request) throws Exception {
        return temporaryGeneralGoodsService.getOptionList(request);
    }

    /**
     * 표준카테고리별 전시카테고리 목록 조회
     * @param request
     * @return 표준카테고리별 전시카테고리 목록
     * @throws Exception
     */
    @GetMapping("/goods/TemporaryGeneralGoods.getDisplayCategoryListByStandardCategory.do")
    @ResponseBody
    public List<StandardCategoryDisplayResponse> getDisplayCategoryListByStandardCategory(StandardCategoryDisplayRequest request) throws Exception {
        List<StandardCategoryDisplayResponse> result = temporaryGeneralGoodsService.getDisplayCategoryListByStandardCategory(request);
        return result;
    }

    /**
     * 임시 일반상품 등록
     * @param rawCUDRequest
     * @param request
     * @return
     * @throws Exception
     */
    @PostMapping("/goods/TemporaryGeneralGoods.registTemporaryGeneralGoods.do")
    @ResponseBody
    public JSONResponseEntity registTemporaryGeneralGoods(@RawRealGridCUD RawRealGridCUDRequest rawCUDRequest, TemporaryGeneralGoodsRequest request ) throws Exception {

        Validator.throwIfNull(request, MessageResolver.getMessage("adminCommon.message.parameter.null", new String[]{"상품정보 확인불가"}));

        String message = (PR024.IN_PROCESS.isEquals(request.getPregStatCd())) ?
                "generalGoods.alert.msg.approvalRequestSuccessMsg" : "adminCommon.message.saved.successfully";

        temporaryGeneralGoodsService.registTemporaryGeneralGoods(rawCUDRequest, request);

        return new JSONResponseEntity(MessageResolver.getMessage(message));
    }

    /**
     * 임시 일반상품 수정
     * @param rawCUDRequest
     * @param request
     * @return
     * @throws Exception
     */
    @PostMapping("/goods/TemporaryGeneralGoods.modifyTemporaryGeneralGoods.do")
    @ResponseBody
    public JSONResponseEntity modifyTemporaryGeneralGoods(@RawRealGridCUD RawRealGridCUDRequest rawCUDRequest, TemporaryGeneralGoodsRequest request ) throws Exception {

        Validator.throwIfNull(request, MessageResolver.getMessage("adminCommon.message.parameter.null", new String[]{"상품정보 확인불가"}));

        String message = (PR024.IN_PROCESS.isEquals(request.getPregStatCd())) ?
                "generalGoods.alert.msg.approvalRequestSuccessMsg" : "adminCommon.message.saved.successfully";

        temporaryGeneralGoodsService.modifyTemporaryGeneralGoods(rawCUDRequest, request);

        return new JSONResponseEntity(MessageResolver.getMessage(message));
    }

    /**
     * 임시 일반상품 이미지 업로드
     * @param file 이미지 목록
     * @param param ( type = 파일경로, imgGbCd = 이미지구분코드 )
     * @param model
     * @return PrPregGoodsContInfo
     * @throws Exception
     */
    @PostMapping("/goods/TemporaryGeneralGoods.uploadTemporaryGeneralGoodsImage.do")
    @ResponseBody
    public List<PrPregGoodsContInfo> uploadGoodsRegistImageFile(@RequestParam(required = false) List<MultipartFile> file, @RequestParam Map<String, String> param, Model model) throws Exception {

        List<PrPregGoodsContInfo> prPregGoodsContInfoList = new ArrayList<>();

        if( file != null ) {
            for (MultipartFile multipartFile : file) {
                Map<String, String> resultImageMap = adminCommonService.uploadMultipartFile(multipartFile, AttacheFileKind.GOODS, false);
                PrPregGoodsContInfo prPregGoodsContInfo = new PrPregGoodsContInfo();
                prPregGoodsContInfo.setContFileNm(resultImageMap.get("I_FILE_TITLE"));      // 컨텐츠파일명
                prPregGoodsContInfo.setContFilePathNm(resultImageMap.get("I_FILE_URL"));    // 컨텐츠파일경로
                prPregGoodsContInfo.setImgGbCd(param.get("imgGbCd"));                       // 이미지구분코드
                prPregGoodsContInfo.setCmtTypCd(param.get("cmtTypCd"));                     // 컨텐츠유형코드
                prPregGoodsContInfoList.add(prPregGoodsContInfo);
            }
        }
        return prPregGoodsContInfoList;
    }
}
