package com.enbiz.bo.app.repository.display;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.display.PrStdCtgRequest;
import com.enbiz.bo.app.dto.response.display.PrGoodsBaseResponse;
import com.enbiz.bo.app.dto.response.display.PrStdCtgResponse;

import java.util.List;

/**
 * 상품표준분류 DAO
 */
@Repository
@Lazy
public interface PrStdCtgMapper {

    /**
     * 상품표준분류 계층구조 목록 조회
     * @return 상품표준분류 계층구조 목록
     */
    List<PrStdCtgResponse> getPrStdCtgListWithHierarchy();

    /**
     * 상품표준분류 기본정보 조회
     * @param request
     * @return 상품표준분류 기본정보
     */
    PrStdCtgResponse getStandardCategoryInfo(PrStdCtgRequest request);

    /**
     * 하위 표준 분류 목록 수
     * @param request
     * @return 하위 표준 분류 목록 수
     */
    int getStandardCategoryMgmtChildListCount(PrStdCtgRequest request);

    /**
     * 하위 표준 분류 목록 조회
     * @param request
     * @return 하위 표준 분류 목록
     */
    List<PrStdCtgResponse> getStandardCategoryMgmtChildList(PrStdCtgRequest request);

    /**
     * 표준 분류 상품 목록 수
     * @param request
     * @return 표준 분류 상품 수
     */
    int getStandardCategoryMgmtGoodsListCount(PrStdCtgRequest request);

    /**
     * 표준 분류 상품 목록 조회
     * @param request
     * @return 표준 분류 상품 목록
     */
    List<PrGoodsBaseResponse> getStandardCategoryMgmtGoodsList(PrStdCtgRequest request);


    /**
     * 표준 분류 연결 전시 목록 수 조회
     * @param request
     * @return 표준 분류 연결 전시 목록 수
     */
    int getStandardCategoryDisplayListCount(PrStdCtgRequest request);



}