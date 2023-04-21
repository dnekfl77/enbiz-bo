package com.enbiz.bo.app.service.order;

import java.util.List;

import com.enbiz.bo.app.dto.request.order.orderreception.*;
import com.enbiz.bo.app.dto.response.customer.CustomerNoMaskingResponse;
import com.enbiz.bo.app.dto.response.order.orderreception.*;
import com.enbiz.bo.app.entity.EtMbrDlvpInfo;
import com.enbiz.bo.app.entity.PrStdCtg;

/**
 * 상담사 주문접수 ServiceImpl
 */
public interface OrderReceptionService {

    /**
     * 회원정보 가져오기
     */
    CustomerNoMaskingResponse getMemberData(String mbrNo) throws Exception;

    /**
     * 배송지 목록 조회
     */
    List<MbrDlvpInfoResponse> getMemberDeliveryList(String mbrNo) throws Exception;


    /**
     * 수기주문접수 > 상품추가 팝업  > 표준상품분류 목록 조회 (조회조건)
     */
    List<PrStdCtg> getPrStdCtgList() throws Exception;

    /**
     * 상담원 주문접수 > 상품추가 팝업 > 키워드 조회
     */
    List<GoodsListResponse> getGoodsKeyWordList(GoodsKeyWordRequest goodsKeyWordRequest) throws Exception;

    /**
     * 상담원 주문접수 > 상품추가 팝업 > 키워드 목록수 조회
     */
    int getGoodsKeyWordListCount(GoodsKeyWordRequest goodsKeyWordRequest) throws Exception;

    /**
     * 상담원 주문접수 > 상품추가 팝업 > 고객주문이력 조회
     */
    List<GoodsListResponse> getGoodsOrderHistList(GoodsOrderHistRequest goodsOrderHistRequest) throws Exception;

    /**
     * 상담원 주문접수 > 상품추가 팝업 > 고객주문이력 목록수 조회
     */
    int getGoodsOrderHistListCount(GoodsOrderHistRequest goodsOrderHistRequest) throws Exception;

    /**
     * 상담원 주문접수 > 상품추가 팝업 > 위시리스트 조회
     */
    List<GoodsListResponse> getWishList(GoodsWishRequest goodsWishRequest) throws Exception;

    /**
     * 상담원 주문접수 > 상품추가 팝업 > 위시리스트 목록수 조회
     */
    int getWishListCount(GoodsWishRequest goodsWishRequest) throws Exception;

    /**
     * 상담원 주문접수 > 상품추가 팝업 >  베스트 100 조회
     */
    List<GoodsListResponse> getBest100List(GoodsBest100Request goodsBest100Request) throws Exception;

    /**
     * 상담원 주문접수 > 상품추가 팝업 >  베스트 100 목록수 조회
     */
    int getBest100ListCount(GoodsBest100Request goodsBest100Request) throws Exception;

    /**
     * 상담원 주문접수 > 배송지 선택 팝업 > 회원 배송지 List 저장
     */
    void saveMemberDeliveryList(List<EtMbrDlvpInfo> createList, List<EtMbrDlvpInfo> updateList) throws Exception;

    /**
     * 수기주문접수 > 사은품 선택 > 사은품 조회
     */
    List<OrderGiftResponse> getOrderGiftList(OrderGiftRequest orderGiftRequest) throws Exception;

    /**
     * 수기주문접수 > 최대 혜택 가져오기
     */
    List<OrderBenefitResponse> getBenefitList(OrderBenefitRequest orderBenefitRequest) throws Exception;

    /**
     * 수기주문접수 > 배송비 가져오기
     */
    List<DlvAmtResponse> getDlvAmtList(List<DlvAmtRequest> dlvAmtRequestList) throws Exception;

    /**
     * 상담사 주문 > 배송비 쿠폰
     */
    List<DlvCouponResponse> getDlvCouponList(DlvCouponRequest dlvCouponRequest) throws Exception;


    /**
     * 상담사 주문 > 회원 자산 조회
     */
    List<MbrAstSumResponse> getMbrAstSumList(String mbrNo) throws Exception;

}

