package com.enbiz.bo.app.dto.request.display;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("CcFotrInfoRequest")
@Getter
@Setter
public class CcFotrInfoRequest extends BaseCommonEntity {
	private String fortNo;         //푸터번호
	private String siteNo;         //사이트번호
	private String sysGbCd;        //시스템구분코드(CH003)
	private String fotrContGbCd;   //푸터컨텐츠구분코드(CH004)
	private String dispSeq;        //전시순서
	private String useYn;          //사용여부
	private String menuNm;        //메뉴명
	private String linkUrl;        //연결URL
	private String movFrmeCd;      //이동프레임코드(DP007)
	private String fotrCont;       //푸터컨텐츠
	private String uprFotrNo;      //상위푸터번호
}