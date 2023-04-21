package com.enbiz.bo.app.dto.response.display;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("PrConrBaseResponse")
@Getter
@Setter
public class PrConrBaseResponse extends BaseCommonEntity {

    private String reSearchPage             ; // 부모창 그리드 조회 구분값
    private String conrNo		            ; // 전시코너번호
    private String conrNm		            ; // 전시코너명
    private String tmplNm                   ; // 연결전시 템플릿
    private String conrTgtNm                ; // 전시대상
    private String dispTgt                  ; // 전시대상
    private String setUseYn	                ; // 세트사용여부
    private String useYn	                ; // 사용여부
    private String userNm	                ; // 전시담당자
    private String userId	                ; // 전시담당자 ID
    private String conrDesc	                ; // 전시코너설명
    private String conrImgFileNm	        ; // 전시코너이미지 파일명
    private String conrImgPathNm	        ; // 전시코너이미지 파일 경로
    private String setCnt	                ; // 코너 세트 갯수

}
