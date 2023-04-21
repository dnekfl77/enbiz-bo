package com.enbiz.bo.app.dto.response.delivery;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;
import com.enbiz.common.base.masking.MaskString;
import com.enbiz.common.base.masking.MaskingType;

import lombok.Getter;
import lombok.Setter;

@Alias("DeliveryResponse")
@Getter
@Setter
public class DeliveryResponse extends BaseCommonEntity {

    private String ordNo            ; // 주문번호
    private String deliNo           ; // 배송번호
    private String deliTypCd        ; // 배송유형
    private String deliProcTypCd    ; // 배송처리유형
    private String deliWayCd        ; // 배송수단
    private String deliPrgsStatCd   ; // 배숭진행상태
    private String hdcCd            ; // 택배사
    private String invNo            ; // 운송장번호
    private String bpckPsbYn        ; // 합포장여부
    private String ordererNm        ; // 주문자
    private String rcvmnNm          ; // 수취인

    private String rcvmnTelRgnNo   ; // 수취인전화번호구분번호
    @MaskString(type = MaskingType.PHONE_NUM)
    private String rcvmnTelTxnoNo  ; // 수취인전화번호국번번호
    private String rcvmnTelEndNo   ; // 수취인전화번호끝번호

    private String rcvmnCellSctNo   ; // 수취인휴대폰구분번호
    @MaskString(type = MaskingType.PHONE_NUM)
    private String rcvmnCellTxnoNo  ; // 수취인휴대폰국번번호
    private String rcvmnCellEndNo   ; // 수취인휴대폰끝번호

    private String zipAddr          ; // 주소
    @MaskString(type = MaskingType.ADDRESS_DTL)
    private String dtlAddr          ; // 상세주소

    private String ordFnshDtm       ; // 주문완료일자
    private String indiDtm          ; // 발송지시일자
    private String procDtm          ; // 발송완료일자
    private String fnshDtm          ; // 배송완료일자
    private String sndWaitCausCd    ; // 지연사유코드
    private String sndWaitCausCdNm  ; // 지연사유명
    private String sndWaitCausSms   ; // 지연안내
    private String goodsNo          ; // 상품코드
    private String goodsNm          ; // 상품명
    private String itmNo            ; // 단품코드
    private String itmNm            ; // 단품명
    private String indiQty          ; // 지시수량
    private String salePrc          ; // 판매가
    private String entrNo           ; // 협력사
    private String deliGoodsGbCd    ; // 배송상품구분

    // 배송상세내역 팝업 추가
    private String siteNm           ; // 사이트명
    private String deliMsg          ; // 배송메시지
    private String rcvmnTel         ; // 수취인전화번호
    private String rcvmnCell        ; // 수취인휴대폰
    private String addr             ; // 주소
    private String supPcost         ; // 공급원가
    private String dlexChrgSubCd    ; // 배송비부담주체코드

}
