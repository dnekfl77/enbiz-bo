package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("opCmsnInfo")
@Getter
@Setter
public class OpCmsnInfo extends BaseCommonEntity {
    private String pgGbCd	        ; 	// PG사
    private String cmsnTgtLgrpCd	; 	// 결제수단유형
    private String cmsnTgtSgrpCd	; 	// 결제수단명
    private String cmsnTypCd	    ; 	// 수수료유형
    private String aplyStrDtm	    ; 	// 적용시작일시
    private String aplyEndDtm	    ; 	// 적용종료일시
    private String mersNo	        ; 	// 가맹점 번호
    private Integer instMonCnt	    ; 	// 할부개월수
    private String cmsnGbCd 	    ; 	// 수수료구분코드
    private Double cmsnRate 	    ; 	// 수수료율
    private Integer cmsnAmt  	    ; 	// 수수료금액
    private String vatInclYn	    ; 	// 부가세포함여부
    private String adjGbCd  	    ; 	// 정산구분코드
    private String rmkCont  	    ; 	// 비고내용
}
