package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * 가등록 증정품 이력
 */
@Alias("PrPregPrestHist")
@Getter
@Setter
public class PrPregPrestHist extends BaseCommonEntity {

    private String pregGoodsNo         ;    // 가등록상품번호
    private String aplyStrDt           ;    // 적용시작일자
    private String aplyEndDt           ;    // 적용종료일자
    private String prestNm             ;    // 증정품명
    private String useYn               ;    // 사용여부

}
