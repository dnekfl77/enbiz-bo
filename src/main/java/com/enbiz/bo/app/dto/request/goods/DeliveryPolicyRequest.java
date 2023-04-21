package com.enbiz.bo.app.dto.request.goods;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * 임시 일반상품 배송정책 Request
 */
@Getter
@Setter
@Alias("DeliveryPolicyRequest")
public class DeliveryPolicyRequest extends BaseCommonEntity {

    private	String	entrNo; //  협력사번호

    public DeliveryPolicyRequest (String entrNo ) {
        this.entrNo = entrNo;
    }
}
