package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * 단품기본
 */
@Alias("PrItmBase")
@Getter
@Setter
public class PrItmBase extends BaseCommonEntity {
    private String goodsNo;         //상품번호
    private String itmNo;           //단품번호
    private Integer stkQty;         //재고수량
    private String lgcItmNo;        //기간계단품번호
    private String itmSaleStatCd;   //단품판매상태코드(PR005)
    private Integer dispSeq;        //전시순서
    private String soutCausCd;      //품절사유코드(PR032)
    private String soutNotiYn;      //품절알림여부
    private Integer soutNotiStdQty; //품절알림기준수량
    private String optnCatNm1;      //옵션분류명1
    private String optnNm1;         //옵션명1
    private String optnCatNm2;      //옵션분류명2
    private String optnNm2;         //옵션명2
    private String optnCatNm3;      //옵션분류명3
    private String optnNm3;         //옵션명3
    private String optnCatNm4;      //옵션분류명4
    private String optnNm4;         //옵션명4
    private String optnCatNm5;      //옵션분류명5
    private String optnNm5;         //옵션명5
    private String optnCatNo1;      //옵션분류번호1
    private String optnNo1;         //옵션번호1
    private String optnCatNo2;      //옵션분류번호2
    private String optnNo2;         //옵션번호2
    private String optnCatNo3;      //옵션분류번호3
    private String optnNo3;         //옵션번호3
    private String optnCatNo4;      //옵션분류번호4
    private String optnNo4;         //옵션번호4
    private String optnCatNo5;      //옵션분류번호5
    private String optnNo5;         //옵션번호5
}
