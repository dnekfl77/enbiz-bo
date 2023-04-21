package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("PrConrContInfo")
@Getter
@Setter
public class PrConrContInfo extends BaseCommonEntity{

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

}