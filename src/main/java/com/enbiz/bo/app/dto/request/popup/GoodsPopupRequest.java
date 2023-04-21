package com.enbiz.bo.app.dto.request.popup;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * ==========================
 * 상품 조회 팝업 Request Dto
 * ==========================
 */
@Alias("GoodsPopupRequest")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GoodsPopupRequest extends BaseCommonEntity {

    //===============[View Argument]===============//
    @NotNull
    @NotEmpty
    private String argSelectType    ;   // 선택구분 ( 1 : 단일 , N : 다중 )
    private String argSaleState     ;   // 판매상태
    private String argGoodsType     ;   // 상품유형

    //===============[Query Argument]===============//
    private String goodsRegStartDtm ;   // 상품등록 시작일자
    private String goodsRegEndDtm   ;   // 상품등록 종료일자
    private String mdId             ;   // 담당 MD 아이디
    private String entrNo           ;   // 협력사번호
    private String brandNo          ;   // 브랜드번호
    private String stdCtgNo         ;   // 표준분류카테고리번호
    private String saleStatCd       ;   // 판매상태코드 ( 10 : 판매중, 20 : 품절, 30 : 일시중단, 40 : 판매종료 )
    private String saleStatCdList   ;   // 판매상태코드 값 셋팅
    private String goodsCompCd      ;   // 상품구성코드 ( 10 : 일반상품, 20 : 묶음상품 )
    private String goodsTypCd       ;   // 상품유형코드 ( 10 : 일반상품, 20 : 사은품, 30 : e-쿠폰상품 )
    private String saleMethCd       ;   // 판매방식코드 ( 10 : 일반판매, 20 : 예약상품 )
    private String buyTypCd         ;   // 매입형태코드 ( 10 : 직매입, 20 : 위탁매입 )
    private String deliProcTypCd    ;   // 배송처리유형코드 ( 10 : 센터배송, 20 : 업체배송 )
    private String goodsNm          ;   // 상품명
    private String goodsNo          ;   // 상품번호

}
