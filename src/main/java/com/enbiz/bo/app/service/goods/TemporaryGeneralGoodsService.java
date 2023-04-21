package com.enbiz.bo.app.service.goods;

import java.util.List;

import com.enbiz.bo.app.dto.request.goods.DeliveryPolicyRequest;
import com.enbiz.bo.app.dto.request.goods.GoodsOptionRequest;
import com.enbiz.bo.app.dto.request.goods.StandardCategoryDisplayRequest;
import com.enbiz.bo.app.dto.request.goods.TemporaryGeneralGoodsRequest;
import com.enbiz.bo.app.dto.request.realgrid.RawRealGridCUDRequest;
import com.enbiz.bo.app.dto.response.goods.DeliveryPolicyResponse;
import com.enbiz.bo.app.dto.response.goods.GoodsOptionResponse;
import com.enbiz.bo.app.dto.response.goods.StandardCategoryDisplayResponse;
import com.enbiz.bo.app.dto.response.goods.TemporaryGeneralGoodsResponse;
import com.enbiz.bo.app.entity.*;

/**
 * 임시 일반상품 Service
 */
public interface TemporaryGeneralGoodsService {


    /**
     * 배송비/반품비 정책 목록 조회
     * @param request
     * @return 반품비/배송비 정책 목록
     * @throws Exception
     */
    List<DeliveryPolicyResponse> getDeliveryPolicyList(DeliveryPolicyRequest request) throws Exception;

    /**
     * 상품고시항목 목록 조회
     * @param goodsNotiLisartCd
     * @return 상품 고시 항목 코드 목록
     * @throws Exception
     */
    List<PrGoodsNotiItemCd> getGoodsNotificationItemList(String goodsNotiLisartCd) throws Exception;

    /**
     * 옵션분류 목록 조회
     * @param request
     * @return 옵션분류 목록
     * @throws Exception
     */
    List<GoodsOptionResponse> getOptionCategoryList(GoodsOptionRequest request) throws Exception;

    /**
     * 옵션목록 조회
     * @param request
     * @return
     * @throws Exception
     */
    List<GoodsOptionResponse> getOptionList(GoodsOptionRequest request) throws Exception;

    /**
     * 표준카테고리별 전시카테고리 목록 조회
     * @param request
     * @return 표준카테고리별 전시카테고리 목록
     * @throws Exception
     */
    List<StandardCategoryDisplayResponse> getDisplayCategoryListByStandardCategory(StandardCategoryDisplayRequest request) throws Exception;

    /**
     * 임시 일반상품 등록
     * @param request
     * @throws Exception
     */
    void registTemporaryGeneralGoods(RawRealGridCUDRequest rawCUDRequest, TemporaryGeneralGoodsRequest request) throws Exception;

    /**
     * 임시 일반상품 정보 조회
     * @param pregGoodsNo
     * @return
     * @throws Exception
     */
    TemporaryGeneralGoodsResponse getTemporaryGeneralGoodsInfo(String pregGoodsNo) throws Exception;

    /**
     * 임시 일반상품 수정
     * @param rawCUDRequest
     * @param request
     * @return
     * @throws Exception
     */
    void modifyTemporaryGeneralGoods(RawRealGridCUDRequest rawCUDRequest, TemporaryGeneralGoodsRequest request) throws Exception;

}
