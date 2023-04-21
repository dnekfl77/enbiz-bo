package com.enbiz.bo.app.dto.response.delivery;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;
import com.enbiz.common.base.masking.MaskString;
import com.enbiz.common.base.masking.MaskingType;

import lombok.Getter;
import lombok.Setter;

@Alias("IndividualSendInstructResponse")
@Getter
@Setter
public class IndividualSendInstructResponse extends BaseCommonEntity {

    private String ordNo            ; // 주문번호
    private String ordSeq           ; // 주문순번
    private String deliUnitNo       ; // 배송단위번호
    private String dlvpSeq          ; // 배송지순번
    private String siteNo           ; // 사이트 번호
    private String ordDtlGbCd       ; // 주문내역구분코드
    private String deliPolcNo       ; // 배송비정책코드
    private String dlexChrgSubCd    ; // 배송비부담주체코드
    private String entrNo           ; // 협력사 번호

    private String ordManNm         ; // 주문자명
    @MaskString(type = MaskingType.NAME_KR)
    private String ordManNmMask     ; // 주문자명(마스킹)
    @MaskString(type = MaskingType.NAME_KR)
    private String rcvmnNm          ; // 수취인명

    private String saleMethCd       ; // 판매방식
    private String sndIndiFcstDt    ; // 발송지시예정일자
    private String deliProcTypNm    ; // 배송처리유형 코드명
    private String deliProcTypCd    ; // 배송처리유형 코드
    private String deliWayNm        ; // 배송수단 코드명
    private String deliWayCd        ; // 배송수단 코드
    private String ordDtlStatCd     ; // 주문진행상태

    private String mbrNo            ; // 회원번호

    private String umemCellSctNo    ; // 비회원휴대폰구분번호
    @MaskString(type = MaskingType.PHONE_NUM)
    private String umemCellTxnoNo   ; // 비회원휴대폰국번번호
    private String umemCellEndNo    ; // 비회원휴대폰끝번호
    private String cellSctNo        ; // 회원휴대폰구분번호
    @MaskString(type = MaskingType.PHONE_NUM)
    private String cellTxnoNo       ; // 회원휴대폰국번번호
    private String cellEndNo        ; // 회원휴대폰끝번호

    private String umemTelRgnNo    ; // 비회원전화번호구분번호
    @MaskString(type = MaskingType.PHONE_NUM)
    private String umemTelTxnoNo   ; // 비회원전화번호국번번호
    private String umemTelEndNo    ; // 비회원전화번호끝번호
    private String telRgnNo        ; // 회원전화번호구분번호
    @MaskString(type = MaskingType.PHONE_NUM)
    private String telTxnoNo       ; // 회원전화번호국번번호
    private String telEndNo        ; // 회원전화번호끝번호

    private String ordSaleTypCd     ; // 주문판매유형코드
    private String goodsNo          ; // 주문판매유형코드

}
