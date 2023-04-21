package com.enbiz.bo.app.controller.goods;

import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.enbiz.bo.app.controller.BaseController;
import com.enbiz.bo.app.dto.ajax.JSONResponseEntity;
import com.enbiz.bo.app.dto.request.goods.PackageTargetGoodsRequest;
import com.enbiz.bo.app.dto.request.goods.TemporaryPackageGoodsRequest;
import com.enbiz.bo.app.dto.request.realgrid.RawRealGridCUDRequest;
import com.enbiz.bo.app.dto.response.goods.PackageTargetGoodsResponse;
import com.enbiz.bo.app.dto.response.goods.TemporaryPackageGoodsResponse;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.entity.StStdCd;
import com.enbiz.bo.app.enums.PR001;
import com.enbiz.bo.app.enums.PR002;
import com.enbiz.bo.app.enums.PR003;
import com.enbiz.bo.app.enums.PR006;
import com.enbiz.bo.app.enums.PR008;
import com.enbiz.bo.app.enums.PR024;
import com.enbiz.bo.app.service.code.CodeService;
import com.enbiz.bo.app.service.goods.TemporaryPackageGoodsService;
import com.enbiz.bo.base.annotation.RawRealGridCUD;
import com.enbiz.common.base.Validator;
import com.enbiz.common.base.exception.MessageResolver;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 임시 묶음상품 Controller
 */
@Controller
@Slf4j
@Lazy
@RequiredArgsConstructor
public class TemporaryPackageGoodsController extends BaseController {

    private final TemporaryPackageGoodsService temporaryPackageGoodsService;
    private final CodeService codeService;

    /**
     * 묶음 상품 등록 /임시 상세 화면 호출
     * @param model
     * @param pageType
     * @return
     * @throws Exception
     */
    @RequestMapping("/goods/TemporaryPackageGoods.temporaryPackageGoodsView.do")
    public String temporaryPackageGoodsView(Model model, @RequestParam(required = false) String pageType
            , @RequestParam(required = false) String pregGoodsNo) throws Exception {

        /**
         * PageType
         * R : 묶음상품등록
         * U : 임시묶음상품상세
         */
        Validator.throwIfEmpty(pageType, MessageResolver.getMessage("adminCommon.message.parameter.null", new String[] {"pageType 확인불가"}));
        String pType = pageType.trim().toUpperCase();

        TemporaryPackageGoodsResponse response = new TemporaryPackageGoodsResponse();
        response.setPregStatCd(PR024.SAVED.getCd()); // 승인상태 : 임시저장

        if ("U".equals(pType)){
            Validator.throwIfEmpty(pregGoodsNo.trim()  , MessageResolver.getMessage("adminCommon.message.parameter.null", new String[] {"임시상품번호 확인불가"}));
            response = temporaryPackageGoodsService.getTemporaryPackageGoodsInfo(pregGoodsNo);
        }

        model.addAttribute("pageType", pType);
        model.addAttribute("pkgGoodsInfo", response);

        /**
         * 공통 코드 조회
         *  가등록상태코드 : PR024
         *  반려사유코드 : PR042
         *  묶음상품우선순위코드 : PR035
         */
        Map<String, List<StStdCd>> codeList = codeService.getStStdCd("PR024,PR042,PR035");
        model.addAttribute("codeList", codeList);

        return "views/goods/temporaryPackageGoodsView";
    }

    /**
     * 묶음상품 대상 상품 추가 팝업
     * @param entrNo
     * @param model
     * @return
     * @throws Exception
     */
    @GetMapping("/goods/TemporaryPackageGoods.temporaryPackageTargetGoodsView.do")
    public String temporaryPackageGoodsTargetGoodsListView(String entrNo, Model model) throws Exception {

        Validator.throwIfEmpty(entrNo, MessageResolver.getMessage("adminCommon.message.parameter.null", new String[] {"대표거래처 번호 확인불가"}));

        model.addAttribute("codeList", codeService.getStStdCd("PR005")); // 판매상태코드(PR005)
        model.addAttribute("entrNo",entrNo);

        return "views/goods/temporaryPackageTargetGoodsView";
    }

    /**
     * 묶음대상 상품목록 조회
     * @param request
     * @return
     * @throws Exception
     */
    @GetMapping("/goods/TemporaryPackageGoods.getPackageTargetGoodsList.do")
    @ResponseBody
    public RealGridListResponse getPackageTargetGoodsList(PackageTargetGoodsRequest request) throws Exception {

        request.setGoodsCompCd(PR001.GEN_GOODS.getCd());  // 상품구성
        request.setGoodsTypCd(PR002.GEN_GOODS.getCd());   // 상품유형
        request.setSaleMethCd(PR003.NORMAL_SALE.getCd()); // 판매방식
        request.setBuyTypCd(PR006.CNSG_PUR.getCd());      // 매입형태
        request.setDeliProcTypCd(PR008.CORP_DLV.getCd()); // 배송처리유형

        int totalCount = temporaryPackageGoodsService.getPackageTargetGoodsListCount(request);
        List<PackageTargetGoodsResponse> pkgGoodsList = temporaryPackageGoodsService.getPackageTargetGoodsList(request);
        return new RealGridListResponse(pkgGoodsList, totalCount);
    }
    
    /**
     * 임시 묶음상품 등록 / 수정
     * @param rawCUDRequest
     * @param request
     * @return
     * @throws Exception
     */
    @PostMapping("/goods/TemporaryPackageGoods.saveTemporaryPackageGoods.do")
    @ResponseBody
    public JSONResponseEntity saveTemporaryPackageGoods(@RawRealGridCUD RawRealGridCUDRequest rawCUDRequest, TemporaryPackageGoodsRequest request ) throws Exception {

        String message = (PR024.IN_PROCESS.isEquals(request.getPregStatCd())) ?
                "packageGoods.alert.msg.approvalRequestSuccessMsg"   // 승인요청
                : "adminCommon.message.saved.successfully";          // 임시저장

        if ( StringUtils.isBlank(request.getPregGoodsNo()) ) {
            temporaryPackageGoodsService.temporaryPackageGoodsRegist(rawCUDRequest, request); // 등록
        } else {
            temporaryPackageGoodsService.temporaryPackageGoodsUpdate(rawCUDRequest, request); // 수정
        }

        return new JSONResponseEntity(MessageResolver.getMessage(message));
    }
}
