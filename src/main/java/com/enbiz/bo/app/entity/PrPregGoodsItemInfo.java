package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * 가등록 상품 항목 정보
 */
@Alias("PrPregGoodsItemInfo")
@Getter
@Setter
public class PrPregGoodsItemInfo extends BaseCommonEntity {

    private String pregGoodsNo         ;    //  가등록상품번호
    private String goodsNotiLisartCd   ;    //  상품고시품목코드
    private String goodsNotiItemCd     ;    //  상품고시항목코드
    private String notiItemCmt         ;    //  고시항목내용

}
