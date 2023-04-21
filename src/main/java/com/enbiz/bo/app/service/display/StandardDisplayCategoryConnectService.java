package com.enbiz.bo.app.service.display;

import java.util.List;

import com.enbiz.bo.app.dto.request.display.PrStdCtgDispInfoRequest;
import com.enbiz.bo.app.dto.response.display.PrStdCtgResponse;
import com.enbiz.bo.app.dto.response.goods.PrStdCtgDispInfoResponse;
import com.enbiz.bo.app.entity.PrStdCtgDispInfo;

public interface StandardDisplayCategoryConnectService {

    /**
     * 표준분류 계층구조 목록 조회
     * @return 표준 분류 목록
     * @throws Exception
     */
    List<PrStdCtgResponse> getStandardDisplayCategoryConnectTree() throws Exception;

    /**
     * 연결 소전시 카테고리 목록 수 조회
     * @param request
     * @return 연결 소전시 카테고리 목록 수
     * @throws Exception
     */
    int getStandardDisplayCategoryConnectCount(PrStdCtgDispInfoRequest request) throws Exception;

    /**
     * 연결 소전시 카테고리 목록 조회
     * @param request
     * @return 연결 소전시 카테고리 목록
     * @throws Exception
     */
    List<PrStdCtgDispInfoResponse> getStandardDisplayCategoryConnect(PrStdCtgDispInfoRequest request) throws Exception;

    /**
     * 연결 소전시 카테고리 목록 저장
     * @param createList 추가 목록
     * @param updateList 수정 목록
     * @param deleteList 삭제 목록
     * @throws Exception
     */
    void cudPrStdCtgDispInfo(List<PrStdCtgDispInfo> createList, List<PrStdCtgDispInfo> updateList, List<PrStdCtgDispInfo> deleteList) throws Exception;

}
