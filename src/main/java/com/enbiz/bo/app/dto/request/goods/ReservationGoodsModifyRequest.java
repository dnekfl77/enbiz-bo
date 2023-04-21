package com.enbiz.bo.app.dto.request.goods;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * 예약상품 일괄등록/해제 Request
 */
@Alias("ReservationGoodsModifyRequest")
@Getter
@Setter
public class ReservationGoodsModifyRequest extends BaseCommonEntity {
    private String[] goodsNoList            ; // 상품번호목록
    private String saleMethCd               ; // 판매방식
    private String rsvStrtDtm               ; // 에약시작일자
    private String rsvEndDtm                ; // 예약종료일자
    private String fwdidcPrarDy             ; // 출고지시예정일자
    private String rsvEndAfProcMethCd       ; // 에약종료후판매방식
    private String rsvStopCausCd            ; // 예약중단사유코드
}
