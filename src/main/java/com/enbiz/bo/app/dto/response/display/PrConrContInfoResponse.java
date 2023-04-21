package com.enbiz.bo.app.dto.response.display;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("PrConrContInfoResponse")
@Getter
@Setter
public class PrConrContInfoResponse extends BaseCommonEntity {

    private String dispCtgNo                ; // 전시카테고리번호
    private String conrNo                   ; // 전시코너번호
    private String conrTgtNo                ; // 코너대상번호
    private String conrTgtCd                ; // 코너대상코드
    private String conrContNo               ; // 코너컨텐츠번호
    private String dispStrDtm               ; // 전시시작일시
    private String dispEndDtm               ; // 전시종료일시
    private Integer dispSeq                 ; // 전시순서
    private String dispYn                   ; // 전시여부
    private String contTitleNm              ; // 컨텐츠제목명
    private String linkUrlAddr              ; // 연결URL주소
    private String movFrmeCd                ; // 이동프레임코드
    private String contPathNm               ; // 컨텐츠경로명
    private String contFileNm               ; // 컨텐츠파일명
    private String contDesc                 ; // 컨텐츠설명
    private String altCont                  ; // ALT내용
    private String htmlFileCont             ; // HTML 파일내용

    // 코너대상코드가 상픔인 경우 사용
    private String goodsNo		; 	// 상품번호
    private String goodsNm		; 	// 상품명
    private String goodsTypCd   ; 	// 상품유형
    private String norPrc		; 	// 정상가
    private String salePrc		; 	// 판매가
    private String saleStatCd	; 	// 판매상태

    // 코너대상코드가 브랜드인 경우 사용
    private String brandNo		; 	// 상품번호
    private String brandNm		; 	// 상품명
    private String brandImg     ; 	// 상품유형

    // 코너대상코드가 상품리뷰인 경우 사용
    private String revCont		; 	// 리뷰내용
    private String revNo		; 	// 리뷰번호
    private String revScrVal    ; 	// 리뷰별점

    // 코너대상코드가 기획전인 경우 사용
    private String mkdpNm		; 	// 기획전명
    private String dispStat		; 	// 기획전상태
    private String mkdpTypCd    ; 	// 기획전 유형
    private String mdNm         ; 	// 담당 MD

    // 코너대상코드가 HTML인 경우 사용
    private String argInsertUpdate ; 	// 입력 수정 구분용

    // 코너대상코드가 이미지 배너 인 경우 사용
    private String imgBanner        ; 	// 이미지 배너 컬럼
}
