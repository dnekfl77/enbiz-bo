package com.enbiz.bo.app.dto.response.display;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("PrMkdpBaseResponse")
@Getter
@Setter
public class PrMkdpBaseResponse extends BaseCommonEntity {
	private static final long serialVersionUID = 1L;

	private String mkdpNo;				//기획전번호				Varchar	15
	private String mkdpNm;				//기획전명				Varchar	300
	private String siteNo;				//사이트번호				Varchar	15		Y		Fk(사이트기본)
	private String mkdpTypCd;			//기획전유형코드(DP008)		Varchar	10				Subset
	private String mkdpTypNm;			//기획전유형코드명(DP008)	Varchar	10				Subset
	private String tmplNo;				//템플릿번호				Varchar	15		Y		Fk(템플릿기본)
	private String dispYn;				//전시여부				Varchar	1
	private String dispSeq;				//전시순서				Numeric	5
	private String dispStrDtm;			//전시시작일시				Timestamp
	private String dispEndDtm;			//전시종료일시				Timestamp
	private String mkdpListPrtCnt;		//기획전리스트출력수			Numeric	10
	private String mdId;				//Md아이디				Varchar	10
	private String mkdpTtlHtml;			//기획전타이틀html			Clob
	private String kwd1Nm;				//키워드1명				Varchar	300
	private String kwd2Nm;				//키워드2명				Varchar	300
	private String kwd3Nm;				//키워드3명				Varchar	300
	private String sysRegId;			//시스템등록자id			Varchar	30
	private String sysRegDtm;			//시스템등록일시			Timestamp
	private String sysModId;			//시스템수정자id			Varchar	30
	private String sysModDtm;			//시스템수정일시			Timestamp

	private String mdNm;				//Md이름
	private String dispStat;			//기획전상태(10:준비중, 20:진행중, 30:완료)
	private String dispStatName;		//기획전상태명(10:준비중, 20:진행중, 30:완료)
	private String argInsertUpdate;		// 기획전 등록 팝업 입력/수정 구분 값

	private String tmplNm;				// 템플릿 명
	private String tmplPathNm;			// 템플릿 경로명
}