package com.enbiz.bo.app.dto.response.payment;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * ==========================
 * 결제수수료관리 Response Dto
 * ==========================
 */

@Alias("OpCmsnInfoResponse")
@Getter
@Setter
public class OpCmsnInfoResponse extends BaseCommonEntity {
    private String argInsertUpdate	; 	// 등록,수정구분 코드
    private String pgGb	            ; 	// PG사 _ 코드
    private String cmsnTgtLgrp	    ; 	// 결제수단유형 _ 코드
    private String cmsnTgtSgrp	    ; 	// 결제수단명 _ 코드
    private String cmsnGb    	    ; 	// 수수료구분 _ 코드
    private String cmsnTyp  	    ; 	// 수수료유형 _ 코드

    private String pgGbCd	        ; 	// PG사
    private String cmsnTgtLgrpCd	; 	// 결제수단유형
    private String cmsnTgtSgrpCd	; 	// 결제수단명
    private String cmsnTypCd	    ; 	// 수수료유형
    private String aplyStrDt	    ; 	// 적용시작일시
    private String aplyEndDt	    ; 	// 적용종료일시
    private String aplyStrDtm	    ; 	// 적용시작일시
    private String aplyEndDtm	    ; 	// 적용종료일시
    private String mersNo	        ; 	// 가맹점 번호
    private String instMonCnt	    ; 	// 할부개월수
    private String cmsnGbCd 	    ; 	// 수수료구분코드
    private String cmsnRate 	    ; 	// 수수료율
    private String cmsnAmt  	    ; 	// 수수료금액
    private String vatInclYn	    ; 	// 부가세포함여부
    private String adjGbCd  	    ; 	// 정산구분코드
    private String rmkCont  	    ; 	// 비고내용
    private String cd  	            ; 	// 코드
    private String cdNm  	        ; 	// 코드명
}
