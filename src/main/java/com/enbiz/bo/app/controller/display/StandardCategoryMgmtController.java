package com.enbiz.bo.app.controller.display;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.enbiz.bo.app.controller.BaseController;
import com.enbiz.bo.app.dto.ajax.JSONResponseEntity;
import com.enbiz.bo.app.dto.request.display.PrStdCtgRequest;
import com.enbiz.bo.app.dto.request.realgrid.RealGridCUDRequest;
import com.enbiz.bo.app.dto.response.display.PrGoodsBaseResponse;
import com.enbiz.bo.app.dto.response.display.PrStdCtgResponse;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.entity.PrStdCtg;
import com.enbiz.bo.app.service.display.StandardCategoryMgmtService;
import com.enbiz.bo.base.annotation.RealGridCUD;
import com.enbiz.common.base.exception.MessageResolver;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 표준분류관리 관리 Controller
 */
@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class StandardCategoryMgmtController extends BaseController {

    private final StandardCategoryMgmtService standardCategoryMgmtService;

    /**
     * 표준분류관리 화면 호출
     * @return 표준분류관리 화면 경로
     * @throws Exception
     */
    @GetMapping("/display/standardCategoryMgmt.standardCategoryMgmtView.do")
    public String standardCategoryMgmtView() throws Exception {
        return "views/display/standardCategoryMgmtView";
    }

    /**
     * 전체 표준 분류 목록 조회
     * @return 표준 분류 목록
     * @throws Exception
     */
    @GetMapping(value = "/display/standardCategoryMgmt.getStandardCategoryMgmt.do")
    @ResponseBody
    public List<PrStdCtgResponse> getStandardCategoryMgmt() throws Exception {
        return standardCategoryMgmtService.getStandardCategoryMgmt();
    }

    /**
     * 표준 분류 기본 정보 조회
     * @param request
     * @return 표준 분류 기본 정보
     * @throws Exception
     */
    @GetMapping(value = "/display/standardCategoryMgmt.getStandardCategoryMgmtInfo.do")
    @ResponseBody
    public PrStdCtgResponse getStandardCategoryMgmtInfo(PrStdCtgRequest request) throws Exception {
        return standardCategoryMgmtService.getStandardCategoryMgmtInfo(request);
    }

    /**
     * 하위 표준 분류 목록 조회
     * @param request
     * @return 하위 표준 분류 목록
     * @throws Exception
     */
    @GetMapping(value = "/display/standardCategoryMgmt.getStandardCategoryMgmtChildList.do")
    @ResponseBody
    public RealGridListResponse getStandardCategoryMgmtChildList(PrStdCtgRequest request) throws Exception {
        int totalCount = standardCategoryMgmtService.getStandardCategoryMgmtChildListCount(request);
        List<PrStdCtgResponse> childCategoryList = standardCategoryMgmtService.getStandardCategoryMgmtChildList(request);
        RealGridListResponse response = new RealGridListResponse(childCategoryList, totalCount);
        return response;
    }

    /**
     * 표준 분류 상품 목록 조회
     * @param request
     * @return 표준 분류 상품 목록
     * @throws Exception
     */
    @GetMapping(value="/display/standardCategoryMgmt.getStandardCategoryMgmtGoodsList.do")
    @ResponseBody
    public RealGridListResponse getStandardCategoryMgmtGoodsList(PrStdCtgRequest request) throws Exception {
        int totalCount = standardCategoryMgmtService.getStandardCategoryMgmtGoodsListCount(request);
        List<PrGoodsBaseResponse> goodsList = standardCategoryMgmtService.getStandardCategoryMgmtGoodsList(request);
        RealGridListResponse response = new RealGridListResponse(goodsList, totalCount);
        return response;
    }

    /**
     * 표준 분류 기본 정보 수정
     * @param request
     * @return
     * @throws Exception
     */
    @PostMapping("/display/standardCategoryMgmt.saveStandardCategoryMgmtInfo.do")
    @ResponseBody
    public JSONResponseEntity saveStandardCategoryMgmtInfo(PrStdCtgRequest request) throws Exception {
        standardCategoryMgmtService.saveStandardCategoryMgmtInfo(request);
        return new JSONResponseEntity(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
    }

    /**
     * 표준 분류 삭제 가능 여부 확인
     * @param request
     * @return 삭제 가능 여부
     * @throws Exception
     */
    @GetMapping(value = "/display/standardCategoryMgmt.checkStandardCategoryDelete.do")
    @ResponseBody
    public boolean checkStandardCategoryDelete(PrStdCtgRequest request) throws Exception {
        return standardCategoryMgmtService.checkStandardCategoryDelete(request);
    }

    /**
     * 표준 분류 목록 저장
     * @param realGridCUD 추가, 수정, 삭제 목록
     * @return 성공 메세지
     * @throws Exception
     */
    @PostMapping("/display/standardCategoryMgmt.saveStandardCategoryChild.do")
    @ResponseBody
    public JSONResponseEntity saveStandardCategoryChild(@RealGridCUD(type = PrStdCtg.class) RealGridCUDRequest<PrStdCtg> realGridCUD) throws Exception{
        List<PrStdCtg> createList = realGridCUD.getCreate(), updateList = realGridCUD.getUpdate(), deleteList = realGridCUD.getDelete();
        standardCategoryMgmtService.cudStandardCategory(createList, updateList, deleteList);
        JSONResponseEntity jsonResponseEntity = new JSONResponseEntity(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
        return jsonResponseEntity;
    }
}
