package com.enbiz.bo.app.dto.request.payment;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * ==========================
 * 가맹점관리 Request Dto
 * ==========================
 */

@Alias("OpMersInfoRequest")
@Setter
@Getter
public class OpMersInfoRequest extends BaseCommonEntity {
    private String argInsertUpdate	; 	// 등록,수정구분 코드
    private String mersNo	        ; 	// 가맹점 번호
    private String acqrCd	        ; 	// 매입사
    private String onoffLineGbCd	; 	// 온오프라인구분코드
    private String pgGbCd	        ; 	// PG구분코드
    private String pointUseYn       ;   // 포인트 사용여부
    private String nintUseYn	    ; 	// 무이자 사용여부
    private String termlId          ;   // 포인트 터미널ID
    private String useYn            ;   // 사용여부
    private String aplySiteGbCd	    ; 	// 작용대상
    private String siteList         ;   // 적용사이트 리스트
}
