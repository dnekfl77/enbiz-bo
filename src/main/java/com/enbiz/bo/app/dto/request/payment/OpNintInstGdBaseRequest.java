package com.enbiz.bo.app.dto.request.payment;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * ==========================
 * 무이자 할부 안내 관리 Request Dto
 * ==========================
 */

@Alias("OpNintInstGdBaseRequest")
@Setter
@Getter
public class OpNintInstGdBaseRequest extends BaseCommonEntity {
    private String argInsertUpdate	; 	// 등록,수정구분 코드
    private String nintInstGdNo	    ; 	// 일련번호
    private String nintInstNm	    ; 	// 무이자 할부명
    private String mersNo	        ; 	// 가맹점 번호
    private String acqrCd	        ; 	// 매입사
    private String state	        ; 	// 진행상태
    private String startDate	    ; 	// 적용시작일자 검색(시작)
    private String endDate	        ; 	// 적용시작일자 검색(종료)
    private String aplyStrTotal	    ; 	// 적용시작일자 전체조회 여부
    private String aplyStrDtm	    ; 	// 적용시작일자
    private String aplyEndDtm	    ; 	// 적용종료일자
    private String[] mersList	    ; 	// 가맹점 리스트
    private String[] tgtAmt	        ; 	// 금액별 할부개월 _ 기준금액
    private String[] monthList      ; 	// 금액별 할부개월수
}
