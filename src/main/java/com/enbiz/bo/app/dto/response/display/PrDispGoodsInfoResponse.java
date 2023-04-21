package com.enbiz.bo.app.dto.response.display;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("PrDispGoodsInfoResponse")
@Getter
@Setter
public class PrDispGoodsInfoResponse extends BaseCommonEntity {

    private String dispCtgNo	; 	// 전시카테고리번호
    private String goodsNo		; 	// 상품번호
    private String dispSeq		; 	// 전시순서
    private String dispYn		; 	// 전시여부

    private String goodsNm		; 	// 상품명
    private String goodsTypCd   ; 	// 상품유형
    private String norPrc		; 	// 정상가
    private String salePrc		; 	// 판매가
    private String saleStatCd	; 	// 판매상태
    private String entrNm		; 	// 협력사명

}
