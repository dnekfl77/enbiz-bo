package com.enbiz.bo.app.controller.marketing;

import java.util.List;
import java.util.Map;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.enbiz.bo.app.controller.BaseController;
import com.enbiz.bo.app.dto.ajax.JSONResponseEntity;
import com.enbiz.bo.app.dto.request.marketing.CouponIssuedMemberRequest;
import com.enbiz.bo.app.dto.request.marketing.CouponMgmtCudRequest;
import com.enbiz.bo.app.dto.request.marketing.CouponRequest;
import com.enbiz.bo.app.dto.request.realgrid.RealGridCUDRequest;
import com.enbiz.bo.app.dto.response.marketing.CouponIssuedMemberResponse;
import com.enbiz.bo.app.dto.response.marketing.CouponResponse;
import com.enbiz.bo.app.dto.response.marketing.PromotionDetailResponse;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.entity.CcCpnIsuMbr;
import com.enbiz.bo.app.entity.StStdCd;
import com.enbiz.bo.app.service.code.CodeService;
import com.enbiz.bo.app.service.marketing.CouponMgmtService;
import com.enbiz.bo.base.annotation.RealGridCUD;
import com.enbiz.common.base.entity.BaseCommonEntity;
import com.enbiz.common.base.exception.MessageResolver;
import com.enbiz.common.base.util.ExcelUtils;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 마케팅 > 쿠폰관리 Controller
 */
@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class CouponMgmtController extends BaseController{

    private final CouponMgmtService couponMgmtService;
    private final CodeService codeService;

    /**
     * 쿠폰 관리 화면 호출
     * @param response
     * @param model
     * @return
     * @throws Exception
     */
    @GetMapping("/marketing/couponMgmt.couponMgmtView.do")
    public String couponManagingList(Model model) throws Exception {
        Map<String, List<StStdCd>> codeList = codeService.getStStdCd("MK002,MK003");
        model.addAttribute("codeList", codeList);
        return "views/marketing/couponMgmtView";
    }

    /**
     * 쿠폰 관리 목록
     * @param CouponRequest
     * @return
     * @throws Exception
     */
    @GetMapping("/marketing/couponMgmt.getCouponList.do")
    @ResponseBody
    public RealGridListResponse getCouponManagingList(CouponRequest couponMgmtRequest) throws Exception {
        int totalCount = couponMgmtService.getCouponListCount(couponMgmtRequest);
        List<CouponResponse> couponList = couponMgmtService.getCouponList(couponMgmtRequest);
        RealGridListResponse response = new RealGridListResponse(couponList, totalCount);
        return response;
    }

    /**
     * 쿠폰 등록 화면
     * @param model
     * @return
     * @throws Exception
     */
    @GetMapping("/marketing/couponMgmt.couponRegistView.do")
    public String couponAdd(Model model) throws Exception {
        Map<String, List<StStdCd>> codeList = codeService.getStStdCd("MK002,MK003,MK006,MK007,MK008,MK009,MK010");
        Map<String, List<StStdCd>> mbrGradeList = codeService.getReverseStStdCd("ME024");
        model.addAttribute("codeList", codeList);
        model.addAttribute("mbrGradeList", mbrGradeList);
        return "views/marketing/couponSaveView";
    }

    /**
     * 쿠폰 상세 화면
     * @param model
     * @return
     * @throws Exception
     */
    @GetMapping("/marketing/couponMgmt.couponModifyView.do")
    public String couponDetail(@RequestParam String promoNo,Model model) throws Exception {
        Map<String, List<StStdCd>> codeList = codeService.getStStdCd("MK002,MK003,MK006,MK007,MK008,MK009,MK010");
        Map<String, List<StStdCd>> mbrGradeList = codeService.getReverseStStdCd("ME024");
        PromotionDetailResponse couponData = couponMgmtService.getCouponData(promoNo);
        model.addAttribute("couponData", couponData);
        model.addAttribute("codeList", codeList);
        model.addAttribute("mbrGradeList", mbrGradeList);
        return "views/marketing/couponSaveView";
    }

    /**
     * 쿠폰 등록 및 업데이트
     */
    @PostMapping("/marketing/couponMgmt.saveCoupon.do")
    @ResponseBody
    public JSONResponseEntity<Void> saveCoupon(@RequestBody CouponMgmtCudRequest couponMgmtCudRequest) throws Exception{
       couponMgmtService.saveCoupon(couponMgmtCudRequest);
       return new JSONResponseEntity<Void>(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
    }

    /**
     * 쿠폰 삭제
     */
    @GetMapping("/marketing/couponMgmt.deleteCoupon.do")
    @ResponseBody
    public JSONResponseEntity<Void> deleteCoupon(@RequestParam String promoNo) throws Exception{
        couponMgmtService.deleteCoupon(promoNo);
        return new JSONResponseEntity<Void>(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
    }

    /**
     * 쿠폰 발급 회원 조회
     */
    @GetMapping("/marketing/couponMgmt.getCouponIssuedMemberList.do")
    @ResponseBody
    public RealGridListResponse getCouponIssuedMbrList(CouponIssuedMemberRequest couponMgmtIssuedMemberRequest) throws Exception {
        int totalCount = couponMgmtService.getCouponIssuedMemberListCount(couponMgmtIssuedMemberRequest);
        List<CouponIssuedMemberResponse> couponIssuedMbrList = couponMgmtService.getCouponIssuedMemberList(couponMgmtIssuedMemberRequest);
        RealGridListResponse response = new RealGridListResponse(couponIssuedMbrList, totalCount);
        return response;
    }

    /**
     * 쿠폰 발급 회원 등록
     * @param realGridCUD
     * @return
     * @throws Exception
     */
    @PostMapping("/marketing/couponMgmt.saveCouponIssuedMember.do")
    @ResponseBody
    public JSONResponseEntity<Void> registCouponIssuedMbr(
            @RealGridCUD(type = CcCpnIsuMbr.class) RealGridCUDRequest<CcCpnIsuMbr> realGridCUD) throws Exception {
        List<CcCpnIsuMbr> createList = realGridCUD.getCreate();
        couponMgmtService.registCouponIssuedMember(createList);
		JSONResponseEntity<Void> jsonResponseEntity = new JSONResponseEntity<Void>(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
        return jsonResponseEntity;
    }


    /**
     * 쿠폰 발급회원 업로드
     * @param file
     * @param strColumns
     * @param strType
     * @return
     * @throws ClassNotFoundException
     */
    @SuppressWarnings("unchecked")
    @PostMapping("/marketing/couponMgmt.couponIssuedMemberloadExcel.do")
    @ResponseBody
    public RealGridListResponse loadExcel(@RequestParam("excelFile") MultipartFile file,
                                          @RequestParam("excelColumns") String strColumns, @RequestParam("excelType") String strType,@RequestParam String cpnNo)
            throws Exception {
        String fileName = file.getOriginalFilename();
        String extension = fileName.substring(fileName.lastIndexOf(".") + 1);

        String[] columns = strColumns.split(",");
        Class<? extends BaseCommonEntity> type = (Class<? extends BaseCommonEntity>) (this.getClass().getClassLoader()
                .loadClass(strType));
        List<? extends BaseCommonEntity> stHlList;

        if (extension.contains("xls")) {
            stHlList = ExcelUtils.extractExcelList(file, columns, type);
            if(stHlList != null && stHlList.size() > 0 ) {
                stHlList = couponMgmtService.getExcelData(cpnNo, (List<CouponIssuedMemberResponse>) stHlList);
            }
        } else {
            throw new IllegalArgumentException("Unsupported File Type : " + extension);
        }
        RealGridListResponse response = new RealGridListResponse(stHlList, stHlList.size());
        return response;
    }

}
