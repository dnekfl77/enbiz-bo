package com.enbiz.bo.app.controller.goods;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.enbiz.bo.app.controller.BaseController;
import com.enbiz.bo.app.dto.ajax.JSONResponseEntity;
import com.enbiz.bo.app.dto.request.goods.ReviewEvaluationItemMgmtRequest;
import com.enbiz.bo.app.dto.request.realgrid.RealGridCUDRequest;
import com.enbiz.bo.app.dto.response.goods.ReviewEvaluationItemMgmtResponse;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.entity.PrEvltItemCd;
import com.enbiz.bo.app.entity.PrEvltValInfo;
import com.enbiz.bo.app.entity.PrStdCtgEvltItemInfo;
import com.enbiz.bo.app.service.goods.ReviewEvaluationItemMgmtService;
import com.enbiz.bo.base.annotation.RealGridCUD;
import com.enbiz.common.base.Validator;
import com.enbiz.common.base.exception.MessageResolver;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 리뷰평가항목관리 Controller
 */
@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class ReviewEvaluationItemMgmtController extends BaseController {

    private final ReviewEvaluationItemMgmtService reviewEvaluationItemMgmtService;

    /**
     * 리뷰평가항목관리 화면 호출
     * @param model
     * @return
     * @throws Exception
     */
    @RequestMapping("/goods/ReviewEvaluationItemMgmt.reviewEvaluationItemMgmtView.do")
    public String reviewEvaluationItemMgmtView(Model model) throws Exception{
        model.addAttribute("stdCtgList" , reviewEvaluationItemMgmtService.getStandardCategoryList());
        return "views/goods/reviewEvaluationItemMgmtView";
    }

    /**
     * 평가항목-표준분류 매핑관리 > 평가항목매핑목록 조회
     * @param request
     * @return
     * @throws Exception
     */
    @GetMapping("/goods/ReviewEvaluationItemMgmt.getReviewEvaluationItemListByCategory.do")
    @ResponseBody
    public RealGridListResponse getReviewEvaluationItemListByCategory(ReviewEvaluationItemMgmtRequest request) throws Exception {
        int totalCount = reviewEvaluationItemMgmtService.getReviewEvaluationItemListCountByCategory(request);
        List<ReviewEvaluationItemMgmtResponse> itemList = reviewEvaluationItemMgmtService.getReviewEvaluationItemListByCategory(request);
        return new RealGridListResponse(itemList, totalCount);
    }

    /**
     * 평가항목-표준분류 매핑관리 > 평가항목매핑목록 저장
     * @param realGridCUD
     * @return
     * @throws Exception
     */
    @PostMapping("/goods/ReviewEvaluationItemMgmt.saveReviewEvaluationItemListByCategory.do")
    @ResponseBody
    public JSONResponseEntity saveReviewEvaluationItemListByCategory(@RealGridCUD(type = PrStdCtgEvltItemInfo.class) RealGridCUDRequest<PrStdCtgEvltItemInfo> realGridCUD) throws Exception {
        List<PrStdCtgEvltItemInfo> createList = realGridCUD.getCreate(), updateList = realGridCUD.getUpdate(), deleteList = realGridCUD.getDelete();
        reviewEvaluationItemMgmtService.saveReviewEvaluationItemListByCategory(createList,updateList,deleteList);
        return new JSONResponseEntity(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
    }

    /**
     * 평가항목-표준분류 매핑관리 > 평가항목조회팝업 호출
     * @param evltItemNoList
     * @param model
     * @return
     * @throws Exception
     */
    @GetMapping("goods/ReviewEvaluationItemMgmt.reviewEvaluationItemListPopup.do")
    public String reviewEvaluationItemListPopup(String[] evltItemNoList, Model model) throws Exception{
        model.addAttribute("evltItemNoList", evltItemNoList);
        return "views/goods/reviewEvaluationItemListPopup";
    }

    /**
     * 평가항목-표준분류 매핑관리 > 평가항목조회팝업 > 추가대상 평가항목목록 조회
     * @param request
     * @return
     * @throws Exception
     */
    @GetMapping("/goods/ReviewEvaluationItemMgmt.getReviewEvaluationItemListForAdd.do")
    @ResponseBody
    public RealGridListResponse getReviewEvaluationItemListForAdd(ReviewEvaluationItemMgmtRequest request) throws Exception {
        int totalCount = reviewEvaluationItemMgmtService.getReviewEvaluationItemListCountForAdd(request);
        List<ReviewEvaluationItemMgmtResponse> itemList = reviewEvaluationItemMgmtService.getReviewEvaluationItemListForAdd(request);
        return new RealGridListResponse(itemList, totalCount);
    }

    /**
     * 평가항목-표준분류 매핑관리 > 평가항목상세 팝업호출
     * @param evltItemNo
     * @param model
     * @return
     * @throws Exception
     */
    @GetMapping("goods/ReviewEvaluationItemMgmt.reviewEvaluationItemDetailView.do")
    public String reviewEvaluationItemDetailView(String evltItemNo, Model model)throws Exception{
        Validator.throwIfEmpty( evltItemNo, MessageResolver.getMessage("adminCommon.message.parameter.null", new String[] {"평가항목번호 확인불가"}));
        model.addAttribute("evltItemValueList", reviewEvaluationItemMgmtService.getReviewEvaluationItemValueList(evltItemNo));
        return "views/goods/reviewEvaluationItemDetailView";
    }

    /**
     * 평가항목관리 > 평가항목목록조회
     * @param request
     * @return
     * @throws Exception
     */
    @GetMapping("/goods/ReviewEvaluationItemMgmt.getReviewEvaluationItemList.do")
    @ResponseBody
    public RealGridListResponse getReviewEvaluationItemList(ReviewEvaluationItemMgmtRequest request) throws Exception {
        int totalCount = reviewEvaluationItemMgmtService.getReviewEvaluationItemListCount(request);
        List<ReviewEvaluationItemMgmtResponse> itemList = reviewEvaluationItemMgmtService.getReviewEvaluationItemList(request);
        return new RealGridListResponse(itemList, totalCount);
    }

    /**
     * 평가항목관리 > 평가항목목록 저장
     * @param realGridCUD
     * @return
     * @throws Exception
     */
    @PostMapping("/goods/ReviewEvaluationItemMgmt.saveReviewEvaluationItemList.do")
    @ResponseBody
    public JSONResponseEntity saveReviewEvaluationItemList(@RealGridCUD(type = PrEvltItemCd.class) RealGridCUDRequest<PrEvltItemCd> realGridCUD) throws Exception {
        List<PrEvltItemCd> createList = realGridCUD.getCreate(), updateList = realGridCUD.getUpdate();
        String message = "adminCommon.message.saved.successfully";
        boolean succeeded = true;

        try {
            reviewEvaluationItemMgmtService.saveReviewEvaluationItemList(createList,updateList);
        } catch (IllegalArgumentException e) {
            message = e.getMessage();
            succeeded = false;
        }
        return new JSONResponseEntity(MessageResolver.getMessage(message) ,succeeded );
    }

    /**
     * 평가항목관리 > 매핑된 표준분류카테고리 목록 조회
     * @param evltItemNo
     * @return
     * @throws Exception
     */
    @GetMapping("/goods/ReviewEvaluationItemMgmt.getMappedCategoryListToEvaluationItem.do")
    @ResponseBody
    public List<ReviewEvaluationItemMgmtResponse> getMappedCategoryListToEvaluationItem(String evltItemNo) throws Exception {
        Validator.throwIfEmpty( evltItemNo, MessageResolver.getMessage("adminCommon.message.parameter.null", new String[] {"평가항목번호 확인불가"}));
        return reviewEvaluationItemMgmtService.getMappedCategoryListToEvaluationItem(evltItemNo);
    }

    /**
     * 평가항목관리 > 평가값목록조회
     * @param request
     * @return
     * @throws Exception
     */
    @GetMapping("/goods/ReviewEvaluationItemMgmt.getReviewEvaluationValueList.do")
    @ResponseBody
    public RealGridListResponse getReviewEvaluationValueList(ReviewEvaluationItemMgmtRequest request) throws Exception {
        int totalCount = reviewEvaluationItemMgmtService.getReviewEvaluationValueListCount(request);
        List<ReviewEvaluationItemMgmtResponse> valueList = reviewEvaluationItemMgmtService.getReviewEvaluationValueList(request);
        return new RealGridListResponse(valueList, totalCount);
    }

    /**
     * 평가항목관리 > 평가값목록 저장
     * @param realGridCUD
     * @return
     * @throws Exception
     */
    @PostMapping("/goods/ReviewEvaluationItemMgmt.saveReviewEvaluationValueList.do")
    @ResponseBody
    public JSONResponseEntity saveReviewEvaluationValueList(@RealGridCUD(type = PrEvltValInfo.class) RealGridCUDRequest<PrEvltValInfo> realGridCUD) throws Exception {
        List<PrEvltValInfo> createList = realGridCUD.getCreate(), updateList = realGridCUD.getUpdate(), deleteList = realGridCUD.getDelete();
        reviewEvaluationItemMgmtService.saveReviewEvaluationValueList(createList,updateList,deleteList);
        return new JSONResponseEntity(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
    }
}

