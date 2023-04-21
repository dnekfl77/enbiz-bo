package com.enbiz.bo.app.dto.request.display;

import org.apache.ibatis.type.Alias;

import com.enbiz.bo.app.enums.DP011;
import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("PrDispGrpBaseRequest")
@Getter
@Setter
public class PrDispGrpBaseRequest extends BaseCommonEntity {
	private static final long serialVersionUID = 1L;
	private String dispGrpTypCd=DP011.REPRESENTATIVE_EXHIBITION.getCd();		//varchar(10) Not Null, -- 전시그룹유형코드(DP011)(01:대표기획전)
	private String dispGrpNo;		  	//varchar(15) Not Null, -- 전시그룹번호
	private String dispGrpNm;		  	//varchar(300) Not Null, -- 전시그룹명
	private String siteNo;		  		//varchar(15) Null, -- 사이트번호
	private String dpmlNo;		  		//varchar(15) Null, -- 전시몰번호
	private String dispSeq;		  		//numeric(5) Not Null Default 0, -- 전시순서
	private String useYn;		  		//varchar(1) Not Null Default 'Y'::character varying, -- 사용여부
	private String aplyStrDtm;		  	//timestamp Null, -- 적용시작일시
	private String aplyEndDtm;		  	//timestamp Null, -- 적용종료일시
	private String dispGrpDesc;		 	//varchar(1000) Null, -- 전시그룹설명
	private String sysRegId;		  	//varchar(30) Not Null, -- 시스템등록자id
	private String sysRegDtm;		  	//timestamp Not Null, -- 시스템등록일시
	private String sysModId;		  	//varchar(30) Not Null, -- 시스템수정자id
	private String sysModDtm;		  	//timestamp NOT NULL, -- 시스템수정일시

	//조회조건
	private String srchSiteNo;			//사이트번호				VARCHAR	15
	private String srchStartDate;		//전시기간 시작일			TIMESTAMP
	private String srchEndDate;			//전시기간 종료일			TIMESTAMP
	private String srchDispGrpNm;		//전시그룹명				VARCHAR	300
	private String srchDispGrpNo;		//전시그룹번호				VARCHAR	15
}