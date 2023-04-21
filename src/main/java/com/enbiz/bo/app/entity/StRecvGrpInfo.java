package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("StRecvGrpInfo")
@Getter
@Setter
public class StRecvGrpInfo extends BaseCommonEntity {

	private String recvGrpNo;		//수신그룹번호
	private String recvGrpNm;		//수신그룹명
	private String pblYn;				//공개여부
	private String useYn;				//사용여부

}
