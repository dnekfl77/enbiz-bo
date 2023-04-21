package com.enbiz.bo.app.dto.request.display;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("PrTmplConrMappInfoRequest")
@Getter
@Setter
public class PrTmplConrMappInfoRequest extends BaseCommonEntity {

    private String dispCtgNo                ; // 전시카테고리번호
    private String tmplNo                   ; // 템플릿번호
    private String conrNo                   ; // 전시코너번호
    private String dispYn                   ; // 전시여부
    private String dispStrDtm               ; // 전시시작일시
    private String dispEndDtm               ; // 전시중료일시
    private Integer dispSeq                 ; // 전시순서
    private String dispTgt                  ; // 전시대상화면 리스트

    // 전시코너 상세 저장
    private String state                    ; // 상태
    private String tmplNm                   ; // 템플릿명
    private String tmplFilePath             ; // 템플릿 파일경로
    private String tmplTypCd                ; // 템플릿 유형
    private String useYn                    ; // 사용여부

}
