package com.enbiz.bo.app.dto.request.display;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("PrTmplBaseRequest")
@Getter
@Setter
public class PrTmplBaseRequest extends BaseCommonEntity {

    private String argSelectType;
    private String argTmplTypCd;
    private String tmplNo		; 	// 템플릿번호
    private String tmplNm	    ; 	// 템플릿명
    private String tmplTypCd	; 	// 템플릿우형코드
    private String tmplPathNm	; 	// 템플릿경로명
    private String tmplFileNm	; 	// 템플릿파일명
    private String tmplFilePath	; 	// 템플릿파일경로
    private String useYn	    ; 	// 사용여부
}
