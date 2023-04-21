package com.enbiz.bo.app.dto.response.delivery;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;
import com.enbiz.common.base.masking.MaskString;
import com.enbiz.common.base.masking.MaskingType;

import lombok.Getter;
import lombok.Setter;

@Alias("FullOrderResponse")
@Getter
@Setter
public class FullOrderResponse extends BaseCommonEntity {

    private String ordNo            ; // 주문번호
    private String ordFnshDtm       ; // 주문일자
    private String sndIndiFcstDt    ; // 발송지시예정일자
    private String ordMediaCd       ; // 주문매체
    private String saleMethCd       ; // 판매방식
    private String deliProcTypCd    ; // 배송처리유형
    private String deliWayCd        ; // 배송수단
    private String ordDtlStatCd     ; // 주문진행상태
    private String sndWaitCausCd    ; // 지연사유
    private String entrNm           ; // 협력사명
    private String goodsNo          ; // 상품코드
    private String goodsNm          ; // 상품명
    private String itmNo            ; // 단품코드
    private String itmNm            ; // 단품명
    private String ordQty           ; // 주문수량
    private String salePrc          ; // 판매가
    private String aplyAdtnAmt      ; // 할인금액
    private String ordPrc           ; // 주문금액
    private String deliMsg          ; // 배송메시지
    private String shopTrafMsg      ; // 매장전달메시지

    @MaskString(type = MaskingType.NAME_KR)
    private String ordManNm         ; // 주문자명
    @MaskString(type = MaskingType.NAME_KR)
    private String rcvmnNm          ; // 수취인명

    private String mbrNo            ; // 회원번호
    private String umemCellSctNo    ; // 비회원휴대폰구분번호
    @MaskString(type = MaskingType.PHONE_NUM)
    private String umemCellTxnoNo   ; // 비회원휴대폰국번번호
    private String umemCellEndNo    ; // 비회원휴대폰끝번호
    private String cellSctNo        ; // 회원휴대폰구분번호
    @MaskString(type = MaskingType.PHONE_NUM)
    private String cellTxnoNo       ; // 회원휴대폰국번번호
    private String cellEndNo        ; // 회원휴대폰끝번호
    private String rcvmnCellSctNo   ; // 수취인휴대폰구분번호
    @MaskString(type = MaskingType.PHONE_NUM)
    private String rcvmnCellTxnoNo  ; // 수취인휴대폰국번번호
    private String rcvmnCellEndNo   ; // 수취인휴대폰끝번호

    private String zipAddr          ; // 주소
    @MaskString(type = MaskingType.ADDRESS_DTL)
    private String dtlAddr          ; // 상세주소
    private String addr             ; // 주소

}
