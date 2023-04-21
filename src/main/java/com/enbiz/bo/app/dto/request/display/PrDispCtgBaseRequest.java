package com.enbiz.bo.app.dto.request.display;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("PrDispCtgBaseRequest")
@Getter
@Setter
public class PrDispCtgBaseRequest extends BaseCommonEntity {

    private String argSelectType;

    private String argUseYn;
    private String argDispYn;
    private String argSiteNo;
    private String argShopType;

    private String rootNode; // 카테고리 루트노드 상수를 담는 변수

    private String dispYn		; 	// 전시여부
    private String useYn		; 	// 사용여부
    private String dispCtgNo	; 	// 전시카테고리번호
    private String dispCtgNm	; 	// 전시카테고리명
    private String siteNo		; 	// 사이트번호
    private String siteNm		; 	// 사이트명
    private String shopTypCd	; 	// 매장유형코드
    private String lrgCtgNo		; 	// 대카테고리번호
    private String lrgCtgNm		; 	// 대카테고리명
    private String midCtgNo		; 	// 중카테고리번호
    private String midCtgNm		; 	// 중카테고리명
    private String smlCtgNo		; 	// 소카테고리번호
    private String smlCtgNm		; 	// 소카테고리명
    private String thnCtgNo		; 	// 세카테고리번호
    private String thnCtgNm		; 	// 세카테고리명
    private String leafYn		; 	// 최하위 여부
    private String hierarchy	; 	// Tree 계층을 위한 변수
    private String hierarchyNm	; 	// Tree 계층을 위한 변수(text)

    private String dpmlNo       ;   // 몰 정보(몰 번호)
    private Integer dispSeq      ;   // 전시순서
    private String dispStrDt    ;   // 전시시작일자
    private String dispEndDt    ;   // 전시중료일자
    private String hdrTypCd     ;   // 해더유형코드
    private String prtTypCd     ;   // 출력유형코드
    private String linkUrlAddr  ;   // 연결URL주소
    private String tmplNo       ;   // 템플릿번호
    private String tmplFilePath ;   // 템플릿 파일경로
    private String linkDispNo   ;   // 연결전시번호
    private String linkDispNm   ;   // 연결전시명
    private String movFrmeCd    ;   // 이동프레임코드

}
