package com.enbiz.bo.app.dto.response.payment;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * ==========================
 * 무이자 할부 안내 관리 Response Dto
 * ==========================
 */

@Alias("OpNintInstGdBaseResponse")
@Getter
@Setter
public class OpNintInstGdBaseResponse extends BaseCommonEntity {
    private String argInsertUpdate	; 	// 등록,수정구분 코드
    private String nintInstGdNo	    ; 	// 일련번호
    private String acqrCd	        ; 	// 매입사
    private String mersNo	        ; 	// 가맹점 번호
    private String nintInstNm	    ; 	// 무이자 할부명
    private String aplySite	        ; 	// 적용사이트
    private String aplyStrDtm	    ; 	// 적용시작일시
    private String aplyEndDtm	    ; 	// 적용종료일시
    private String tgtAmt	        ; 	// 기준금액
    private String nintMonth	    ; 	// 할부개월수
    private String state	        ; 	// 진행상태
    private String parentCd	        ; 	// 부모코드
    private String code	            ; 	// 코드
    private String codeName	        ; 	// 코드명
    private String onoffLineGbCd	; 	// 온/오프라인 구분
    private String mersList	        ; 	// 가맹점 번호 리스트
}
