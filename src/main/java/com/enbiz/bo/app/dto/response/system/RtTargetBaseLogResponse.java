package com.enbiz.bo.app.dto.response.system;

import org.apache.ibatis.type.Alias;

import com.enbiz.bo.app.entity.BaseCommonDto;

import lombok.Getter;
import lombok.Setter;

@Alias("RtTargetBaseLogResponse")
@Getter
@Setter
public class RtTargetBaseLogResponse extends BaseCommonDto {
	private String sysGbNm;
	private	String rtTgtSeq;
	private String rtTgtNm;
	private String menuRegDtm;
	private Long userCnt;
	private Long menuUseCnt;
	private String lastUseDtm;
	private String userId;
	private String userNm;
	private Long userMenuUseCnt;
}

