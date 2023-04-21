package com.enbiz.bo.app.dto.response.display;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("CcFotrInfoResponse")
@Getter
@Setter
public class CcFotrInfoResponse extends BaseCommonEntity {
	private String fortNo;
	private String siteNo;
	private String sysGbCd;
	private String fotrContGbCd;
	private String dispSeq;
	private String useYn;
	private String menuNm;
	private String linkUrl;
	private String movFrmeCd;
	private String fotrCont;
	private String uprFotrNo;
}