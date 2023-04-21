package com.enbiz.bo.app.dto.response.display;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("PrTmplConrMappInfoResponse")
@Getter
@Setter
public class PrTmplConrMappInfoResponse extends BaseCommonEntity {

    private String tmplNo                   ; // 템플릿번호
    private String dispCtgNo                ; // 전시카테고리번호
    private String siteNo                   ; // 사이트번호
    private String conrNo                   ; // 전시코너번호
    private String conrNm                   ; // 전시코너명
    private String dispSeq                  ; // 전시순서
    private String conrTgtCd                ; // 코너대상코드
    private String dispYn                   ; // 전시여부
    private String useYn                    ; // 사용여부
    private String dispStrDtm               ; // 전시시작일시
    private String dispEndDtm               ; // 전시중료일시
    private String dispTgt                  ; // 전시대상화면 리스트

}
