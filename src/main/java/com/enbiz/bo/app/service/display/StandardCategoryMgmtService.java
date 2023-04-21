package com.enbiz.bo.app.service.display;

import java.util.List;

import com.enbiz.bo.app.dto.request.display.PrStdCtgRequest;
import com.enbiz.bo.app.dto.response.display.PrGoodsBaseResponse;
import com.enbiz.bo.app.dto.response.display.PrStdCtgResponse;
import com.enbiz.bo.app.entity.PrStdCtg;

public interface StandardCategoryMgmtService {

    /**
     * 전체 표준 분류 목록 조회
     * @return 표준 분류 목록
     * @throws Exception
     */
    List<PrStdCtgResponse> getStandardCategoryMgmt() throws Exception;

    /**
     * 표준 분류 기본 정보 조회
     * @param request
     * @return 표준 분류 기본 정보
     * @throws Exception
     */
    PrStdCtgResponse getStandardCategoryMgmtInfo(PrStdCtgRequest request) throws Exception;

    /**
     * 하위 표준 분류 목록 수
     * @param request
     * @return 하위 표준 분류 목록 수
     * @throws Exception
     */
    int getStandardCategoryMgmtChildListCount(PrStdCtgRequest request) throws Exception;

    /**
     * 하위 표준 분류 목록 조회
     * @param request
     * @return 하위 표준 분류 목록
     * @throws Exception
     */
    List<PrStdCtgResponse> getStandardCategoryMgmtChildList(PrStdCtgRequest request) throws Exception;

    /**
     * 표준 분류 상품 목록 수
     * @param request
     * @return 표준 분류 상품 목록 수
     * @throws Exception
     */
    int getStandardCategoryMgmtGoodsListCount(PrStdCtgRequest request) throws Exception;

    /**
     * 표준 분류 상품 목록 조회
     * @param request
     * @return 표준 분류 상품 목록
     * @throws Exception
     */
    List<PrGoodsBaseResponse> getStandardCategoryMgmtGoodsList(PrStdCtgRequest request) throws Exception;

    /**
     *  표준 분류 기본 정보 수정
     * @param request
     * @throws Exception
     */
    void saveStandardCategoryMgmtInfo(PrStdCtgRequest request) throws  Exception;


    /**
     * 표준 분류 삭제 가능 여부 확인
     * @param request
     * @return 삭제 가능 여부
     * @throws Exception
     */
    boolean checkStandardCategoryDelete(PrStdCtgRequest request) throws Exception;

    /**
     * 표준 분류 목록 저장
     * @param createList 추가 목록
     * @param updateList 수정 목록
     * @param deleteList 삭제 목록
     * @throws Exception
     */
    void cudStandardCategory(List<PrStdCtg> createList, List<PrStdCtg> updateList, List<PrStdCtg> deleteList) throws Exception;

}
