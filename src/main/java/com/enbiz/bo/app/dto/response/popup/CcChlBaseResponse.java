package com.enbiz.bo.app.dto.response.popup;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("CcChlBaseResponse")
@Getter
@Setter
public class CcChlBaseResponse extends BaseCommonEntity {

    private String grpCd 		; 	// 공통코드 그룹값
    private String cd			; 	// 공통코드 값
    private String cdNm			; 	// 공통코드 이름
    private String chlNo		; 	// 채널번호
    private String chlNm		; 	// 채널명
    private String chlClssCd	; 	// 채널분류코드
    private String chlTypCd		; 	// 채널유형코드

}
