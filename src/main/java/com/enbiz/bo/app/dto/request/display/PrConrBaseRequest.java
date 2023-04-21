package com.enbiz.bo.app.dto.request.display;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("PrConrBaseRequest")
@Getter
@Setter
public class PrConrBaseRequest extends BaseCommonEntity {

    private String reSearchPage ;   // 부모창 그리드 조회 구분값
    private String conrTgtCd	; 	// 전시대상
    private String tmplTypCd	; 	// 탬플릿 유형
    private String useYn		; 	// 사용여부
    private String aempId		; 	// 전시담당자 ID
    private String aempNm		; 	// 전시담당자명
    private String conrNo		; 	// 전시코너번호
    private String conrNm		; 	// 전시코너명
    private String tmplNo		; 	// 템플릿번호
    private String tmplNm		; 	// 템플릿명

    // 전시코너 상세 저장
    private String conrImgFileNm	        ; // 전시코너이미지 파일명
    private String conrImgPathNm	        ; // 전시코너이미지 파일 경로
    private String targetRemoveList         ; // 삭제 코너대상 데이터
    private String conrDesc		            ; 	// 코너설명
    private String setUseYn		            ; 	// 세트여부
    private String setCnt		            ; 	// 세트갯수

}
