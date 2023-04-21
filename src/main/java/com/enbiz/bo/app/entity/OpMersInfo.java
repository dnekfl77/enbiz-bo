package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("opMersInfo")
@Getter
@Setter
public class OpMersInfo extends BaseCommonEntity {

    private String mersNo	        ; 	// 가맹점 번호
    private String acqrCd	        ; 	// 매입사
    private String onoffLineGbCd	; 	// 온오프라인구분코드
    private String pgGbCd	        ; 	// PG구분코드
    private String pointUseYn       ;   // 포인트 사용여부
    private String nintUseYn	    ; 	// 무이자 사용여부
    private String termlId          ;   // 포인트 터미널ID
    private String useYn            ;   // 사용여부
    private String aplySiteGbCd	    ; 	// 작용대상

}
