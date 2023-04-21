package com.enbiz.bo.app.dto.request.delivery;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * ==========================
 * 전체주문조회 Request Dto
 * ==========================
 */

@Alias("FullOrderRequest")
@Setter
@Getter
public class FullOrderRequest extends BaseCommonEntity {

    private String searchDateType	; 	// 기간 구분
    private String startDate	    ; 	// 시작기간
    private String endDate		    ; 	// 종료기간
    private String ordMediaCd	    ; 	// 주문매체
    private String saleMethCd	    ; 	// 판매방식
    private String ordNo    	    ; 	// 주문번호
    private String ordDtlStatCd     ; 	// 주문진행상태
    private String deliProcTypCd    ; 	// 배송처리유형
    private String searchOrdManType ; 	// 주문자정보 구분
    private String ordManNm         ; 	// 주문자정보
    private String searchOrdManTelType ; 	// 연락처정보 구분
    private String ordManTel        ; 	// 연락처정보
    private String deliWayCd        ; 	// 배송수단
    private String goodsNo		    ; 	// 상품번호
    private String entrNo		    ; 	// 협력사번호
    private String umem		        ; 	// 비회원 회원번호
    private String excelHeader      ; 	// 엑셀 헤더 리스트

}
