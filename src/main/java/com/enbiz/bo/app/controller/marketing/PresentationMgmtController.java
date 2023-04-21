package com.enbiz.bo.app.controller.marketing;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.enbiz.bo.app.controller.BaseController;
import com.enbiz.bo.app.dto.ajax.JSONResponseEntity;
import com.enbiz.bo.app.dto.request.marketing.PresentationDuplicateRequest;
import com.enbiz.bo.app.dto.request.marketing.PresentationRequest;
import com.enbiz.bo.app.dto.request.realgrid.RealGridCUDRequest;
import com.enbiz.bo.app.dto.response.marketing.PresentationResponse;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.entity.PrPrestHist;
import com.enbiz.bo.app.service.marketing.PresentationMgmtService;
import com.enbiz.bo.base.annotation.RealGridCUD;
import com.enbiz.common.base.exception.MessageResolver;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.sf.json.JSONObject;


/**
 * 증정행사관리 Controller
 */
@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class PresentationMgmtController extends BaseController{

    private final PresentationMgmtService presentationMgmtService;

    /**
     * 증정품 관리 화면
     * @param model
     * @return
     * @throws Exception
     */
    @GetMapping("/marketing/presentationMgmt.presentationMgmtView.do")
    public String presentationManageList() throws Exception {
        return "views/marketing/presentationMgmtView";
    }

    /**
     * 증정품 관리 목록 조회
     * @param presentationRequest
     * @return
     * @throws Exception
     */
    @GetMapping("/marketing/presentationMgmt.getPresentationManageList.do")
    @ResponseBody
    public RealGridListResponse getPresentationManageList(PresentationRequest presentationRequest) throws Exception {
        int totalCount = presentationMgmtService.getPresentationListCount(presentationRequest);
        List<PresentationResponse> promotionList = presentationMgmtService.getPresentationList(presentationRequest);
        RealGridListResponse response = new RealGridListResponse(promotionList, totalCount);
        return response;
    }


    /**
     * 증정품 목록 저장
     * @param realGridCUD 추가, 수정, 삭제 목록
     * @return 성공 메세지
     * @throws Exception
     */
    @PostMapping("/marketing/presentationMgmt.savePresentation.do")
    @ResponseBody
    public JSONResponseEntity<Void> cudPrPrestHist(
            @RealGridCUD(type = PrPrestHist.class) RealGridCUDRequest<PrPrestHist> realGridCUD) throws Exception{
        List<PrPrestHist> createList = realGridCUD.getCreate(), updateList = realGridCUD.getUpdate(), deleteList = realGridCUD.getDelete();
        presentationMgmtService.savePresentation(createList, updateList, deleteList);
        JSONResponseEntity<Void> jsonResponseEntity = new JSONResponseEntity<Void>(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
        return jsonResponseEntity;
    }

    /**
     * 기간내 중복 증정품  등록 check
     * @param request
     * @return
     */
    @PostMapping("/marketing/presentationMgmt.checkDuplicate.do")
    @ResponseBody
    public Object duplicateCheck(@RequestBody List<PresentationDuplicateRequest> request) throws Exception {
        JSONObject object = new JSONObject();
        List<String> duplicateGoods = presentationMgmtService.checkDuplicate(request);
        object.put("duplicateGoods",duplicateGoods);
        object.put("duplicateGoodsCount",duplicateGoods.size());
        return object;
    }
}
