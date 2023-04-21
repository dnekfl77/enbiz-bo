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
import org.springframework.web.bind.annotation.ResponseBody;

import com.enbiz.bo.app.controller.BaseController;
import com.enbiz.bo.app.dto.ajax.JSONResponseEntity;
import com.enbiz.bo.app.dto.request.goods.ReviewDetailRequest;
import com.enbiz.bo.app.dto.request.goods.ReviewMgmtRequest;
import com.enbiz.bo.app.dto.response.goods.ReviewDetailResponse;
import com.enbiz.bo.app.dto.response.goods.ReviewMgmtResponse;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.entity.StStdCd;
import com.enbiz.bo.app.service.code.CodeService;
import com.enbiz.bo.app.service.goods.ReviewMgmtServiceImpl;
import com.enbiz.common.base.Validator;
import com.enbiz.common.base.exception.MessageResolver;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 리뷰관리 Controller
 */
@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class ReviewMgmtController extends BaseController {

    private final CodeService codeService;
    private final ReviewMgmtServiceImpl reviewMgmtServiceImpl;

    /**
     * 리뷰관리 화면 호출
     * @param model
     * @return
     * @throws Exception
     */
    @RequestMapping("/goods/ReviewMgmt.reviewMgmtView.do")
    public String reviewMgmtView(Model model) throws Exception{

        Map<String, List<StStdCd>> codeList = codeService.getStStdCd("PR021,PR022");
        model.addAttribute("codeList", codeList);

        return "views/goods/reviewMgmtView";
    }

    /**
     * 리뷰 목록 조회
     * @param request
     * @return
     * @throws Exception
     */
    @GetMapping("/goods/ReviewMgmt.getReviewList.do")
    @ResponseBody
    public RealGridListResponse getReviewList(ReviewMgmtRequest request) throws Exception {
        int totalCount = reviewMgmtServiceImpl.getReviewListCount(request);
        List<ReviewMgmtResponse> reviewList = reviewMgmtServiceImpl.getReviewList(request);
        return new RealGridListResponse(reviewList, totalCount);
    }

    /**
     * 리뷰 목록 전시상태 변경
     * @param request
     * @return
     * @throws Exception
     */
    @PostMapping("/goods/ReviewMgmt.modifyMultipleReviewsDisplayState.do")
    @ResponseBody
    public JSONResponseEntity modifyMultipleReviewsDisplayState(ReviewMgmtRequest request)throws Exception{
        reviewMgmtServiceImpl.modifyMultipleReviewsDisplayState(request);
        return new JSONResponseEntity(MessageResolver.getMessage("reviewMgmt.alert.msg.modifyDisplayStateSuccessMsg"));
    }

    /*============================================ [ 리뷰 상세 ] ============================================*/

    /**
     * 리뷰상세 팝업 호출
     * @param revNo
     * @param model
     * @return
     * @throws Exception
     */
    @GetMapping("/goods/ReviewMgmt.reviewDetailView.do")
    public String reviewDetailView(String revNo, Model model) throws Exception{

        Validator.throwIfEmpty( revNo, MessageResolver.getMessage("adminCommon.message.parameter.null", new String[] {"리뷰번호 확인불가"}));

        // 리뷰 상세 조회
        model.addAttribute("revInfo", reviewMgmtServiceImpl.getReviewInfo(revNo));

        // 리뷰 첨부파일 조회
        model.addAttribute("revFiles", reviewMgmtServiceImpl.getReviewAttachedFileList(revNo));

        // 리뷰 평가항목별 답변 목록 조회
        model.addAttribute("revEvltItems", reviewMgmtServiceImpl.getReviewEvaluationList(revNo));

        model.addAttribute("codeList", codeService.getStStdCd("PR022"));

        return "views/goods/reviewDetailView";
    }

    /**
     * 리뷰 답글 목록 조회
     * @param request
     * @return
     * @throws Exception
     */
    @GetMapping("/goods/ReviewMgmt.getReviewReplyList.do")
    @ResponseBody
    public RealGridListResponse getReviewReplyList(ReviewDetailRequest request) throws Exception {
        int totalCount = reviewMgmtServiceImpl.getReviewReplyListCount(request);
        List<ReviewDetailResponse> replyList = reviewMgmtServiceImpl.getReviewReplyList(request);
        return new RealGridListResponse(replyList, totalCount);
    }

    /**
     * 리뷰 사진 상세 팝업
     * @param revNo
     * @param model
     * @return
     * @throws Exception
     */
    @GetMapping("/goods/ReviewMgmt.reviewAttachedFileDetailView.do")
    public String reviewAttachedFileDetailView(String revNo, Model model)throws Exception{

        Validator.throwIfEmpty( revNo, MessageResolver.getMessage("adminCommon.message.parameter.null", new String[] {"리뷰번호 확인불가"}));

        // 리뷰 첨부파일 조회
        model.addAttribute("revFiles", reviewMgmtServiceImpl.getReviewAttachedFileList(revNo));

        return "views/goods/reviewAttachedFileDetailView";
    }

    /**
     * 리뷰전시상태 변경
     * @param request
     * @return
     * @throws Exception
     */
    @PostMapping("/goods/ReviewMgmt.modifyReviewDisplayState.do")
    @ResponseBody
    public JSONResponseEntity modifyReviewDisplayState(ReviewDetailRequest request)throws Exception{
        reviewMgmtServiceImpl.modifyReviewDisplayState(request);
        return new JSONResponseEntity(MessageResolver.getMessage("reviewMgmt.reviewDetail.alert.msg.revDispStateChangedMsg"));
    }

    /**
     * 사진전시상태 변경
     * @param request
     * @return
     * @throws Exception
     */
    @PostMapping("/goods/ReviewMgmt.modifyReviewPhotoDisplayState.do")
    @ResponseBody
    public JSONResponseEntity modifyReviewPhotoDisplayState(ReviewDetailRequest request)throws Exception{
        reviewMgmtServiceImpl.modifyReviewPhotoDisplayState(request);
        return new JSONResponseEntity(MessageResolver.getMessage("reviewMgmt.reviewDetail.alert.msg.photoDispStateChangedMsg"));
    }

    /**
     * 답글 목록 전시상태 변경
     * @param request
     * @return
     * @throws Exception
     */
    @PostMapping("/goods/ReviewMgmt.modifyRepliesDisplayState.do")
    @ResponseBody
    public JSONResponseEntity modifyRepliesDisplayState(ReviewDetailRequest request)throws Exception{
        reviewMgmtServiceImpl.modifyRepliesDisplayState(request);
        return new JSONResponseEntity(MessageResolver.getMessage("reviewMgmt.reviewDetail.alert.msg.repliesDispStateChangedMsg"));
    }

    /**
     * 리뷰 답글 등록 /상세 팝업
     * @param revNo
     * @param model
     * @return
     * @throws Exception
     */
    @GetMapping("/goods/ReviewMgmt.reviewReplyRegistView.do")
    public String reviewReplyRegistView(String revNo, String replyCont, Model model)throws Exception{

        /**
         * pageType
         * R : 등록
         * D : 상세
         */
        Validator.throwIfEmpty( revNo, MessageResolver.getMessage("adminCommon.message.parameter.null", new String[] {"리뷰번호 확인불가"}));

        model.addAttribute("revNo", revNo);
        model.addAttribute("replyCont", replyCont);
        model.addAttribute("pageType", (StringUtils.isBlank(replyCont))? "R" : "D");

        return "views/goods/reviewReplyRegistView";
    }

    /**
     * 리뷰 답글 등록
     * @param request
     * @return
     * @throws Exception
     */
    @PostMapping("/goods/ReviewMgmt.registReviewReply.do")
    @ResponseBody
    public JSONResponseEntity registReviewReply(ReviewDetailRequest request)throws Exception{
        reviewMgmtServiceImpl.registReviewReply(request);
        return new JSONResponseEntity(MessageResolver.getMessage("reviewMgmt.reviewReplyRegist.alert.msg.successReplyRegistMsg"));
    }
}

