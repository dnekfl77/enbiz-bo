package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * 고객상담주문상품정보
 */
@Alias("CsCcnOrdGoodsInfo")
@Getter
@Setter
public class CsCcnOrdGoodsInfo extends BaseCommonEntity{
    private String ccnNo;
    private String custCnslSeq;
    private String ordNo;
    private String goodsNo;
}
