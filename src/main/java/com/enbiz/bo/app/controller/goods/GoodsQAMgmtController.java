package com.enbiz.bo.app.controller.goods;

import java.util.List;
import java.util.Map;

import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.enbiz.bo.app.controller.BaseController;
import com.enbiz.bo.app.dto.ajax.JSONResponseEntity;
import com.enbiz.bo.app.dto.request.goods.GoodsQADetailRequest;
import com.enbiz.bo.app.dto.request.goods.GoodsQAMgmtRequest;
import com.enbiz.bo.app.dto.request.login.LoginRequest;
import com.enbiz.bo.app.dto.response.goods.GoodsQAMgmtResponse;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.entity.StStdCd;
import com.enbiz.bo.app.enums.UR002;
import com.enbiz.bo.app.service.code.CodeService;
import com.enbiz.bo.app.service.goods.GoodsQAMgmtService;
import com.enbiz.common.base.Validator;
import com.enbiz.common.base.exception.MessageResolver;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 상품Q&A관리 Controller
 */
@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class GoodsQAMgmtController extends BaseController {

    private static final String MD_USER_TYPE = "MD";
    private static final String CUST_CNTR_USER_TYPE = "CC";
    private static final String NORMAL_USER_TYPE = "NM";

    private final CodeService codeService;
    private final GoodsQAMgmtService goodsQAMgmtService;

    /**
     * 상품Q&A관리 화면 호출
     * @param model
     * @return
     * @throws Exception
     */
    @RequestMapping("/goods/GoodsQAMgmt.goodsQAMgmtView.do")
    public String goodsQAMgmtView(Model model, @AuthenticationPrincipal LoginRequest loginRequest) throws Exception{

        /**
         * 공통코드 :
         * 처리상태코드 PR039
         * 질문유형코드 PR041
         * 매입형태코드 PR006
         * 전시상태코드 PR022
         */
        Map<String, List<StStdCd>> codeList = codeService.getStStdCd("PR039,PR041,PR006,PR022");
        model.addAttribute("codeList", codeList);

        // MD 권한 체크
        String userType = "";
        String jobGrpCd = loginRequest.getJobGrpCd();

        if(UR002.MD.isEquals(jobGrpCd)) {
            userType = MD_USER_TYPE;
        } else if (UR002.CUST_CNTR.isEquals(jobGrpCd)){
            userType = CUST_CNTR_USER_TYPE;
        } else {
            userType = NORMAL_USER_TYPE;
        }
        model.addAttribute("userType", userType);

        return "views/goods/goodsQAMgmtView";
    }

    /**
     * 상품Q&A목록 조회
     * @param request
     * @return
     * @throws Exception
     */
    @GetMapping("/goods/GoodsQAMgmt.getGoodsQAList.do")
    @ResponseBody
    public RealGridListResponse getGoodsQAList(GoodsQAMgmtRequest request) throws Exception {
        int totalCount = goodsQAMgmtService.getGoodsQAListCount(request);
        List<GoodsQAMgmtResponse> qaList = goodsQAMgmtService.getGoodsQAList(request);
        return new RealGridListResponse(qaList, totalCount);
    }

    /**
     * 상품Q&A 미처리 현황 조회
     * @param request
     * @return
     * @throws Exception
     */
    @PostMapping("/goods/GoodsQAMgmt.getUnProcessedGoodsQA.do")
    @ResponseBody
    public List<GoodsQAMgmtResponse> getUnProcessedGoodsQA(GoodsQAMgmtRequest request) throws Exception {
        return goodsQAMgmtService.getUnProcessedGoodsQA(request);
    }

    /**
     * 상품Q&A 일괄 전시상태 변경
     * @param request
     * @return
     * @throws Exception
     */
    @PostMapping("/goods/GoodsQAMgmt.modifyMultipleQADisplayState.do")
    @ResponseBody
    public JSONResponseEntity modifyMultipleQADisplayState(GoodsQAMgmtRequest request) throws Exception{
        goodsQAMgmtService.modifyMultipleQADisplayState(request);
        return new JSONResponseEntity(MessageResolver.getMessage("goodsQAMgmt.alert.msg.succeedQADispStatChangeMsg"));
    }

    /*============================================ [ 상품Q&A상세 ] ============================================*/

    /**
     * 상품Q&A 상세 팝업 호출
     * @param questNo
     * @param model
     * @return
     * @throws Exception
     */
    @GetMapping("/goods/GoodsQAMgmt.goodsQADetailView.do")
    public String goodsQADetailView(String questNo, Model model, @AuthenticationPrincipal LoginRequest loginRequest) throws Exception{

        Validator.throwIfEmpty(questNo, MessageResolver.getMessage("adminCommon.message.parameter.null", new String[]{"질문번호 확인불가"}));

        // 사용자 확인
        String userType = "";
        String jobGrpCd = loginRequest.getJobGrpCd();

        if(UR002.MD.isEquals(jobGrpCd)) {
            userType = MD_USER_TYPE;
        } else if (UR002.CUST_CNTR.isEquals(jobGrpCd)){
            userType = CUST_CNTR_USER_TYPE;
        } else {
            userType = NORMAL_USER_TYPE;
        }

        model.addAttribute("userType", userType);

        Map<String, List<StStdCd>> codeList = codeService.getStStdCd("PR039,PR022");
        model.addAttribute("codeList", codeList);
        
        // 답변템플릿목록
        model.addAttribute("questAnsTmplList", goodsQAMgmtService.getGoodsAllQATemplateList());

        // Q&A 질문정보 조회
        model.addAttribute("questBasicInfo", goodsQAMgmtService.getGoodsQuestionInfo(questNo));

        // Q&A 답변정보 조회
        model.addAttribute("questAnsList", goodsQAMgmtService.getGoodsAnswerList(questNo));

        return "views/goods/goodsQADetailView";
    }

    /**
     * 상품Q&A 답변 추가/수정
     * @param request
     * @return
     * @throws Exception
     */
    @PostMapping("/goods/GoodsQAMgmt.saveGoodsAnswer.do")
    @ResponseBody
    public JSONResponseEntity saveGoodsAnswer(GoodsQADetailRequest request) throws Exception{
        goodsQAMgmtService.saveGoodsAnswer(request);
        JSONResponseEntity response = new JSONResponseEntity(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
        return response;
    }

    /**
     * 상품Q&A 질문 전시상태변경
     * @param request
     * @return
     * @throws Exception
     */
    @PostMapping("/goods/GoodsQAMgmt.modifyQADisplayState.do")
    @ResponseBody
    public JSONResponseEntity modifyQADisplayState(GoodsQADetailRequest request) throws Exception{
        goodsQAMgmtService.modifyQADisplayState(request);
        JSONResponseEntity response = new JSONResponseEntity(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
        return response;
    }

    /**
     * 고객센터이관 팝업 호출
     * @param questNo
     * @param model
     * @return
     * @throws Exception
     */
    @GetMapping("/goods/GoodsQAMgmt.goodsQATransferView.do")
    public String goodsQATransferView(String questNo, Model model) throws Exception{
        Validator.throwIfEmpty( questNo, MessageResolver.getMessage("adminCommon.message.parameter.null", new String[] {"질문번호 확인불가"}));
        model.addAttribute("questInfo", goodsQAMgmtService.getGoodsQuestionInfo(questNo));
        return "views/goods/goodsQATransferView";
    }

    /**
     * 고객센터이관
     * @param request
     * @return
     * @throws Exception
     */
    @PostMapping("/goods/GoodsQAMgmt.transferGoodsQuestion.do")
    @ResponseBody
    public JSONResponseEntity transferGoodsQuestion(GoodsQADetailRequest request) throws Exception{
        goodsQAMgmtService.transferGoodsQuestion(request);
        return new JSONResponseEntity(MessageResolver.getMessage("goodsQAMgmt.goodsQADetail.goodsQATransfer.alert.msg.transferSuccessMsg"));
    }

}