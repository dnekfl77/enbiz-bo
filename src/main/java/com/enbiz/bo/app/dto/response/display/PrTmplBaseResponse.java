package com.enbiz.bo.app.dto.response.display;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("PrTmplBaseResponse")
@Getter
@Setter
public class PrTmplBaseResponse extends BaseCommonEntity {

    private String tmplNo		; 	// 템플릿번호
    private String tmplNm	    ; 	// 템플릿명
    private String tmplTypCd	; 	// 템플릿우형코드
    private String tmplPathNm	; 	// 템플릿경로명
    private String tmplFileNm	; 	// 템플릿파일명
    private String tmplFilePath	; 	// 템플릿파일경로
    private String useYn	    ; 	// 사용여부
    private String conrCnt	    ; 	// 코너 갯수
    private String conrInsert	; 	// 코너 등록

}
