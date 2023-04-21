package com.enbiz.bo.app.controller.display;

import java.util.List;
import java.util.Map;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.enbiz.bo.app.controller.BaseController;
import com.enbiz.bo.app.dto.ajax.JSONResponseEntity;
import com.enbiz.bo.app.dto.request.display.PrDispCtgBaseRequest;
import com.enbiz.bo.app.dto.request.display.PrDispGoodsInfoRequest;
import com.enbiz.bo.app.dto.request.realgrid.RealGridCUDRequest;
import com.enbiz.bo.app.dto.response.display.PrDispCtgBaseResponse;
import com.enbiz.bo.app.dto.response.display.PrDispGoodsInfoResponse;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.entity.PrDispCtgBase;
import com.enbiz.bo.app.entity.PrDispGoodsInfo;
import com.enbiz.bo.app.entity.PrDpmlBase;
import com.enbiz.bo.app.entity.StStdCd;
import com.enbiz.bo.app.service.code.CodeService;
import com.enbiz.bo.app.service.display.DisplayCategoryMgmtService;
import com.enbiz.bo.base.annotation.RealGridCUD;
import com.enbiz.bo.base.annotation.RealGridSearch;
import com.enbiz.common.base.entity.BaseCommonEntity;
import com.enbiz.common.base.exception.MessageResolver;
import com.enbiz.common.base.util.ExcelUtils;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.sf.json.JSONObject;

/**
 * 전시 카테고리 관리
 */
@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class DisplayCategoryMgmtController extends BaseController {

    private final DisplayCategoryMgmtService displayCategoryService;
    private final CodeService codeService;

    /**
     * 전시 카테고리 관리 첫 로딩 화면
     * @param model
     * @param prDispCtgBaseRequest
     * @return
     * @throws Exception
     */
    @GetMapping("/display/displayCategoryMgmt.displayCategoryMgmtView.do")
    public String displayCategoryMgmtView(Model model, PrDispCtgBaseRequest prDispCtgBaseRequest) throws Exception {
        List<PrDispCtgBaseResponse> siteList = displayCategoryService.getCcSiteBase();
        Map<String, List<StStdCd>> codeList = codeService.getStStdCd("DP002,DP003,DP007,DP010");
        model.addAttribute("siteList", siteList);
        model.addAttribute("codeList", codeList);
        model.addAttribute("requestData", prDispCtgBaseRequest);
        return "views/display/displayCategoryMgmtView";
    }

    /**
     * 전시 카테고리 관리 Tree 리스트
     * @param prDispCtgBaseRequest
     * @return
     * @throws Exception
     */
    @GetMapping("/display/displayCategoryMgmt.getDisplayCategoryMgmtTree.do")
    @ResponseBody
    public Object getDisplayCategoryMgmtTree(PrDispCtgBaseRequest prDispCtgBaseRequest) throws Exception {
        JSONObject object = new JSONObject();
        prDispCtgBaseRequest.setRootNode(prDispCtgBaseRequest.getSiteNo());
        object.put("category", displayCategoryService.getCategoryTreeList(prDispCtgBaseRequest));
        return object;
    }

    /**
     * 전시 카테고리 관리 _ 몰 정보 등록
     * @param model
     * @param prDispCtgBaseRequest
     * @return
     * @throws Exception
     */
    @GetMapping("/display/displayCategoryMgmt.displayCategoryMgmtMallInfoSaveView.do")
    public String displayCategoryMgmtMallInfoSaveView(Model model, PrDispCtgBaseRequest prDispCtgBaseRequest) throws Exception {
        String siteName = displayCategoryService.getSiteName(prDispCtgBaseRequest);
        Map<String, List<StStdCd>> codeList = codeService.getStStdCd("DP002,DP003,DP007,DP010");
        model.addAttribute("siteNm", siteName);
        model.addAttribute("codeList", codeList);
        model.addAttribute("requestData", prDispCtgBaseRequest);
        return "views/display/displayCategoryMgmtMallInfoPopup";
    }

    /**
     * 전시 카테고리 관리 _ 몰 정보 등록 저장
     * @param prDpmlBase
     * @return
     * @throws Exception
     */
    @PostMapping("/display/displayCategoryMgmt.saveDisplayCategoryMgmtMallInfo.do")
    @ResponseBody
    public JSONResponseEntity saveDisplayCategoryMgmtMallInfo(PrDpmlBase prDpmlBase) throws Exception {
        displayCategoryService.prDpmlBaseInsert(prDpmlBase);
        JSONResponseEntity response = new JSONResponseEntity();
        response.setMessage(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
        response.setSucceeded(true);
        return response;
    }

    /**
     * 전시 카테고리 관리 _ 몰 정보
     * @param prDispCtgBaseRequest
     * @return
     * @throws Exception
     */
    @PostMapping("/display/displayCategoryMgmt.getDisplayCategoryMgmtMallDetail.do")
    @ResponseBody
    public JSONResponseEntity getDisplayCategoryMgmtMallDetail(PrDispCtgBaseRequest prDispCtgBaseRequest) throws Exception {
        JSONResponseEntity response = new JSONResponseEntity();
        response.setData(displayCategoryService.getMallDetail(prDispCtgBaseRequest));
        response.setSucceeded(true);
        return response;
    }

    /**
     * 전시 카테고리 관리 _ 전시 몰 정보 수정 저장
     * @param prDispCtgBaseRequest
     * @return
     * @throws Exception
     */
    @PostMapping("/display/displayCategoryMgmt.saveDisplayCategoryMgmtMallDetail.do")
    @ResponseBody
    public JSONResponseEntity saveDisplayCategoryMgmtMallDetail(PrDispCtgBaseRequest prDispCtgBaseRequest) throws Exception {
        displayCategoryService.saveDisplayCategoryMgmtMallDetail(prDispCtgBaseRequest);
        JSONResponseEntity response = new JSONResponseEntity();
        response.setSucceeded(true);
        return response;
    }

    /**
     * 전시 카테고리 관리 _ 전시 카테고리 매장정보
     * @param prDispCtgBaseRequest
     * @return
     * @throws Exception
     */
    @PostMapping("/display/displayCategoryMgmt.getDisplayCategoryMgmtCategoryDetail.do")
    @ResponseBody
    public JSONResponseEntity getDisplayCategoryMgmtCategoryDetail(PrDispCtgBaseRequest prDispCtgBaseRequest) throws Exception {
        JSONResponseEntity response = new JSONResponseEntity();
        response.setData(displayCategoryService.getCategoryDetail(prDispCtgBaseRequest));
        response.setSucceeded(true);
        return response;
    }

    /**
     * 전시 카테고리 관리 _ 전시 카테고리 정보 수정 저장
     * @param prDispCtgBase
     * @return
     * @throws Exception
     */
    @PostMapping("/display/displayCategoryMgmt.saveDisplayCategoryMgmtCategoryDetail.do")
    @ResponseBody
    public JSONResponseEntity saveDisplayCategoryMgmtCategoryDetail(PrDispCtgBase prDispCtgBase) throws Exception {
        displayCategoryService.saveCategoryUpdate(prDispCtgBase);
        JSONResponseEntity response = new JSONResponseEntity();
        response.setSucceeded(true);
        return response;
    }

    /**
     * 전시 카테고리 관리 _ 하위 전시 카테고리 매장 목록
     * @param prDispCtgBaseRequest
     * @return realGridListResponse
     * @throws Exception
     */
    @GetMapping("/display/displayCategoryMgmt.getDisplayCategoryMgmtSubCategoryList.do")
    @ResponseBody
    public RealGridListResponse getDisplayCategoryMgmtSubCategoryList(PrDispCtgBaseRequest prDispCtgBaseRequest) throws Exception {
        int totalCount = displayCategoryService.getSubCategoryListCount(prDispCtgBaseRequest);
        List<PrDispCtgBaseResponse> subCategoryList = displayCategoryService.getSubCategoryList(prDispCtgBaseRequest);
        RealGridListResponse response = new RealGridListResponse(subCategoryList, totalCount);
        return response;
    }

    /**
     * 하위 전시 카테고리 매장 목록 저장
     * @param realGridCUD 신규, 수정, 삭제목록
     * @return 성공 메시지
     * @throws Exception
     */
    @PostMapping("/display/displayCategoryMgmt.saveDisplayCategoryMgmtCategoryList.do")
    @ResponseBody
    public JSONResponseEntity saveDisplayCategoryMgmtCategoryList(PrDispCtgBase prDispCtgBase, @RealGridCUD(type = PrDispCtgBase.class) RealGridCUDRequest<PrDispCtgBase> realGridCUD) throws Exception {
        List<PrDispCtgBase> createList = realGridCUD.getCreate(), updateList = realGridCUD.getUpdate(), deleteList = realGridCUD.getDelete();
        displayCategoryService.registCUD(prDispCtgBase, createList, updateList, deleteList);
        JSONResponseEntity jsonResponseEntity = new JSONResponseEntity(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
        return jsonResponseEntity;
    }

    /**
     * 하위 전시 카테고리 매장 목록 _ 전시상품 상세 조회
     * @param prDispGoodsInfoRequest
     * @return
     * @throws Exception
     */
    @PostMapping("/display/displayCategoryMgmt.getDisplayCategoryMgmtGoodsDetail.do")
    @ResponseBody
    public JSONResponseEntity getDisplayCategoryMgmtGoodsDetail(PrDispGoodsInfoRequest prDispGoodsInfoRequest) throws Exception {
        PrDispGoodsInfoResponse goodsDetail = displayCategoryService.getGoodsDetail(prDispGoodsInfoRequest);
        JSONResponseEntity response = new JSONResponseEntity();
        response.setSucceeded(true);
        response.setData(goodsDetail);
        return response;
    }

    /**
     * 전시 카테고리 관리 _ 매장 전시상품 조회 목록
     * @param prDispGoodsInfoRequest
     * @return realGridListResponse
     * @throws Exception
     */
    @GetMapping("/display/displayCategoryMgmt.getDisplayCategoryMgmtGoodsList.do")
    @ResponseBody
    public RealGridListResponse getDisplayCategoryMgmtGoodsList(PrDispGoodsInfoRequest prDispGoodsInfoRequest) throws Exception {
        int totalCount = displayCategoryService.getDisplayGoodsListCount(prDispGoodsInfoRequest);
        List<PrDispGoodsInfoResponse> goodsList = displayCategoryService.getDisplayGoodsList(prDispGoodsInfoRequest);
        RealGridListResponse response = new RealGridListResponse(goodsList, totalCount);
        return response;
    }

    /**
     * 전시 카테고리 관리 _ 매장 전시상품 목록 저장
     * @param realGridCUD 신규, 수정, 삭제목록
     * @return 성공 메시지
     * @throws Exception
     */
    @PostMapping("/display/displayCategoryMgmt.saveDisplayCategoryMgmtGoodsList.do")
    @ResponseBody
    public JSONResponseEntity saveDisplayCategoryMgmtGoodsList(@RealGridCUD(type = PrDispGoodsInfo.class) RealGridCUDRequest<PrDispGoodsInfo> realGridCUD) throws Exception {
        List<PrDispGoodsInfo> createList = realGridCUD.getCreate(), updateList = realGridCUD.getUpdate(), deleteList = realGridCUD.getDelete();
        displayCategoryService.GoodsCUD(createList, updateList, deleteList);
        JSONResponseEntity jsonResponseEntity = new JSONResponseEntity(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
        return jsonResponseEntity;
    }

    /**
     * 전시 카테고리 관리 _ 매장 전시상품 목록 저장 _ 일괄등록 팝업
     * @param
     * @return
     * @throws Exception
     */
    @GetMapping("/display/displayCategoryMgmt.displayCategoryMgmtGoodsInsertPopupSaveView.do")
    public String displayCategoryMgmtGoodsInsertPopupSaveView(Model model, PrDispGoodsInfoRequest prDispGoodsInfoRequest) {
        model.addAttribute("requestData", prDispGoodsInfoRequest);
        return "views/display/displayCategoryMgmtGoodsInsertPopup";
    }

    /**
     * 전시 카테고리 관리 _ 매장 전시상품 목록 저장 _ 엑셀 일괄 등록
     * @param file
     * @param strColumns
     * @return String
     */
    @SuppressWarnings("unchecked")
    @PostMapping("/display/displayCategoryMgmt.saveDisplayCategoryMgmtGoodsListExcel.do")
    @RealGridSearch
    @ResponseBody
    public RealGridListResponse saveDisplayCategoryMgmtGoodsListExcel(@RequestParam("excelFile") MultipartFile file,
                                                  @RequestParam("excelColumns") String strColumns, @RequestParam String dispCtgNo) throws Exception {
        String fileName = file.getOriginalFilename();
        String extension = fileName.substring(fileName.lastIndexOf(".") + 1);

        String[] columns = strColumns.split(",");
        List<? extends BaseCommonEntity> goodsList = null;

        if (extension.contains("csv")) {
            goodsList = ExcelUtils.extractCSVList(file, columns, PrDispGoodsInfo.class);
        } else if (extension.contains("xls") || extension.contains("xlsx")) {
            goodsList = ExcelUtils.extractExcelList(file, columns, PrDispGoodsInfo.class);
        } else {
            throw new IllegalArgumentException("확장자가 xlsx, xls, csv인 경우만 파일 선택 가능합니다.");
        }

        if(goodsList.size() > 0) {
            displayCategoryService.setValGoodsList(dispCtgNo, (List<PrDispGoodsInfo>) goodsList);
        }
        RealGridListResponse response = new RealGridListResponse(goodsList, goodsList.size());

        return response;
    }

    /**
     * 전시 카테고리 관리 _ 매장 전시상품 목록 엑셀 일괄 저장
     * @param realGridCUD 신규 저장
     * @return 성공 메시지
     * @throws Exception
     */
    @PostMapping("/display/displayCategoryMgmt.saveDisplayCategoryMgmtExcelGoodsList.do")
    @ResponseBody
    public RealGridListResponse saveDisplayCategoryMgmtExcelGoodsList(@RealGridCUD(type = PrDispGoodsInfo.class) RealGridCUDRequest<PrDispGoodsInfo> realGridCUD) throws Exception {
        List<PrDispGoodsInfo> createList = realGridCUD.getCreate();
        List<PrDispGoodsInfo> goodsList = displayCategoryService.registCUDExcel(createList);
        RealGridListResponse response = new RealGridListResponse(goodsList, goodsList.size());
        return response;
    }

}