package com.enbiz.bo.app.controller.display;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

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

import com.enbiz.bo.app.controller.BaseController;
import com.enbiz.bo.app.dto.ajax.JSONResponseEntity;
import com.enbiz.bo.app.dto.request.display.PrMkdpBaseRequest;
import com.enbiz.bo.app.dto.request.display.PrMkdpGoodsInfoRequest;
import com.enbiz.bo.app.dto.request.realgrid.RealGridCUDRequest;
import com.enbiz.bo.app.dto.response.PrMkdpGoodsInfoResponse;
import com.enbiz.bo.app.dto.response.display.PrDispImgInfoResponse;
import com.enbiz.bo.app.dto.response.display.PrMkdpBaseResponse;
import com.enbiz.bo.app.dto.response.display.PrMkdpDivobjInfoResponse;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.entity.PrMkdpBase;
import com.enbiz.bo.app.entity.PrMkdpDivobjInfo;
import com.enbiz.bo.app.entity.PrMkdpGoodsInfo;
import com.enbiz.bo.app.entity.StStdCd;
import com.enbiz.bo.app.enums.common.AttacheFileKind;
import com.enbiz.bo.app.service.code.CodeService;
import com.enbiz.bo.app.service.common.AdminCommonService;
import com.enbiz.bo.app.service.display.MarketingDisplayManagementService;
import com.enbiz.bo.app.service.display.SiteMgmtService;
import com.enbiz.bo.base.annotation.RealGridCUD;
import com.enbiz.bo.base.annotation.RealGridCUDResponse;
import com.enbiz.bo.base.annotation.RealGridSearch;
import com.enbiz.common.base.exception.MessageResolver;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

/**
 * 기획전 관리
 */
@Controller
@Lazy
@RequiredArgsConstructor
public class MarketingDisplayManagementController extends BaseController {

    private final MarketingDisplayManagementService marketingDisplayManagementService;
    private final SiteMgmtService siteMgmtService;
    private final AdminCommonService adminCommonService;
    private final Environment env;
    private final CodeService codeService;

    /**
     * 기획전 관리 첫 로딩 화면
     * @param model
     * @param prMkdpBaseRequest
     * @return
     * @throws Exception
     */
    @GetMapping(value="/display/marketingDisplayMgmt.marketingDisplayList.do")
    public String marketingDisplayList(Model model, @Valid PrMkdpBaseRequest prMkdpBaseRequest) throws Exception {
        Map<String, List<StStdCd>> codeList = codeService.getStStdCd("DP008,DP020");
        model.addAttribute("codeList", codeList);
        return "views/display/marketingDisplayList";
    }

    /**
     * 기획전 관리 목록 조회
     *
     * @param prMkdpBaseRequest
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/display/marketingDisplayMgmt.getPrMkdpBaseList.do", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @RealGridSearch
    public String getPrMkdpBaseList(PrMkdpBaseRequest prMkdpBaseRequest) throws Exception {
        int totalCount = marketingDisplayManagementService.getPrMkdpBaseListCount(prMkdpBaseRequest);
        List<PrMkdpBaseResponse> getPrMkdpBaseList = marketingDisplayManagementService.getPrMkdpBaseList(prMkdpBaseRequest);
        RealGridListResponse response = new RealGridListResponse(getPrMkdpBaseList, totalCount);
        return response.toJsonString();
    }

    /**
     * 기획전 관리 > 기획전 등록/수정 팝업 화면 호출
     * @param model
     * @param prMkdpBaseRequest
     * @return
     * @throws Exception
     */
    @GetMapping(value="display/marketingDisplayMgmt.getMarketingDisplayPopup.do")
    public String getConnectImgPopup(Model model, PrMkdpBaseRequest prMkdpBaseRequest) throws Exception {
        model.addAttribute("siteList", siteMgmtService.getSiteNmList());
        Map<String, List<StStdCd>> codeList = codeService.getStStdCd("DP008");
        model.addAttribute("codeList", codeList);

        // 파일 관련 설정 (이미지 최대 용량)
        model.addAttribute("maxUploadSizeImgFile", env.getProperty("upload.display.maxUploadSizeImgFile"));

        if (prMkdpBaseRequest.getArgInsertUpdate().equals("I")) { // 등록
            model.addAttribute("requestData", prMkdpBaseRequest);
        } else { // 수정
            PrMkdpBaseResponse prMkdpBaseResponse = new PrMkdpBaseResponse();
            prMkdpBaseResponse = marketingDisplayManagementService.getPrMkdpBaseDetail(prMkdpBaseRequest);
            prMkdpBaseResponse.setArgInsertUpdate("U");
            model.addAttribute("requestData", prMkdpBaseResponse);

            List<PrDispImgInfoResponse> imgList = marketingDisplayManagementService.getPrDispImgInfoDetail(prMkdpBaseRequest);
            model.addAttribute("ImgRequestData", imgList);
        }

        List<PrMkdpDivobjInfoResponse> tmplList = marketingDisplayManagementService.getPrTmplBase();
        model.addAttribute("tmplList", tmplList);

        return "views/display/marketingDisplayUpdate";
    }

    /**
     * 기획전 관리 > 기획전 등록 팝업 기본정보 탭 저장
     * @param file
     * @param param
     * @return
     * @throws Exception
     */
    @PostMapping("/display/marketingDisplayMgmt.saveMarketingDisplay.do")
    @ResponseBody
    public JSONResponseEntity saveMarketingDisplay(@RequestParam(required = false) List<MultipartFile> file, @RequestParam Map<String, String> param) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        PrMkdpBaseRequest prMkdpBaseRequest = objectMapper.readValue(param.get("prMkdpBaseRequest"),PrMkdpBaseRequest.class);
        if(file!=null) {
            for (int i=0; i<file.size(); i++) {
                Map<String, String> resultImageMap = adminCommonService.uploadMultipartFile(file.get(i), AttacheFileKind.DISPLAY, false);
                prMkdpBaseRequest.getImgList().get(i).setBnrImgFileNm(resultImageMap.get("I_FILE_TITLE"));
                prMkdpBaseRequest.getImgList().get(i).setBnrImgPathNm(resultImageMap.get("I_FILE_URL"));
            }
        }

        JSONResponseEntity response = new JSONResponseEntity();
        try {
            marketingDisplayManagementService.savePrMkdpBase(prMkdpBaseRequest);
        }catch (Exception e) {
            response.setMessage("기획전 기본 정보 등록 오류");
            return response;
        }

        // 저장 후 재조회
        response.setSucceeded(true);

        PrMkdpBaseResponse prMkdpBaseResponse = new PrMkdpBaseResponse();
        prMkdpBaseResponse = marketingDisplayManagementService.getPrMkdpBaseDetail(prMkdpBaseRequest);
        prMkdpBaseResponse.setArgInsertUpdate("U");

        List<PrDispImgInfoResponse> imgList = marketingDisplayManagementService.getPrDispImgInfoDetail(prMkdpBaseRequest);

        List<Object> reqList = new ArrayList<Object>();
        reqList.add(prMkdpBaseResponse);
        reqList.add(imgList);
        response.setData(reqList);

        return response;
    }

    /**
     * 기획전 관리 > 그리드 저장
     *
     * @param realGridCUD 신규, 수정, 삭제목록
     * @return 성공 메시지
     * @throws Exception
     */
    @RequestMapping("/display/marketingDisplayMgmt.savePrMkdpBaseList.do")
    @ResponseBody
    @RealGridCUDResponse
    public JSONResponseEntity savePrMkdpBaseList(@RealGridCUD(type = PrMkdpBase.class) RealGridCUDRequest<PrMkdpBase> realGridCUD) throws Exception {
        List<PrMkdpBase> updateList = realGridCUD.getUpdate(), deleteList = realGridCUD.getDelete();
        marketingDisplayManagementService.registCUDPrMkdpBase(updateList, deleteList);
        JSONResponseEntity jsonResponseEntity = new JSONResponseEntity(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
        return jsonResponseEntity;
    }

    /**
     * 기획전 관리 > 구분자 정보 목록 조회
     *
     * @param prMkdpBaseRequest
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/display/marketingDisplayMgmt.getPrMkdpDivObjInfoList.do", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @RealGridSearch
    public String getPrMkdpDivObjInfoList(PrMkdpBaseRequest prMkdpBaseRequest) throws Exception {
        int totalCount = marketingDisplayManagementService.getPrMkdpDivObjInfoListCount(prMkdpBaseRequest);
        List<PrMkdpDivobjInfoResponse> getPrMkdpBaseList = marketingDisplayManagementService.getPrMkdpDivObjInfoList(prMkdpBaseRequest);
        RealGridListResponse response = new RealGridListResponse(getPrMkdpBaseList, totalCount);
        return response.toJsonString();
    }

    /**
     * 기획전 등록/수정 팝업 > 구분자 정보 그리드 저장
     *
     * @param realGridCUD 신규, 수정, 삭제목록
     * @return 성공 메시지
     * @throws Exception
     */
    @RequestMapping("/display/marketingDisplayMgmt.savePrMkdpDivObjInfoList.do")
    @ResponseBody
    @RealGridCUDResponse
    public JSONResponseEntity savePrMkdpDivObjInfoList(@RealGridCUD(type = PrMkdpDivobjInfo.class) RealGridCUDRequest<PrMkdpDivobjInfo> realGridCUD) throws Exception {
        List<PrMkdpDivobjInfo> createList = realGridCUD.getCreate(), updateList = realGridCUD.getUpdate(), deleteList = realGridCUD.getDelete();
        marketingDisplayManagementService.registCUDPrMkdpDivobjInfo(createList, updateList, deleteList);
        JSONResponseEntity jsonResponseEntity = new JSONResponseEntity(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
        return jsonResponseEntity;
    }

    /**
     * 기획전 관리 > 기획전 상품 정보 목록 조회
     *
     * @param prMkdpGoodsInfoRequest
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/display/marketingDisplayMgmt.getPrMkdpGoodsInfoList.do", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @RealGridSearch
    public String getPrMkdpGoodsInfoList(PrMkdpGoodsInfoRequest prMkdpGoodsInfoRequest) throws Exception {
        int totalCount = marketingDisplayManagementService.getPrMkdpGoodsInfoListCount(prMkdpGoodsInfoRequest);
        List<PrMkdpGoodsInfoResponse> getPrMkdpBaseList = marketingDisplayManagementService.getPrMkdpGoodsInfoList(prMkdpGoodsInfoRequest);
        RealGridListResponse response = new RealGridListResponse(getPrMkdpBaseList, totalCount);
        return response.toJsonString();
    }

    /**
     * 기획전 등록/수정 팝업 > 기획전 상품 정보 그리드 저장
     *
     * @param realGridCUD 신규, 수정, 삭제목록
     * @return 성공 메시지
     * @throws Exception
     */
    @RequestMapping("/display/marketingDisplayMgmt.savePrMkdpGoodsInfoList.do")
    @ResponseBody
    @RealGridCUDResponse
    public JSONResponseEntity savePrMkdpGoodsInfoList(@RealGridCUD(type = PrMkdpGoodsInfo.class) RealGridCUDRequest<PrMkdpGoodsInfo> realGridCUD) throws Exception {
        List<PrMkdpGoodsInfo> createList = realGridCUD.getCreate(), updateList = realGridCUD.getUpdate(), deleteList = realGridCUD.getDelete();
        marketingDisplayManagementService.registCUDPrMkdpGoodsInfo(createList, updateList, deleteList);
        JSONResponseEntity jsonResponseEntity = new JSONResponseEntity(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
        return jsonResponseEntity;
    }

    /**
     * 기획전 상품 _ 품절 상품 목록 수
     * @param prMkdpGoodsInfoRequest
     * @return response
     * @throws Exception
     */
    @PostMapping(value = "/display/marketingDisplayMgmt.getSoldOutCount.do", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public JSONResponseEntity getSoldOutCount(PrMkdpGoodsInfoRequest prMkdpGoodsInfoRequest) throws Exception {
        int soldOutCount = marketingDisplayManagementService.getSoldOutCount(prMkdpGoodsInfoRequest);
        JSONResponseEntity response = new JSONResponseEntity();
        response.setSucceeded(true);
        response.setData(soldOutCount);
        return response;
    }

    /**
     * 기획전 관리 _ 전시기간 일괄변경 팝업 화면 호출
     * @return
     * @throws Exception
     */
    @GetMapping(value="display/marketingDisplayMgmt.getMarketingDisplayEndDateChange.do")
    public String getMarketingDisplayEndDateChange() throws Exception {
        return "views/display/marketingDisplayEndDateChange";
    }

}