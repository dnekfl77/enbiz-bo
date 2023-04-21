package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("ccAeFvrInfo")
@Getter
@Setter
public class CcAeFvrInfo extends BaseCommonEntity {
    private String aeNo          ; // 사은행사번호
    private String aeFvrSeq      ; // 사은행사혜택순번
    private Integer aplyMinAmt   ; // 적용최소금액
    private String goodsNo       ; // 상품번호
}
