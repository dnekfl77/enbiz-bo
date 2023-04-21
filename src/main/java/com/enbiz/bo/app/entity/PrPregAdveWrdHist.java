package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * 가등록 상품홍보문구이력
 */
@Alias("PrPregAdveWrdHist")
@Getter
@Setter
public class PrPregAdveWrdHist extends BaseCommonEntity {

    private String pregGoodsNo     ;    //  가등록상품번호
    private String aplyStrDt       ;    //  적용시작일자
    private String aplyEndDt       ;    //  적용종료일자
    private String adveWrd         ;    //  홍보문구
    private String useYn           ;    //  사용여부
}
