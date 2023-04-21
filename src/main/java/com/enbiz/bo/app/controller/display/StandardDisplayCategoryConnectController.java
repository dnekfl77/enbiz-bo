package com.enbiz.bo.app.controller.display;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.enbiz.bo.app.controller.BaseController;
import com.enbiz.bo.app.dto.ajax.JSONResponseEntity;
import com.enbiz.bo.app.dto.request.display.PrStdCtgDispInfoRequest;
import com.enbiz.bo.app.dto.request.realgrid.RealGridCUDRequest;
import com.enbiz.bo.app.dto.response.display.PrStdCtgResponse;
import com.enbiz.bo.app.dto.response.goods.PrStdCtgDispInfoResponse;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.entity.PrStdCtgDispInfo;
import com.enbiz.bo.app.service.display.StandardDisplayCategoryConnectService;
import com.enbiz.bo.base.annotation.RealGridCUD;
import com.enbiz.common.base.exception.MessageResolver;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 표준분류&전시카테고리연결 Controller
 */
@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class StandardDisplayCategoryConnectController extends BaseController {

    private final StandardDisplayCategoryConnectService standardDisplayCategoryConnectService;

    /**
     * 표준분류&전시카테고리연결 화면 호출
     * @return 표준분류&전시카테고리연결 화면 경로
     * @throws Exception
     */
    @GetMapping("/display/standardDisplayCategoryConnect.standardDisplayCategoryConnectView.do")
    public String standardDisplayCategoryConnectView() throws Exception {
        return "views/display/standardDisplayCategoryConnectView";
    }

    /**
     * 표준분류 계층구조 목록 조회
     * @return 표준 분류 목록
     * @throws Exception
     */
    @GetMapping("/display/standardDisplayCategoryConnect.getStandardDisplayCategoryConnectTree.do")
    @ResponseBody
    public List<PrStdCtgResponse> getStandardDisplayCategoryConnectTree() throws Exception {
        return standardDisplayCategoryConnectService.getStandardDisplayCategoryConnectTree();
    }

    /**
     * 연결 소전시 카테고리 목록 조회
     * @param request
     * @return 연결 소전시 카테고리 목록
     * @throws Exception
     */
    @GetMapping("/display/standardDisplayCategoryConnect.getStandardDisplayCategoryConnect.do")
    @ResponseBody
    public RealGridListResponse getStandardDisplayCategoryConnect(PrStdCtgDispInfoRequest request) throws Exception {
        int totalCount = standardDisplayCategoryConnectService.getStandardDisplayCategoryConnectCount(request);
        List<PrStdCtgDispInfoResponse> childCategoryList = standardDisplayCategoryConnectService.getStandardDisplayCategoryConnect(request);
        RealGridListResponse response = new RealGridListResponse(childCategoryList, totalCount);
        return response;
    }

    /**
     * 연결 소전시 카테고리 목록 저장
     * @param realGridCUD 추가, 수정, 삭제 목록
     * @return 성공 메세지
     * @throws Exception
     */
    @PostMapping("/display/standardDisplayCategoryConnect.saveStandardDisplayCategoryConnect.do")
    @ResponseBody
    public JSONResponseEntity saveStandardDisplayCategoryConnect(@RealGridCUD(type = PrStdCtgDispInfo.class)RealGridCUDRequest<PrStdCtgDispInfo> realGridCUD) throws Exception{
        List<PrStdCtgDispInfo> createList = realGridCUD.getCreate(), updateList = realGridCUD.getUpdate(), deleteList = realGridCUD.getDelete();
        standardDisplayCategoryConnectService.cudPrStdCtgDispInfo(createList, updateList, deleteList);
        JSONResponseEntity jsonResponseEntity = new JSONResponseEntity(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
        return jsonResponseEntity;
    }

}
