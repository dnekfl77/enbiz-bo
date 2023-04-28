package com.enbiz.bo.app.entity;

import com.enbiz.common.base.entity.BaseCommonEntity;
import lombok.Getter;
import lombok.Setter;
import org.apache.ibatis.type.Alias;

@Alias("stIndivRtBaseInfo")
@Getter
@Setter
public class StIndivRtBaseInfo extends BaseCommonEntity {
	private	String indivRtNo;
	private String userId;
	private String sysGbCd;
	private String aplyStrDt;
	private String aplyEndDt;
	private String useYn;
	private String regCausCont;
	private String atchFileRouteNm;
	private String atchFileNm;
	private String sysRegId;
	private String sysRegDtm;
	private String sysModId;
	private String sysModDtm;
	
	private String rtGrpNm;
}
