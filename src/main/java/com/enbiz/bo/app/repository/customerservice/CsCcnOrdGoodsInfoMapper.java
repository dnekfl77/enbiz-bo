package com.enbiz.bo.app.repository.customerservice;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.response.customerservice.CsRelatedResponse;

/**
 * 고객상담주문상품정보
 */
@Repository
@Lazy
public interface CsCcnOrdGoodsInfoMapper {

    /**
     * 최신 고객상담주문상품정보 1개 가져오기
     */
    CsRelatedResponse getCsOrdGoodsData(String ccnNo) throws Exception;

}
