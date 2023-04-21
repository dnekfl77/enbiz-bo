package com.enbiz.bo.app.service.delivery;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.request.delivery.DeliveryRequest;
import com.enbiz.bo.app.dto.response.delivery.DeliveryResponse;
import com.enbiz.bo.app.repository.delivery.LoDeliBaseMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 배송조회 서비스
 */

@Service
@Lazy
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
@Slf4j
@RequiredArgsConstructor
public class DeliveryInquiryService {

    private final LoDeliBaseMapper loDeliBaseMapper;

    /**
     * 배송조회 목록 조회
     * @param  deliveryRequest
     * @return 배송 목록
     * @throws Exception
     */
    public List<DeliveryResponse> getDeliveryInquiryList(DeliveryRequest deliveryRequest) throws Exception {
        return loDeliBaseMapper.getDeliveryInquiryList(deliveryRequest);
    }

    /**
     * 배송조회 목록 수
     * @param  deliveryRequest
     * @return 목록 수
     * @throws Exception
     */
    public int getDeliveryInquiryListCount(DeliveryRequest deliveryRequest) throws Exception {
        return loDeliBaseMapper.getDeliveryInquiryListCount(deliveryRequest);
    }

    /**
     * 엑셀다운로드_배송조회 목록 조회
     * @param  deliveryRequest
     * @return 배송 목록
     * @throws Exception
     */
    public List<DeliveryResponse> getExcelDeliveryInquiryList(DeliveryRequest deliveryRequest) throws Exception {
        return loDeliBaseMapper.getExcelDeliveryInquiryList(deliveryRequest);
    }

    /**
     * 배송조회 배송상세내역 팝업 호출
     * @param  deliveryRequest
     * @return 배송상세내역 팝업
     * @throws Exception
     */
    public DeliveryResponse getDeliveryDetail(DeliveryRequest deliveryRequest) throws Exception {
        return loDeliBaseMapper.getDeliveryDetail(deliveryRequest);
    }

    /**
     * 배송조회 배송상세내역_상품내역 목록 조회
     * @param  deliveryRequest
     * @return 상품내역 목록
     * @throws Exception
     */
    public List<DeliveryResponse> getDeliveryGoodsList(DeliveryRequest deliveryRequest) throws Exception {
        return loDeliBaseMapper.getDeliveryGoodsList(deliveryRequest);
    }

    /**
     * 배송조회 배송상세내역_상품내역 목록 조회 수
     * @param  deliveryRequest
     * @return 상품내역 목록 수
     * @throws Exception
     */
    public int getDeliveryGoodsListCount(DeliveryRequest deliveryRequest) throws Exception {
        return loDeliBaseMapper.getDeliveryGoodsListCount(deliveryRequest);
    }

}
