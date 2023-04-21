package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * 상품항목정보
 */
@Alias("PrGoodsItemInfo")
@Getter
@Setter
public class PrGoodsItemInfo extends BaseCommonEntity{

    private String goodsNo                 ; // 상품번호
    private String goodsNotiLisartCd       ; // 상품고시항목코드
    private String goodsNotiItemCd         ; // 상품고시품목코드
    private String notiItemCmt             ; // 고시항목내용

}
