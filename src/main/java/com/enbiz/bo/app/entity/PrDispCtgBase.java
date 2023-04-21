package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("prDispCtgBase")
@Getter
@Setter
public class PrDispCtgBase extends BaseCommonEntity {

    private String dispCtgNo	; 	// 전시카테고리번호
    private String dispCtgNm	; 	// 전시카테고리명
    private String siteNo		; 	// 사이트번호
    private String siteNm		; 	// 사이트명
    private String dpmlNo		; 	// 전시몰번호
    private String shopTypCd	; 	// 매장유형코드
    private Integer dispSeq	    ; 	// 전시순서
    private String dispYn		; 	// 전시여부
    private String useYn		; 	// 사용여부
    private String dispStrDt	; 	// 전시시작일자
    private String dispEndDt	; 	// 전시종료일자
    private String shopDescCont	; 	// 매장설명내용
    private String uprDispCtgNo	; 	// 상위전시카테고리번호
    private String lrgCtgNo		; 	// 대카테고리번호
    private String lrgCtgNm		; 	// 대카테고리명
    private String midCtgNo		; 	// 중카테고리번호
    private String midCtgNm		; 	// 중카테고리명
    private String smlCtgNo		; 	// 소카테고리번호
    private String smlCtgNm		; 	// 소카테고리명
    private String thnCtgNo		; 	// 세카테고리번호
    private String thnCtgNm		; 	// 세카테고리명
    private String leafYn		; 	// 최하위 여부
    private String prtTypCd		; 	// 출력유형코드
    private String tmplNo		; 	// 템플릿번호
    private String linkUrlAddr	; 	// 연결URL주소
    private String movFrmeCd	; 	// 이동프레임코드
    private String linkDispNo	; 	// 연결전시번호

}
