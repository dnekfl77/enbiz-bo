package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("prTmplConrMappInfo")
@Getter
@Setter
public class PrTmplConrMappInfo extends BaseCommonEntity {

    private String tmplNo                   ; // 템플릿번호
    private String conrNo                   ; // 전시코너번호
    private String dispYn                   ; // 전시여부
    private String dispStrDtm               ; // 전시시작일시
    private String dispEndDtm               ; // 전시중료일시
    private Integer dispSeq                 ; // 전시순서
    private String dispTgt                  ; // 전시대상화면 리스트

}