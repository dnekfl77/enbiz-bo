package com.enbiz.bo.app.dto.response.display;

import org.apache.ibatis.type.Alias;

import com.enbiz.bo.app.enums.DP011;
import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("PrDispGrpBaseRespons")
@Getter
@Setter
public class PrDispGrpBaseRespons extends BaseCommonEntity {
	private static final long serialVersionUID = 1L;
	private String dispGrpTypCd=DP011.REPRESENTATIVE_EXHIBITION.getCd();		//varchar(10) Not Null, -- 전시그룹유형코드(DP011)(01:대표기획전)
	private String dispGrpNo;			//전시그룹번호				varchar(15) Not Null
	private String dispGrpNm;			//전시그룹명				varchar(300) Not Null
	private String siteNo;				//사이트번호				varchar(15) Null
	private String dpmlNo;				//전시몰번호				varchar(15) Null
	private String dispSeq;				//전시순서				numeric(5) Not Null Default 0
	private String useYn;				//사용여부				varchar(1) Not Null Default 'Y'::character varying
	private String aplyStrDtm;			//적용시작일시				timestamp Null
	private String aplyEndDtm;			//적용종료일시				timestamp Null
	private String dispGrpDesc;			//전시그룹설명				varchar(1000) Null
	private String sysRegId;			//시스템등록자id			varchar(30) Not Null
	private String sysRegDtm;			//시스템등록일시			timestamp Not Null
	private String sysModId;			//시스템수정자id			varchar(30) Not Null
	private String sysModDtm;			//시스템수정일시			timestamp NOT NULL

	//조회조건
	private String srchDispGrpNo;		//기획전번호
	private String srchStartDate;		//전시기간 시작일시
	private String srchEndDate;			//전시기간 적용종료일시
	private String srchDispGrpNm;		//기획전명
}