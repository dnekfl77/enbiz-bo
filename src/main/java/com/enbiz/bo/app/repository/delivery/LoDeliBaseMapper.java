package com.enbiz.bo.app.repository.delivery;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.delivery.DeliveryRequest;
import com.enbiz.bo.app.dto.response.delivery.DeliveryResponse;
import com.enbiz.bo.app.entity.LoDeliBase;

@Repository
@Lazy
public interface LoDeliBaseMapper {

//    /**
//     * 배송기본 추가
//     * @param loDeliBase
//     */
//    void insertLoDeliBase(LoDeliBase loDeliBase);
//
//    /**
//     * 배송진행상태변경이력 추가
//     * @param loDeliBase
//     */
//    void insertLoDeliPrgsStatChgHist(LoDeliBase loDeliBase);

    /**
     * 배송조회 목록 조회
     * @param deliveryRequest
     * @return
     */
    List<DeliveryResponse> getDeliveryInquiryList(DeliveryRequest deliveryRequest);

    /**
     * 배송조회 목록 수
     * @param deliveryRequest
     * @return int
     */
    int getDeliveryInquiryListCount(DeliveryRequest deliveryRequest);

    /**
     * 엑셀다운로드_배송조회 목록 조회
     * @param deliveryRequest
     * @return
     */
    List<DeliveryResponse> getExcelDeliveryInquiryList(DeliveryRequest deliveryRequest);

    /**
     * 배송상세내역 팝업
     * @param deliveryRequest
     * @return
     */
    DeliveryResponse getDeliveryDetail(DeliveryRequest deliveryRequest);

    /**
     * 배송상세내역_상품내역 목록 조회
     * @param deliveryRequest
     * @return
     */
    List<DeliveryResponse> getDeliveryGoodsList(DeliveryRequest deliveryRequest);

    /**
     * 배송상세내역_상품내역 목록 조회 수
     * @param deliveryRequest
     * @return int
     */
    int getDeliveryGoodsListCount(DeliveryRequest deliveryRequest);
}
