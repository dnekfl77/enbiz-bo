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

@Alias("IndividualSendInstructRequest")
@Setter
@Getter
public class IndividualSendInstructRequest extends BaseCommonEntity {

    private String startDate	    ; 	// 시작기간
    private String endDate		    ; 	// 종료기간
    private String saleMethCd	    ; 	// 판매방식
    private String deliProcTypCd    ; 	// 배송처리유형
    private String ordNo    	    ; 	// 주문번호
    private String ordSeq           ;   // 주문순번
    private String searchOrdManType ; 	// 주문자정보 구분
    private String ordManNm         ; 	// 주문자정보
    private Integer dlvpSeq          ; 	// 배송지순번
    private String siteNo           ;   // 사이트 번호
    private String deliWayCd        ;   // 배송수단 코드
    private String ordDtlGbCd       ;   // 주문내역구분코드
    private String deliPolcNo       ;   // 배송비정책코드
    private String dlexChrgSubCd    ;   // 배송비부담주체코드
    private String entrNo           ;   // 협력사 번호
    private String mbrNo            ;   // 회원번호
    private String deliUnitNo       ;   // 배송단위번호

}
