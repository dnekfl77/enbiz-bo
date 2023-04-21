package com.enbiz.bo.app.dto.response.goods;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * 예약상품관리 Response DTO
 */
@Alias("ReservationGoodsMgmtResponse")
@Getter
@Setter
public class ReservationGoodsMgmtResponse extends BaseCommonEntity {
    private String goodsTypCd              ; // 상품유형코드
    private String goodsTypNm              ; // 상품유형코드명
    private String goodsNo                 ; // 상품번호
    private String goodsNm                 ; // 상품명
    private String modlNm                  ; // 모델명
    private String brandNm                 ; // 브랜드명
    private String saleStatCd              ; // 판매상태
    private String saleStatNm              ; // 판매상태명
    private String saleMethCd              ; // 판매방식
    private String saleMethNm              ; // 판매방식명
    private String entrNm                  ; // 협력사명
    private String md                      ; // 담당MD
    private String strCtg                  ; // 표준분류
    private String dispYn                  ; // 전시여부
    private String buyTypNm                ; // 매입형태
    private String taxGbNm                 ; // 과면세구분코드
    private Integer norPrc                 ; // 정상가
    private Float  mrgnRate                ; // 마진율
    private Integer salePrc                ; // 판매가
    private String goodsRegDtm             ; // 상품등록일시
    private String rsvStrtDtm              ; // 예약판매시작일시
    private String rsvEndDtm               ; // 예약판매종료일시
    private String fwdidcPrarDy            ; // 예약상품출고지시일자
    private String rsvEndAfProcMethCd      ; // 예약종료후 판매방식
    private String rsvEndAfProcMethNm      ; // 예약종료후 판매방식명
    private String rsvStopYn               ; // 예약중단여부
    private String rsvStopCausNm           ; // 예약중단사유코드
}
