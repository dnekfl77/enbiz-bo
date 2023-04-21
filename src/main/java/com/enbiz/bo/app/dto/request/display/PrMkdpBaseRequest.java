package com.enbiz.bo.app.dto.request.display;

import java.util.List;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Alias("PrMkdpBaseRequest")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PrMkdpBaseRequest extends BaseCommonEntity {
	private static final long serialVersionUID = 1L;

	private String argSelectType;     // 선택구분 ( 1 : 단일 , N : 다중 )
	private String argDispStat;		  // 기획전 상태
	private String dispStatList;	  // 기획전 상태 준비중, 진행중 묶어보내기
	
	private String mkdpNo;				//기획전번호				Varchar	15
	private String mkdpNm;				//기획전명				Varchar	300
	private String siteNo;				//사이트번호				Varchar	15		Y		Fk(사이트기본)
	private String mkdpTypCd;			//기획전유형코드(DP008)		Varchar	10				Subset
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

	private String dispStat;			// 기획전상태(10:준비중, 20:진행중, 30:완료)

	private String startDate;			// 기획전 관리 조회 조건 _ 전시시작기간
	private String endDate;				// 기획전 관리 조회 조건 _ 전시종료기간
	private String userId;				// 기획전 관리 조회 조건 _ 등록자 ID
	private String argInsertUpdate;		// 기획전 등록 팝업 입력/수정 구분 값
	private List<PrDispImgInfoRequest> imgList; // 이미지
	private String imgTypCd;				// 이미지유형코드(DP013)

	private String startHour;
	private String startMinute;
	private String endHour;
	private String endMinute;
	private String image1;
	private String image2;
}