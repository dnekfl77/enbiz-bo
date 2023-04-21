package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("stRtInfo")
@Getter
@Setter
public class StRtInfo extends BaseCommonEntity {

	private	String	rtGrpNo;	//권한그룹번호
	private	String	rtTgtSeq;	//권한대상순번
	private	String	rtSubGbCd;	//권한주체구분코드(UR006)
	private	String	useYn;	//사용여부

}
