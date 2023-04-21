package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * 연관상품정보
 */
@Alias("PrAssocGoodsInfo")
@Getter
@Setter
public class PrAssocGoodsInfo extends BaseCommonEntity{

    private String goodsNo        ; // 상품번호
    private String asctGoodsNo    ; // 연관상품번호
    private String asctGbCd       ; // 연관구분코드
    private Integer sortSeq       ; // 정렬순서
}
