package com.enbiz.bo.app.repository.display;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.display.PrDispCtgBaseRequest;
import com.enbiz.bo.app.dto.request.display.PrDispGoodsInfoRequest;
import com.enbiz.bo.app.dto.response.display.PrDispCtgBaseResponse;
import com.enbiz.bo.app.dto.response.display.PrDispGoodsInfoResponse;

import java.util.List;

@Repository
@Lazy
public interface PrDispCtgBaseMapper {

    /**
     * 사이트 목록
     * @return
     * @throws Exception
     */
    List<PrDispCtgBaseResponse> getCcSiteBase() throws Exception;

    /**
     * 전시 카테고리 목록
     * @param prDispCtgBaseRequest
     * @return
     */
    List<PrDispCtgBaseResponse> getDisplayCategoryList(PrDispCtgBaseRequest prDispCtgBaseRequest);

    /**
     * 전시 카테고리 목록 수
     * @param prDispCtgBaseRequest
     * @return
     */
    int getDisplayCategoryListCount(PrDispCtgBaseRequest prDispCtgBaseRequest);

    /**
     * 전시 카테고리 목록 Tree 리스트 (공통 팝업)
     * @param prDispCtgBaseRequest
     * @return
     */
    List<PrDispCtgBaseResponse> getDisplayCategoryTreeList(PrDispCtgBaseRequest prDispCtgBaseRequest);

    /**
     * 전시 카테고리 관리 Tree 리스트
     * @param prDispCtgBaseRequest
     * @return
     */
    List<PrDispCtgBaseResponse> getCategoryTreeList(PrDispCtgBaseRequest prDispCtgBaseRequest);

    /**
     * 사이트 이름 조회
     * @return
     * @throws Exception
     */
    String getSiteName(PrDispCtgBaseRequest prDispCtgBaseRequest) throws Exception;

    /**
     * 전시 카테고리 관리 _ 몰 정보
     * @return
     * @throws Exception
     */
    PrDispCtgBaseResponse getMallDetail(PrDispCtgBaseRequest prDispCtgBaseRequest) throws Exception;

    /**
     * 사이트 전시카테고리 번호 조회
     * @return
     * @throws Exception
     */
    String getUprDispCtgNo(String siteNo) throws Exception;

    /**
     * 전시 카테고리 관리 _ 전시 카테고리 매장정보
     * @return
     * @throws Exception
     */
    PrDispCtgBaseResponse getCategoryDetail(PrDispCtgBaseRequest prDispCtgBaseRequest) throws Exception;

    /**
     * 하위 전시 카테고리 매장 목록 수 조회
     * @param prDispCtgBaseRequest
     * @return
     */
    int getSubCategoryListCount(PrDispCtgBaseRequest prDispCtgBaseRequest);

    /**
     * 하위 전시 카테고리 매장 목록
     * @param prDispCtgBaseRequest
     * @return
     */
    List<PrDispCtgBaseResponse> getSubCategoryList(PrDispCtgBaseRequest prDispCtgBaseRequest);

    /**
     * 하위 전시 카테고리 매장 목록 _ 전시상품 상세 조회
     * @return
     * @throws Exception
     */
    PrDispGoodsInfoResponse getGoodsDetail(PrDispGoodsInfoRequest prDispGoodsInfoRequest) throws Exception;

    /**
     * 매장 전시상품 조회 목록 수 조회
     * @param prDispGoodsInfoRequest
     * @return
     */
    int getDisplayGoodsListCount(PrDispGoodsInfoRequest prDispGoodsInfoRequest);

    /**
     * 매장 전시상품 조회 목록
     * @param prDispGoodsInfoRequest
     * @return
     */
    List<PrDispGoodsInfoResponse> getDisplayGoodsList(PrDispGoodsInfoRequest prDispGoodsInfoRequest);
}
