package com.enbiz.bo.app.repository.vendor;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.response.goods.DeliveryPolicyResponse;
import com.enbiz.bo.app.entity.EtDeliPolcBase;

/**
 * 배송정책기본 DAO
 */
@Repository
@Lazy
public interface EtDeliPolcBaseMapper {

    /**
     * 협력사별 배송정책목록 조회
     * @param entrNo
     * @return
     */
    List<EtDeliPolcBase> getEtDeliPolcBaseList(String entrNo);

    /**
     * 임시 일반상품 등록/상세, 일반상품 상세 > 배송비/반품비 정책 목록 조회
     * @param entrNo
     * @return
     */
    List<DeliveryPolicyResponse> getEntrDeliveryPolicyList(String entrNo);
}
