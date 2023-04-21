package com.enbiz.bo.app.dto.response.marketing;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("AppreciateResponse")
@Getter
@Setter
public class AppreciateResponse extends BaseCommonEntity {
    private String aeNo         ; // 사은행사번호
    private String aeNm         ; // 사은행사명
    private String addEvtTypCd  ; // 사은행사유형코드
    private String addEvtTypNm  ; // 사은행사유형
    private String aePrgsStatCd ; // 사은행사상태코드
    private String aePrgsStatNm ; // 사은행사상태
    private String aeStrDtm     ; // 사은행사시작일시
    private String aeEndDtm     ; // 사은행사종료일시
}
