package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * 예약판매이력
 */
@Alias("PrRsvSaleHist")
@Getter
@Setter
public class PrRsvSaleHist extends BaseCommonEntity {
    private String goodsNo;            //상품번호
    private String rsvStrtDtm;         //예약시작일시
    private String rsvEndDtm;          //예약종료일시
    private String fwdidcPrarDy;       //출고지시예정일자
    private String rsvEndAfProcMethCd; //예약종료후판매방식( PR011 => 01 : 일반판매로 전환 , 02 : 품절로 변경)
    private String rsvStopYn;          //예약중단여부
    private String rsvStopCausCd;      //예약중단사유코드( PR034 => 10 : 입고취소 , 11 : 즉시일반판매전환 , 12 : 판매자 사정에 의한 예약판매취소 )
    private String rsvStopDtm;         //예약중단일시
}
