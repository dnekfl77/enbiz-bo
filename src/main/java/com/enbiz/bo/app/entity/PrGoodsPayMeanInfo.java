package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * 상품결제수단정보
 */
@Alias("PrGoodsPayMeanInfo")
@Getter
@Setter
public class PrGoodsPayMeanInfo extends BaseCommonEntity {

    private String goodsNo      ; // 상품번호
    private String payWayCd     ; // 결제수단코드
    private String useYn        ; // 사용여부

}
