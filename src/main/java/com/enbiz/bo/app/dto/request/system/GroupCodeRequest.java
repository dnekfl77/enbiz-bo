package com.enbiz.bo.app.dto.request.system;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("GroupCodeRequest")
@Getter
@Setter
public class GroupCodeRequest extends BaseCommonEntity {
	private String grpCd        ; // 그룹코드
	private String grpCdNm      ; // 그룹코드명
	private String grpCdDesc    ; // 그룹코드설명
	private String useYn        ; // 사용여부
	private String ref1ValDesc  ; // 참조1값 설명
	private String ref2ValDesc  ; // 참조2값 설명
	private String ref3ValDesc  ; // 참조3값 설명
	private String ref4ValDesc  ; // 참조4값 설명
	private String ref5ValDesc  ; // 참조5값 설명
}
