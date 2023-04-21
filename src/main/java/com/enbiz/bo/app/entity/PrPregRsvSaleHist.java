package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * 가등록 예약판매이력
 */
@Alias("PrPregRsvSaleHist")
@Getter
@Setter
public class PrPregRsvSaleHist extends BaseCommonEntity {
    private String pregGoodsNo;         //   가등록 상품번호
    private String rsvStrtDtm;          //   예약시작일시
    private String rsvEndDtm;           //   예약종료일시
    private String fwdidcPrarDy;        //   출고지시예정일자
    private String rsvEndAfProcMethCd;  //   예약종료후판매방식( PR011 => 01 : 일반판매로 전환 , 02 : 품절로 변경)
}
