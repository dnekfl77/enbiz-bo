package com.enbiz.bo.app.dto.response.display;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Alias("PrDpmlBaseResponse")
public class PrDpmlBaseResponse extends BaseCommonEntity {

    private String siteNo		; 	// 사이트번호
    private String siteNm		; 	// 사이트명
    private String dpmlNo		; 	// 전시몰번호
    private String dpmlNm	    ; 	// 전시몰명
    private String mallTypCd	; 	// 몰유형코드
    private String dispYn		; 	// 전시여부
    private String useYn		; 	// 사용여부
    private String prtTypCd		; 	// 출력유형코드
    private String hdrTypCd		; 	// 해더유형코드
    private String linkUrlAddr	; 	// 연결URL주소
    private String tmplNo		; 	// 템플릿번호
    private String tmplFilePath ; 	// 템플릿파일경로
    private String linkDispNo	; 	// 연결전시번호
    private String movFrmeCd	; 	// 이동프레임코드
    private String dispSeq	    ; 	// 전시순서
    private String shopTypCd	; 	// 매장유형코드
    private String dispCtgNm	; 	// 카테고리명

}
