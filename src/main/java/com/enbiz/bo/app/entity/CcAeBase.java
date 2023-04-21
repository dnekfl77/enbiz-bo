package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("ccAeBase")
@Getter
@Setter
public class CcAeBase extends BaseCommonEntity {
    private String aeNo             ; // 사은행사번호
    private String aeNm            ; // 사은행사명
    private String addEvtTypCd   ; // 사은행사유형코드 ( MK012 )
    private String aeStrDtm       ; // 사은행사시작일시
    private String aeEndDtm       ; // 사은행사종료일시
    private String payStrDt       ; // 지급시작일자
    private String payEndDt       ; // 지급종료일자
    private String aplyStrTm      ; // 적용시작시간
    private String aplyEndTm      ; // 적용종료시간
    private String aePrgsStatCd  ; // 사은행사진행상태코드 (MK003)
    private String mbrTypCd       ; // 회원유형코드 (MK016)
    private String aeDesc          ; // 사은행사설명
    private String tmEvtYn        ; // 타임행사여부
}
