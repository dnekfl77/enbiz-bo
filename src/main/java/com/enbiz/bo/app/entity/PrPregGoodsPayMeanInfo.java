package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * 가등록 상품결제수단정보
 */
@Alias("PrPregGoodsPayMeanInfo")
@Getter
@Setter
public class PrPregGoodsPayMeanInfo extends BaseCommonEntity {

    private String pregGoodsNo   ;  //  가등록상품번호
    private String payWayCd      ;  //  결제수단코드(OM013)
    private String useYn         ;  //  사용여부

}
