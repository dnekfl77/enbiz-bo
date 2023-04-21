package com.enbiz.bo.app.service.delivery;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.request.delivery.FullOrderRequest;
import com.enbiz.bo.app.dto.response.delivery.FullOrderResponse;
import com.enbiz.bo.app.repository.order.OpOrdDtlMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 전체 주문 조회 서비스
 */

@Service
@Lazy
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
@Slf4j
@RequiredArgsConstructor
public class FullOrderInquiryService {

    private final OpOrdDtlMapper opOrdDtlMapper;

    /**
     * 전체주문조회 목록 조회
     * @param  fullOrderRequest
     * @return 배송 목록
     * @throws Exception
     */
    public List<FullOrderResponse> getFullOrderInquiryList(FullOrderRequest fullOrderRequest) throws Exception {
        return opOrdDtlMapper.getFullOrderInquiryList(fullOrderRequest);
    }

    /**
     * 전체주문조회 목록 수
     * @param  fullOrderRequest
     * @return 목록 수
     * @throws Exception
     */
    public int getFullOrderInquiryListCount(FullOrderRequest fullOrderRequest) throws Exception {
        return opOrdDtlMapper.getFullOrderInquiryListCount(fullOrderRequest);
    }

    /**
     * 엑셀다운로드_전체주문조회 목록 조회
     * @param  fullOrderRequest
     * @return 배송 목록
     * @throws Exception
     */
    public List<FullOrderResponse> getExcelFullOrderInquiryList(FullOrderRequest fullOrderRequest) throws Exception {
        return opOrdDtlMapper.getExcelFullOrderInquiryList(fullOrderRequest);
    }

}
