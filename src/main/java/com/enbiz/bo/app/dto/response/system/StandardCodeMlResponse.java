package com.enbiz.bo.app.dto.response.system;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Setter;

import lombok.Getter;

@Alias("StandardCodeMlResponse")
@Getter
@Setter
public class StandardCodeMlResponse extends BaseCommonEntity {
	
	private String grpCd;		// 그룹코드
	private String cd;			// 코드
	private String langCd;		// 언어코드
	private String cdNmKo;		// 코드명(한국어)
	private String cdNm;		// 코드명(다국어)
	private String cdDescKo;	// 코드설명(한국어)
	private String cdDesc;		// 코드설명(다국어)
	
}
