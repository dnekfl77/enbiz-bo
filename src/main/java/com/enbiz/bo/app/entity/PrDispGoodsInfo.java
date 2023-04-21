package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("prDispGoodsInfo")
@Getter
@Setter
public class PrDispGoodsInfo extends BaseCommonEntity {

    private String dispCtgNo	; 	// 전시카테고리번호
    private String goodsNo		; 	// 상품번호
    private Integer dispSeq		; 	// 전시순서
    private String dispYn		; 	// 전시여부

}
