package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("PrMkdpBase")
@Getter
@Setter
public class PrMkdpBase extends BaseCommonEntity {

    private String mkdpNo;				// 기획전번호
    private String mkdpNm;				// 기획전명
    private String siteNo;				// 사이트번호
    private String mkdpTypCd;			// 기획전유형코드(DP008)
    private String tmplNo;				// 템플릿번호
    private String dispYn;				// 전시여부
    private Integer dispSeq;				// 전시순서
    private String dispStrDtm;			// 전시시작일시
    private String dispEndDtm;			// 전시종료일시
    private Integer mkdpListPrtCnt;		// 기획전리스트출력수
    private String mdId;				// Md아이디
    private String mkdpTtlHtml;			// 기획전타이틀html
    private String kwd1Nm;				// 키워드1명
    private String kwd2Nm;				// 키워드2명
    private String kwd3Nm;				// 키워드3명

    private String dispStat;			// 기획전상태(10:준비중, 20:진행중, 30:완료)

    private String startDate;			// 기획전 관리 조회 조건 _ 전시시작기간
    private String endDate;				// 기획전 관리 조회 조건 _ 전시종료기간
    private String userId;				// 기획전 관리 조회 조건 _ 등록자 ID
    private String imgTypCd1;			// 이미지유형코드(DP013) _ 기획전배너
    private String imgTypCd2;			// 이미지유형코드(DP013) _ 기획전모바일배너

}
