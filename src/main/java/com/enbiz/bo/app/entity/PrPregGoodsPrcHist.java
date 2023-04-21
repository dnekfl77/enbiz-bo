package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.annotation.EmptyToNull;
import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * 가등록 상품가격이력
 */
@Alias("PrPregGoodsPrcHist")
@Getter
@Setter
public class PrPregGoodsPrcHist extends BaseCommonEntity {

    private String  pregGoodsNo  ;      //  가등록상품번호
    private String  histStrDtm   ;      //  이력시작일시
    private String  histEndDtm   ;      //  이력종료일시
    private Integer supPcost     ;      //  공급원가
    private Integer norPrc       ;      //  정상가
    private Integer salePrc      ;      //  판매가
    private Float   mrgnRate     ;      //  마진율

    @EmptyToNull
    private String  prcChgCausCd ;      //  가격변경사유코드(PR033)

}
