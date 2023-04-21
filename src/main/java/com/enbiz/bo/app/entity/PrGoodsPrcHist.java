package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * 상품가격이력
 */
@Alias("prGoodsPrcHist")
@Getter
@Setter
public class PrGoodsPrcHist extends BaseCommonEntity {
    private String goodsNo                           ;  //상품번호
    private String histStrDtm                        ;  //이력시작일시
    private String histEndDtm                        ;  //이력종료일시
    private Integer supPcost                         ;  //공급원가
    private Integer norPrc                           ;  //정상가
    private Integer salePrc                          ;  //판매가
    private Float mrgnRate                           ;  //마진율
    private String prcChgCausCd                      ;  //가격변경사유코드(PR033)
}
