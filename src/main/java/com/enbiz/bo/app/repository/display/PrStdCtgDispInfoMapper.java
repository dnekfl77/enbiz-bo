package com.enbiz.bo.app.repository.display;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.display.PrStdCtgDispInfoRequest;
import com.enbiz.bo.app.dto.response.display.PrStdCtgResponse;
import com.enbiz.bo.app.dto.response.goods.PrStdCtgDispInfoResponse;
import com.enbiz.bo.app.dto.response.goods.StandardCategoryDisplayResponse;

import java.util.List;

/**
 * 표준카테고리전시정보 DAO
 */
@Repository
@Lazy
public interface PrStdCtgDispInfoMapper {

    /**
     * 표준분류 계층구조 목록 조회
     * @return 상품표준분류 계층구조 목록
     */
    List<PrStdCtgResponse> getStandardDisplayCategoryConnectTree();

    /**
     * 연결 소전시 카테고리 목록 수
     * @param request
     * @return 연결 소전시 카테고리 목록 수
     */
    int getStandardDisplayCategoryConnectCount(PrStdCtgDispInfoRequest request);

    /**
     * 연결 소전시 카테고리 목록 조회
     * @param request
     * @return 연결 소전시 카테고리 목록
     */
    List<PrStdCtgDispInfoResponse> getStandardDisplayCategoryConnect(PrStdCtgDispInfoRequest request);

    /**
     * 임시 일반상품 등록/상세, 일반상품 상세 > 표준카테고리전시정보 목록 조회
     * @param stdCtgNo
     * @return
     */
    List<StandardCategoryDisplayResponse> getPrStdCtgDispInfoListFromGoods(String stdCtgNo);

}