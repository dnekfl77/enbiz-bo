package com.enbiz.bo.app.dto.request.payment;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * ==========================
 *  결제수수료관리 Request Dto
 * ==========================
 */

@Alias("OpCmsnInfoRequest")
@Setter
@Getter
public class OpCmsnInfoRequest extends BaseCommonEntity {
    private String argInsertUpdate	; 	// 등록,수정구분 코드
    private String pgGbCd	        ; 	// PG사
    private String cmsnTgtLgrpCd	; 	// 결제수단유형
    private String cmsnTgtSgrpCd	; 	// 결제수단명
    private String cmsnTypCd	    ; 	// 수수료유형
    private String mersNo	        ; 	// 가맹점 번호
    private String cmsnGbCd 	    ; 	// 수수료구분코드
    private String aplyStrDtm	    ; 	// 적용시작일시
    private String aplyEndDtm	    ; 	// 적용종료일시

    private String aplyStrDt	    ; 	// 적용시작일시
    private String aplyEndDt	    ; 	// 적용종료일시
    private Integer instMonCnt	    ; 	// 할부개월수
    private Double cmsnRate 	    ; 	// 수수료율
    private Double cmsnRateBase 	; 	// 수수료율
    private Integer cmsnAmt  	    ; 	// 수수료금액
    private String vatInclYn	    ; 	// 부가세포함여부
    private String adjGbCd  	    ; 	// 정산구분코드
    private String rmkCont  	    ; 	// 비고내용
    private String[] mersList1      ; 	// 가맹점 리스트 (가맹점, 포인트)
    private String[] mersList2      ; 	// 가맹점 리스트 (무이자)
    private String monthList	    ; 	// 할부개월수 리스트
}
