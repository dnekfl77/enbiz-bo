package com.enbiz.bo.app.controller.display;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.context.annotation.Lazy;
import org.springframework.core.env.Environment;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.enbiz.bo.app.controller.BaseController;
import com.enbiz.bo.app.dto.ajax.JSONResponseEntity;
import com.enbiz.bo.app.dto.request.display.PrConrBaseRequest;
import com.enbiz.bo.app.dto.request.display.PrConrContInfoRequest;
import com.enbiz.bo.app.dto.request.display.PrConrSetInfoRequest;
import com.enbiz.bo.app.dto.request.display.PrConrTgtInfoRequest;
import com.enbiz.bo.app.dto.request.display.PrDispCtgBaseRequest;
import com.enbiz.bo.app.dto.request.display.PrTmplConrMappInfoRequest;
import com.enbiz.bo.app.dto.request.goods.PrGoodsRevInfoRequest;
import com.enbiz.bo.app.dto.request.popup.PrBrandMstRequest;
import com.enbiz.bo.app.dto.request.realgrid.RealGridCUDRequest;
import com.enbiz.bo.app.dto.response.display.PrConrBaseResponse;
import com.enbiz.bo.app.dto.response.display.PrConrContInfoResponse;
import com.enbiz.bo.app.dto.response.display.PrConrSetInfoResponse;
import com.enbiz.bo.app.dto.response.display.PrConrTgtInfoResponse;
import com.enbiz.bo.app.dto.response.display.PrTmplConrMappInfoResponse;
import com.enbiz.bo.app.dto.response.goods.PrGoodsRevInfoResponse;
import com.enbiz.bo.app.dto.response.popup.PrBrandMstResponse;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.entity.PrConrContInfo;
import com.enbiz.bo.app.entity.PrConrSetInfo;
import com.enbiz.bo.app.entity.StStdCd;
import com.enbiz.bo.app.enums.common.AttacheFileKind;
import com.enbiz.bo.app.service.code.CodeService;
import com.enbiz.bo.app.service.common.AdminCommonService;
import com.enbiz.bo.app.service.display.DisplayCategoryMgmtService;
import com.enbiz.bo.app.service.display.DisplayConnectMgmtService;
import com.enbiz.bo.app.service.goods.DisplayGoodsReviewPopupService;
import com.enbiz.bo.base.annotation.RealGridCUD;
import com.enbiz.common.base.exception.MessageResolver;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 전시 연결 관리
 */
@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class DisplayConnectMgmtController extends BaseController {

    private final DisplayCategoryMgmtService displayCategoryService;
    private final DisplayConnectMgmtService displayConnectMgmtService;
    private final AdminCommonService adminCommonService;
    private final Environment env;
    private final CodeService codeService;
    private final DisplayGoodsReviewPopupService displayGoodsReviewPopupService;

    /**
     * 전시 연결 관리 첫 로딩 화면
     * @param model
     * @return
     * @throws Exception
     */
    @GetMapping("/display/displayConnectMgmt.displayConnectView.do")
    public String displayConnectView(Model model) throws Exception {
        model.addAttribute("siteList", displayCategoryService.getCcSiteBase());
        model.addAttribute("codeList", codeService.getStStdCd("DP003"));
        return "views/display/displayConnectMgmtView";
    }

    /**
     * 전시 코너 조회 목록
     * @param prTmplConrMappInfoRequest
     * @return realGridListResponse
     * @throws Exception
     */
    @GetMapping("/display/displayConnectMgmt.getDisplayConnectMgmt.do")
    @ResponseBody
    public RealGridListResponse getConnerList(PrTmplConrMappInfoRequest prTmplConrMappInfoRequest) throws Exception {
        int totalCount = displayConnectMgmtService.getConnerListCount(prTmplConrMappInfoRequest);
        List<PrTmplConrMappInfoResponse> connerList = displayConnectMgmtService.getConnerList(prTmplConrMappInfoRequest);
        RealGridListResponse response = new RealGridListResponse(connerList, totalCount);
        return response;
    }

    /**
     * 전시 연결 관리 _ 전시 연결 관리 팝업 화면 호출
     * @param model
     * @param prConrBaseRequest
     * @return
     * @throws Exception
     */
    @GetMapping("/display/displayConnectMgmt.displayConnectMgmtSaveView.do")
    public String displayConnectMgmtSaveView(Model model, PrConrBaseRequest prConrBaseRequest, PrDispCtgBaseRequest prDispCtgBaseRequest, PrConrSetInfoRequest prConrSetInfoRequest) throws Exception {
        model.addAttribute("codeList", codeService.getStStdCd("DP007"));
        PrConrBaseResponse prConrBaseResponse = displayConnectMgmtService.getConnerDetail(prConrBaseRequest);
        model.addAttribute("connerRequestData", prConrBaseResponse);
        model.addAttribute("displayCategoryDetail", displayConnectMgmtService.getDispHierarchyNm(prDispCtgBaseRequest));

        // 전시 코너 정보 테이블 저장 (중복확인 후 저장)
        displayConnectMgmtService.prDispConrInfoInsert(prConrSetInfoRequest);

        // 전시 세트 정보 테이블 저장 (중복확인 후 저장)
        if(prConrBaseResponse.getSetUseYn().equals("N")) {
            displayConnectMgmtService.prConrSetInfoInsert(prDispCtgBaseRequest.getDispCtgNo(), prConrSetInfoRequest);
        }

        return "views/display/displayConnectMgmtPopup";
    }

    /**
     * 전시 대상 세트 조회 목록
     *
     * @param prConrSetInfoRequest
     * @return realGridListResponse
     * @throws Exception
     */
    @GetMapping(value = "/display/displayConnectMgmt.getSetConnerList.do", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public RealGridListResponse getSetConnerList(PrConrSetInfoRequest prConrSetInfoRequest) throws Exception {
        int totalCount = displayConnectMgmtService.getSetConnerListCount(prConrSetInfoRequest);
        List<PrConrSetInfoResponse> setConnerList = new ArrayList<>();
        if(totalCount == 0) { // 첫번째 조회 (코너대상정보에서 조회)
            setConnerList = displayConnectMgmtService.getFirstSetConnerList(prConrSetInfoRequest);
        } else { // 전시세트정보에서 조회
            setConnerList = displayConnectMgmtService.getSetConnerList(prConrSetInfoRequest);

            // 추가된 코드대상정보(상세)가 있는 경우 저장해주기
            displayConnectMgmtService.prConrSetInfoInsert(prConrSetInfoRequest.getDispCtgNo(), prConrSetInfoRequest);
        }
        RealGridListResponse response = new RealGridListResponse(setConnerList, totalCount);
        return response;
    }

    /**
     * 전시 세트 정보 저장 _ 세트인 경우 (그리드)
     *
     * @param realGridCUD 신규, 수정, 삭제목록
     * @return 성공 메시지
     * @throws Exception
     */
    @PostMapping("/display/displayConnectMgmt.saveSetConnerList.do")
    @ResponseBody
    public JSONResponseEntity saveSetConnerList(@RealGridCUD(type = PrConrSetInfo.class) RealGridCUDRequest<PrConrSetInfo> realGridCUD) throws Exception {
        List<PrConrSetInfo> updateList = realGridCUD.getUpdate();
        displayConnectMgmtService.registCUD(updateList);
        JSONResponseEntity jsonResponseEntity = new JSONResponseEntity(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
        return jsonResponseEntity;
    }

    /**
     * 전시 연결 관리 팝업 _ 탭 리스트
     * @param prConrTgtInfoRequest
     * @return
     * @throws Exception
     */
    @PostMapping(value = "/display/displayConnectMgmt.getConrTgtCdList.do", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public JSONResponseEntity getConrTgtCdList(PrConrTgtInfoRequest prConrTgtInfoRequest) throws Exception {
        List<PrConrTgtInfoResponse> conrTgtCdList = displayConnectMgmtService.getConrTgtCdList(prConrTgtInfoRequest);
        JSONResponseEntity response = new JSONResponseEntity();
        response.setSucceeded(true);
        response.setData(conrTgtCdList);
        return response;
    }

    /**
     * 전시 연결 관리 _ 전시기간 일괄변경 팝업 화면 호출
     * @return
     * @throws Exception
     */
    @GetMapping(value="display/displayConnectMgmt.displayConnectTermChangePopup.do")
    public String getDisplayConnectTermChange() throws Exception {
        return "views/display/displayConnectTermChangePopup";
    }

    /**
     * 코너 컨텐츠 정보 조회 (상품)
     *
     * @param prConrContInfoRequest
     * @return realGridListResponse
     * @throws Exception
     */
    @GetMapping(value = "/display/displayConnectMgmt.getPrConrContInfoGoodsList.do", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public RealGridListResponse getPrConrContInfoGoodsList(PrConrContInfoRequest prConrContInfoRequest) throws Exception {
        int totalCount = displayConnectMgmtService.getPrConrContInfoListGoodsCount(prConrContInfoRequest);
        List<PrConrContInfoResponse> prConrContInfoList = displayConnectMgmtService.getPrConrContInfoGoodsList(prConrContInfoRequest);
        RealGridListResponse response = new RealGridListResponse(prConrContInfoList, totalCount);
        return response;
    }

    /**
     * 코너 컨텐츠 정보 조회 (상품리뷰)
     *
     * @param prConrContInfoRequest
     * @return realGridListResponse
     * @throws Exception
     */
    @GetMapping(value = "/display/displayConnectMgmt.getPrConrContInfoReviewList.do", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public RealGridListResponse getPrConrContInfoReviewList(PrConrContInfoRequest prConrContInfoRequest) throws Exception {
        int totalCount = displayConnectMgmtService.getPrConrContInfoReviewListCount(prConrContInfoRequest);
        List<PrConrContInfoResponse> prConrContInfoList = displayConnectMgmtService.getPrConrContInfoReviewList(prConrContInfoRequest);
        RealGridListResponse response = new RealGridListResponse(prConrContInfoList, totalCount);
        return response;
    }

    /**
     * 코너 컨텐츠 정보 저장
     *
     * @param realGridCUD 신규, 수정, 삭제목록
     * @return 성공 메시지
     * @throws Exception
     */
    @PostMapping("/display/displayConnectMgmt.savePrConrContInfoList.do")
    @ResponseBody
    public JSONResponseEntity savePrConrContInfoList(@RealGridCUD(type = PrConrContInfo.class) RealGridCUDRequest<PrConrContInfo> realGridCUD) throws Exception {
        List<PrConrContInfo> createList = realGridCUD.getCreate(), updateList = realGridCUD.getUpdate(), deleteList = realGridCUD.getDelete();
        displayConnectMgmtService.registCUDPrConrContInfo(createList, updateList, deleteList);
        JSONResponseEntity jsonResponseEntity = new JSONResponseEntity(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
        return jsonResponseEntity;
    }

    /**
     * 코너 컨텐츠 정보 조회 (브랜드)
     *
     * @param prConrContInfoRequest
     * @return realGridListResponse
     * @throws Exception
     */
    @GetMapping(value = "/display/displayConnectMgmt.getPrConrContInfoBrandList.do", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public RealGridListResponse getPrConrContInfoBrandList(PrConrContInfoRequest prConrContInfoRequest) throws Exception {
        int totalCount = displayConnectMgmtService.getPrConrContInfoListBrandCount(prConrContInfoRequest);
        List<PrConrContInfoResponse> prConrContInfoList = displayConnectMgmtService.getPrConrContInfoBrandList(prConrContInfoRequest);
        RealGridListResponse response = new RealGridListResponse(prConrContInfoList, totalCount);
        return response;
    }

    /**
     * 전시 연결관리 팝업 _ 브랜드 탭 _ 브랜드 상세조회
     * @param prBrandMstRequest
     * @return
     * @throws Exception
     */
    @PostMapping(value = "/display/displayConnectMgmt.getBrandDetail.do", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public JSONResponseEntity getBrandDetail(PrBrandMstRequest prBrandMstRequest) throws Exception {
        PrBrandMstResponse brandDetail = displayConnectMgmtService.getBrandDetail(prBrandMstRequest);
        JSONResponseEntity response = new JSONResponseEntity();
        response.setSucceeded(true);
        response.setData(brandDetail);
        return response;
    }

    /**
     * 코너 컨텐츠 정보 조회 (기획전)
     *
     * @param prConrContInfoRequest
     * @return realGridListResponse
     * @throws Exception
     */
    @GetMapping(value = "/display/displayConnectMgmt.getPrConrContInfoMkdpList.do", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public RealGridListResponse getPrConrContInfoMkdpList(PrConrContInfoRequest prConrContInfoRequest) throws Exception {
        int totalCount = displayConnectMgmtService.getPrConrContInfoMkdpListCount(prConrContInfoRequest);
        List<PrConrContInfoResponse> prConrContInfoList = displayConnectMgmtService.getPrConrContInfoMkdpList(prConrContInfoRequest);
        RealGridListResponse response = new RealGridListResponse(prConrContInfoList, totalCount);
        return response;
    }

    /**
     * 코너 컨텐츠 정보 조회 (HTML)
     *
     * @param prConrContInfoRequest
     * @return realGridListResponse
     * @throws Exception
     */
    @GetMapping(value = "/display/displayConnectMgmt.getPrConrContInfoHtmlList.do", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public RealGridListResponse getPrConrContInfoHtmlList(PrConrContInfoRequest prConrContInfoRequest) throws Exception {
        int totalCount = displayConnectMgmtService.getPrConrContInfoHtmlListCount(prConrContInfoRequest);
        List<PrConrContInfoResponse> prConrContInfoList = displayConnectMgmtService.getPrConrContInfoHtmlList(prConrContInfoRequest);
        RealGridListResponse response = new RealGridListResponse(prConrContInfoList, totalCount);
        return response;
    }

    /**
     * 전시 연결 관리 _ 전시 연결 관리 HTML 등록/수정 팝업 화면 호출
     * @param model
     * @param prConrContInfoRequest
     * @return
     * @throws Exception
     */
    @GetMapping(value="display/displayConnectMgmt.connectHtmlPopup.do")
    public String getConnectHtmlPopup(Model model, PrConrContInfoRequest prConrContInfoRequest) throws Exception {
        if (prConrContInfoRequest.getArgInsertUpdate().equals("I")) { // 등록
            model.addAttribute("requestData", prConrContInfoRequest);
        } else { // 수정
            PrConrContInfoResponse prConrContInfoResponse = new PrConrContInfoResponse();
            prConrContInfoResponse = displayConnectMgmtService.getPrConrContInfoHtmlDetail(prConrContInfoRequest);
            prConrContInfoResponse.setArgInsertUpdate("U");
            model.addAttribute("requestData", prConrContInfoResponse);
        }
        return "views/display/connectHtmlPopup";
    }

    /**
     * 전시 연결 관리 > 탭 _ HTML 등록/수정 & 이미지 등록/수정
     * @param prConrContInfo
     * @return
     * @throws Exception
     */
    @PostMapping(value = "/display/displayConnectMgmt.saveConnectPopup.do", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public JSONResponseEntity saveConnectHtmlPopup(PrConrContInfo prConrContInfo) throws Exception {
        if(prConrContInfo.getConrContNo() == null || prConrContInfo.getConrContNo().equals("") ){
            displayConnectMgmtService.prConrContInfoInsert(prConrContInfo);
        } else {
            displayConnectMgmtService.prConrContInfoUpdate(prConrContInfo);
        }
        JSONResponseEntity response = new JSONResponseEntity();
        response.setSucceeded(true);
        return response;
    }

    /**
     * 코너 컨텐츠 정보 조회 (이미지배너)
     *
     * @param prConrContInfoRequest
     * @return realGridListResponse
     * @throws Exception
     */
    @RequestMapping(value = "/display/displayConnectMgmt.getPrConrContInfoImgList.do", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public RealGridListResponse getPrConrContInfoImgList(PrConrContInfoRequest prConrContInfoRequest) throws Exception {
        int totalCount = displayConnectMgmtService.getPrConrContInfoImgListCount(prConrContInfoRequest);
        List<PrConrContInfoResponse> prConrContInfoList = displayConnectMgmtService.getPrConrContInfoImgList(prConrContInfoRequest);
        RealGridListResponse response = new RealGridListResponse(prConrContInfoList, totalCount);
        return response;
    }

    /**
     * 전시 연결 관리 _ 전시 연결 관리 이미지 배너 등록/수정 팝업 화면 호출
     * @param model
     * @param prConrContInfoRequest
     * @return
     * @throws Exception
     */
    @GetMapping(value="display/displayConnectMgmt.connectImgPopup.do")
    public String getConnectImgPopup(Model model, PrConrContInfoRequest prConrContInfoRequest) throws Exception {
        Map<String, List<StStdCd>> codeList = codeService.getStStdCd("DP007");
        model.addAttribute("codeList", codeList);

        // 파일 관련 설정
        model.addAttribute("maxUploadSizePerFile", env.getProperty("upload.display.maxUploadSizePerFile"));

        if (prConrContInfoRequest.getArgInsertUpdate().equals("I")) { // 등록
            model.addAttribute("requestData", prConrContInfoRequest);
        } else { // 수정
            PrConrContInfoResponse prConrContInfoResponse = new PrConrContInfoResponse();
            prConrContInfoResponse = displayConnectMgmtService.getPrConrContInfoImgDetail(prConrContInfoRequest);
            prConrContInfoResponse.setArgInsertUpdate("U");
            model.addAttribute("requestData", prConrContInfoResponse);
        }

        return "views/display/connectImgPopup";
    }

    /**
     * 전시 연결 관리 이미지 배너 등록/수정 팝업 화면 > 파일 저장
     * @param file
     * @param param
     * @return
     * @throws Exception
     */
    @PostMapping("/display/displayConnectMgmt.upLoadFile.do")
    public ModelAndView upLoadFile(@RequestParam MultipartFile file, @RequestParam Map<String, String> param) throws Exception {
        ModelAndView mav = new ModelAndView("jsonView");
        mav.addObject("fileDetail", adminCommonService.uploadMultipartFile(file, AttacheFileKind.DISPLAY, false));
        return mav;
    }

    /**
     * 코너 컨텐츠 정보 조회 (Text 배너)
     *
     * @param prConrContInfoRequest
     * @return realGridListResponse
     * @throws Exception
     */
    @GetMapping(value = "/display/displayConnectMgmt.getPrConrContInfoTextList.do", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public RealGridListResponse getPrConrContInfoTextList(PrConrContInfoRequest prConrContInfoRequest) throws Exception {
        int totalCount = displayConnectMgmtService.getPrConrContInfoTextListCount(prConrContInfoRequest);
        List<PrConrContInfoResponse> prConrContInfoList = displayConnectMgmtService.getPrConrContInfoTextList(prConrContInfoRequest);
        RealGridListResponse response = new RealGridListResponse(prConrContInfoList, totalCount);
        return response;
    }

    /**
     * 전시대상 상품리뷰 조회 화면 호출
     * @return 전시대상 상품리뷰 화면 경로
     * @throws Exception
     */
    @GetMapping("/display/displayConnectMgmt.displayGoodsReviewListPopup.do")
    public String displayGoodsReviewListPopup() throws Exception {
        return "views/display/displayGoodsReviewListPopup";
    }

    /**
     * 전시대상 상품리뷰 목록 조회
     * @param request
     * @return 전시대상 상품리뷰 목록
     * @throws Exception
     */
    @GetMapping(value = "/display/displayConnectMgmt.getDisplayGoodsReviewList.do")
    @ResponseBody
    public RealGridListResponse getDisplayGoodsReviewList(PrGoodsRevInfoRequest request) throws Exception {
        int totalCount = displayGoodsReviewPopupService.getDisplayGoodsReviewListCount(request);
        List<PrGoodsRevInfoResponse> reviewList = displayGoodsReviewPopupService.getDisplayGoodsReviewList(request);
        return new RealGridListResponse(reviewList, totalCount);
    }

}