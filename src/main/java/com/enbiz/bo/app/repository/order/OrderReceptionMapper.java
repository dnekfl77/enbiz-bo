package com.enbiz.bo.app.repository.order;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.order.orderreception.*;
import com.enbiz.bo.app.dto.response.order.orderreception.*;
import com.enbiz.bo.app.entity.EtMbrDlvpInfo;
import com.enbiz.bo.app.entity.PrStdCtg;

import java.util.List;

/**
 * 주문관리 > 수기주문접수 DAO
 */
@Repository
@Lazy
public interface OrderReceptionMapper {

    /**
     * 수기주문접수 > 상품추가 팝업  > 표준상품분류 목록 조회 (조회조건)
     */
    List<PrStdCtg> getPrStdCtgList();

    /**
     * 수기주문접수 > 상품추가 팝업 > 키워드 목록 조회
     */
    List<GoodsListResponse> getGoodsKeyWordList(GoodsKeyWordRequest goodsKeyWordRequest);

    /**
     * 수기주문접수 > 상품추가 팝업 > 키워드 목록수 조회
     */
    int getGoodsKeyWordListCount(GoodsKeyWordRequest goodsKeyWordRequest);

    /**
     * 수기주문접수 > 상품추가 팝업 > 고객주문이력 목록 조회
     */
    List<GoodsListResponse> getGoodsOrderHistList(GoodsOrderHistRequest goodsKeyWordRequest);

    /**
     * 수기주문접수 > 상품추가 팝업 > 고객주문이력 목록수 조회
     */
    int getGoodsOrderHistListCount(GoodsOrderHistRequest goodsKeyWordRequest);

    /**
     * 수기주문접수 > 상품추가 팝업 > 위시리스트 목록 조회
     */
    List<GoodsListResponse> getWishList(GoodsWishRequest goodsWishRequest);

    /**
     * 수기주문접수 > 상품추가 팝업 > 위시리스트 목록수 조회
     */
    int getWishListCount(GoodsWishRequest goodsWishRequest);

    /**
     * 수기주문접수 > 상품추가 팝업 > 베스트 100 목록 조회
     */
    List<GoodsListResponse> getBest100List(GoodsBest100Request goodsBest100Request);

    /**
     * 수기주문접수 > 상품추가 팝업 > 베스트 100 목록수 조회
     */
    int getBest100ListCount(GoodsBest100Request goodsBest100Request);


    /**
     * 배송지 목록 조회
     */
    List<MbrDlvpInfoResponse> getMemberDeliveryList(String mbrNo);

    /**
     * 배송지 목록 등록 insert
     */
    void insertMemberDeliveryList(List<EtMbrDlvpInfo> insertList);

    /**
     * 배송지 목록 등록 update
     */
    void updateMemberDeliveryList(List<EtMbrDlvpInfo> updateList);

    /**
     * 사은품 조회
     */
    List<OrderGiftResponse> getOrderGiftList(OrderGiftRequest orderGiftRequest);

    /**
     * 수기주문접수 > 혜택 가져오기
     */
    List<OrderBenefitResponse> getBenefitList(OrderBenefitRequest orderBenefitRequest);

    /**
     * 수기주문접수 > 배송비 가져오기
     */
    List<EtDeliPolcResponse> getDlvAmtList(List<String> deliPolcNoList);

    /**
     * 수기주문접수 > 배송비 > 배송지역별 도서산간 , 제주도 .. 가져오기
     */
    List<DlvRegnByZipCdResponse> getDeliRegnByZipCd(List<String> zipNoList);

    /**
     * 상담사 주문 > 배송비 쿠폰
     */
    List<DlvCouponResponse> getDlvCouponList(DlvCouponRequest dlvCouponRequest);

    /**
     * 상담사 주문 > 회원 자산 조회
     */
    List<MbrAstSumResponse> getMbrAstSumList(String mbrNo);

}
