package com.enbiz.bo.app.dto.request.payment;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * ==========================
 * 청구할인 안내관리 Request Dto
 * ==========================
 */

@Alias("OpClmDcGdBaseRequest")
@Setter
@Getter
public class OpClmDcGdBaseRequest extends BaseCommonEntity {
    private String argInsertUpdate	; 	// 등록,수정구분 코드
    private String clmDcGdNo	    ; 	// 일련번호
    private String acqrCd	        ; 	// 매입사
    private String startDate	    ; 	// 적용시작일자 검색(시작)
    private String endDate	        ; 	// 적용시작일자 검색(종료)
    private String aplyStrTotal	    ; 	// 적용시작일자 전체조회 여부
    private String state	        ; 	// 진행상태
    private String mersNo	        ; 	// 가맹점 번호
    private String aplyStrDtm	    ; 	// 적용시작일자
    private String aplyEndDtm	    ; 	// 적용종료일자
    private String[] mersList	    ; 	// 가맹점 리스트
}
