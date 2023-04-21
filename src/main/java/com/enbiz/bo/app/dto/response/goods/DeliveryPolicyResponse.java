package com.enbiz.bo.app.dto.response.goods;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * 일반상품 배송정책 Response
 */
@Getter
@Setter
@Alias("DeliveryPolicyResponse")
public class DeliveryPolicyResponse extends BaseCommonEntity {

    private	String deliPolcNo;  //  배송정책번호
    private String dispDlexAmt; //  배송비&반품비 정책

}
