package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("stRtGrpBase")
@Getter
@Setter
public class StRtGrpBase extends BaseCommonEntity {

	private	String	rtGrpNo;	//권한그룹번호
	private	String	sysGbCd;	//시스템구분코드(UR005)
	private	String	rtGrpNm;	//권한그룹명
	private	String	aplyStrDt;	//적용시작일자 
	private	String	aplyEndDt;	//적용종료일자
	private	String	useYn;	//사용여부
	private	String	sysRegId;	//시스템등록자ID
	private	String	sysRegDtm;	//시스템등록일시
	private	String	sysModId;	//시스템수정자ID
	private	String	sysModDtm;	//시스템수정일시

}
