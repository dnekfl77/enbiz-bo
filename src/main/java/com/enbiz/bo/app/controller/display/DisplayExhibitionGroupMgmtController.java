package com.enbiz.bo.app.controller.display;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.context.annotation.Lazy;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.enbiz.bo.app.controller.BaseController;
import com.enbiz.bo.app.dto.ajax.JSONResponseEntity;
import com.enbiz.bo.app.dto.request.display.PrDispGrpBaseRequest;
import com.enbiz.bo.app.dto.request.display.PrDispGrpMappInfoRequest;
import com.enbiz.bo.app.dto.request.display.PrMkdpBaseRequest;
import com.enbiz.bo.app.dto.request.realgrid.RealGridCUDRequest;
import com.enbiz.bo.app.dto.response.display.PrDispGrpBaseRespons;
import com.enbiz.bo.app.dto.response.display.PrDispGrpMappInfoRespons;
import com.enbiz.bo.app.dto.response.display.PrMkdpBaseResponse;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.entity.StStdCd;
import com.enbiz.bo.app.service.code.CodeService;
import com.enbiz.bo.app.service.display.DisplayExhibitionGroupMgmtService;
import com.enbiz.bo.app.service.display.SiteMgmtService;
import com.enbiz.bo.base.annotation.RealGridCUD;
import com.enbiz.common.base.exception.MessageResolver;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 기획전 그룹 관리 Controller
 */
@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class DisplayExhibitionGroupMgmtController extends BaseController {

    private final DisplayExhibitionGroupMgmtService displayExhibitionGroupMgmtService;
    private final SiteMgmtService siteManagementService;//사이트 관리 Service
    private final CodeService codeService;

    /**
     * 그룹 관리 View
     * @return codeList
     * @throws Exception
     */
    @GetMapping(value="/display/displayExhibitionGroupMgmt.displayExhibitionGroupView.do")
    public ModelAndView groupListView() throws Exception {
    	ModelAndView mav = new ModelAndView("views/display/displayExhibitionGroupView");
    	mav.addObject("siteList", siteManagementService.getSiteNmList());

    	//시스템구분코드(CH003), 전시그룹유형코드(DP011), 기획전유형코드(DP008)
    	mav.addObject("codeList", codeService.getStStdCd("CH003,DP011,DP008"));
        return mav;
    }

    /**
     * 그룹 목록 조회
     *
     * @param CcFotrInfoInfoRequest
     * @return realGridListResponse
     * @throws Exception
     */
    @RequestMapping(value = "/display/displayExhibitionGroupMgmt.getPrDispGrpBaseList.do", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public RealGridListResponse getPrDispGrpBaseList(PrDispGrpBaseRequest prDispGrpBaseRequest) throws Exception {
    	if(log.isDebugEnabled()) {
    		log.debug("[params]{}", prDispGrpBaseRequest);
        }

        int totalCount = displayExhibitionGroupMgmtService.getPrDispGrpBaseListCount(prDispGrpBaseRequest);
        List<PrDispGrpBaseRespons> prDispGrpBaseList = displayExhibitionGroupMgmtService.getPrDispGrpBaseList(prDispGrpBaseRequest);
        RealGridListResponse response = new RealGridListResponse(prDispGrpBaseList, totalCount);

        return response;
    }

    /**
     * 그룹 저장
     *
     * @param realGridCUD 삭제목록
     * @return 성공 메시지
     * @throws Exception
     */
    @RequestMapping("/display/displayExhibitionGroupMgmt.savePrDispGrpBaseList.do")
	@ResponseBody
	public JSONResponseEntity savePrDispGrpBaseList(@RealGridCUD(type = PrDispGrpBaseRequest.class) RealGridCUDRequest<PrDispGrpBaseRequest> realGridCUD) throws Exception {
        List<PrDispGrpBaseRequest> createList = realGridCUD.getCreate(), updateList = realGridCUD.getUpdate(), deleteList = realGridCUD.getDelete();
    	if(log.isDebugEnabled()) {
    		log.debug("[createList]{}", createList);
    		log.debug("[updateList]{}", updateList);
    		log.debug("[updateList]{}", deleteList);
        }
        displayExhibitionGroupMgmtService.savePrDispGrpBaseList(createList, updateList, deleteList);

        JSONResponseEntity jsonResponseEntity = new JSONResponseEntity(
                MessageResolver.getMessage("adminCommon.message.saved.successfully"));

        return jsonResponseEntity;
    }



    /**
     * 기획전 목록 조회
     *
     * @param CcFotrInfoInfoRequest
     * @return realGridListResponse
     * @throws Exception
     */
    @RequestMapping(value = "/display/displayExhibitionGroupMgmt.getPrDispGrpMappInfoList.do", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public RealGridListResponse getPrDispGrpMappInfoList(PrDispGrpMappInfoRequest prDispGrpMappInfoRequest) throws Exception {
    	if(log.isDebugEnabled()) {
    		log.debug("[prDispGrpMappInfoRequest]{}", prDispGrpMappInfoRequest);
        }

        int totalCount = displayExhibitionGroupMgmtService.getPrDispGrpMappInfoListCount(prDispGrpMappInfoRequest);
        List<PrDispGrpMappInfoRespons> prDispGrpMappInfo = displayExhibitionGroupMgmtService.getPrDispGrpMappInfoList(prDispGrpMappInfoRequest);
        RealGridListResponse response = new RealGridListResponse(prDispGrpMappInfo, totalCount);

        return response;
    }

    /**
     * 기획전 목록 저장
     *
     * @param realGridCUD 삭제목록
     * @return 성공 메시지
     * @throws Exception
     */
    @RequestMapping("/display/displayExhibitionGroupMgmt.savePrDispGrpMappInfoList.do")
	@ResponseBody
	public JSONResponseEntity savePrDispGrpMappInfoList(@RealGridCUD(type = PrDispGrpMappInfoRequest.class) RealGridCUDRequest<PrDispGrpMappInfoRequest> realGridCUD) throws Exception {
        List<PrDispGrpMappInfoRequest> createList = realGridCUD.getCreate(), updateList = realGridCUD.getUpdate(), deleteList = realGridCUD.getDelete();

    	if(log.isDebugEnabled()) {
    		log.debug("[createList]{}", createList);
    		log.debug("[updateList]{}", updateList);
    		log.debug("[deleteList]{}", deleteList);
        }

        displayExhibitionGroupMgmtService.savePrDispGrpMappInfoList(createList, updateList, deleteList);

        JSONResponseEntity jsonResponseEntity = new JSONResponseEntity(
                MessageResolver.getMessage("adminCommon.message.saved.successfully"));

        return jsonResponseEntity;
    }

    /**
     * 기획전 조회 View
     * @param model
     * @param prMkdpBaseRequest
     * @return
     * @throws Exception
     */
    @GetMapping(value="/display/displayExhibitionGroupMgmt.marketDisplayListPopup.do")
    public String marketDisplayListView(Model model, @Valid PrMkdpBaseRequest prMkdpBaseRequest) throws Exception {

    	//기획전유형코드(DP008), 기획전상태(DP020)
        Map<String, List<StStdCd>> codeList = codeService.getStStdCd("DP008,DP020");
        model.addAttribute("codeList", codeList);
        model.addAttribute("requestData", prMkdpBaseRequest);

        // 판매상태코드 옵션 값 설정
        if(prMkdpBaseRequest.getArgDispStat() != null) {
            if(!prMkdpBaseRequest.getArgDispStat().equals("")) {
                String[] argDispStatList = prMkdpBaseRequest.getArgDispStat().split(",");
                Map<String, String> resultDispStat = new HashMap<>();

                for(int j=0; j<argDispStatList.length; j++){
                    for(int i=0; i<codeList.get("DP020").size(); i++){
                        if(argDispStatList[j].equals( codeList.get("DP020").get(i).getCd() )){
                            resultDispStat.put(codeList.get("DP020").get(i).getCdNm(), codeList.get("DP020").get(i).getCd());
                            break;
                        }
                    }
                }
                model.addAttribute("dispStatList", resultDispStat);
            }
        }

        return "views/popup/marketDisplayListPopup";
    }

    /**
     * 기획전 목록 조회
     *
     * @param prDispCtgBaseRequest
     * @return realGridListResponse
     * @throws Exception
     */
    @RequestMapping(value = "/display/displayExhibitionGroupMgmt.getMarketDisplayList.do", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public RealGridListResponse getMarketDisplayList(PrMkdpBaseRequest prMkdpBaseRequest) throws Exception {
        int totalCount = displayExhibitionGroupMgmtService.getMarketDisplayListCount(prMkdpBaseRequest);
        List<PrMkdpBaseResponse> prMkdpBaseList = displayExhibitionGroupMgmtService.getMarketDisplayList(prMkdpBaseRequest);
        RealGridListResponse response = new RealGridListResponse(prMkdpBaseList, totalCount);

        return response;
    }
}