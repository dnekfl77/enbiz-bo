package com.enbiz.bo.app.service.goods;

import java.util.List;

import com.enbiz.bo.app.dto.request.goods.GeneralGoodsRequest;
import com.enbiz.bo.app.dto.request.goods.GoodsPriceHistoryRequest;
import com.enbiz.bo.app.dto.request.goods.PackageGoodsRequest;
import com.enbiz.bo.app.dto.request.realgrid.RawRealGridCUDRequest;
import com.enbiz.bo.app.dto.response.goods.DeliveryPolicyResponse;
import com.enbiz.bo.app.dto.response.goods.GeneralGoodsResponse;
import com.enbiz.bo.app.dto.response.goods.GoodsBaseResponse;
import com.enbiz.bo.app.dto.response.goods.GoodsPriceHistoryResponse;
import com.enbiz.bo.app.dto.response.goods.PackageGoodsResponse;
import com.enbiz.bo.app.entity.PrGoodsNotiItemCd;
import com.enbiz.bo.app.entity.PrGoodsPrcHist;

/**
 * 상품 Service
 */
public interface GoodsCommonService {

    /**
     * 상품정보 조회
     * @param goodsNo
     * @return
     * @throws Exception
     */
    GoodsBaseResponse getGoodsBaseInfo(String goodsNo) throws Exception;

    /**
     * 일반상품 상세 > 상품 상세정보 조회
     * @param goodsBase
     * @return
     * @throws Exception
     */
    GeneralGoodsResponse getGeneralGoodsInfo(GoodsBaseResponse goodsBase) throws Exception;

    /**
     * 묶음상품 상세 > 상품 상세정보 조회
     * @param goodsBase
     * @return
     * @throws Exception
     */
    PackageGoodsResponse getPackageGoodsInfo(GoodsBaseResponse goodsBase) throws Exception;

    /**
     * 일반상품 상세 > 상품고시항목 목록 조회
     * @param goodsNotiLisartCd
     * @return
     * @throws Exception
     * getGoodsNotificationItemList
     */
    List<PrGoodsNotiItemCd> getGoodsNotificationItemList(String goodsNotiLisartCd) throws Exception;

    /**
     * 일반상품 상세 > 배송비/반품비 정책 목록 조회
     * @param entrNo
     * @return 반품비/배송비 정책 목록
     * @throws Exception
     */
    List<DeliveryPolicyResponse> getDeliveryPolicyList(String entrNo) throws Exception;

    /**
     * 일반상품 상세 > 가격 변경 예약건 유무 조회
     * @param goodsNo
     * @return
     * @throws Exception
     */
    boolean checkGoodsReservedPriceHistoryYn(String goodsNo) throws Exception;

    /**
     * 일반상품 상세 > 상품가격이력 목록 수 조회
     * @param request
     * @return
     * @throws Exception
     */
    int getGeneralGoodsPriceHistoryListCount(GoodsPriceHistoryRequest request) throws Exception;

    /**
     * 일반상품 상세 > 상품가격이력 목록 조회
     * @param request
     * @return
     * @throws Exception
     */
    List<GoodsPriceHistoryResponse> getGeneralGoodsPriceHistoryList(GoodsPriceHistoryRequest request) throws Exception;

    /**
     * 일반상품 상세 > 현재 상품가격이력 조회
     * @param goodsNo
     * @return
     * @throws Exception
     */
    PrGoodsPrcHist getPresentGoodsPriceHistory(String goodsNo) throws Exception;

    /**
     * 일반상품 상세 > 가격 변경 예약 팝업 > 가격 변경 예약
     * @param request
     * @throws Exception
     */
    void modifyGoodsPriceReservation(GoodsPriceHistoryRequest request) throws Exception;

    /**
     * 일반상품 상세 > 일반상품 수정
     * @param rawCUDRequest
     * @param request
     * @throws Exception
     */
    void modifyGeneralGoods(RawRealGridCUDRequest rawCUDRequest, GeneralGoodsRequest request) throws Exception;

    /**
     * 묶음상품 상세 > 묶음상품 수정
     * @param rawCUDRequest
     * @param request
     * @throws Exception
     */
    void modifyPackageGoods(RawRealGridCUDRequest rawCUDRequest, PackageGoodsRequest request) throws Exception;

}
