package com.enbiz.bo.app.dto.request.system;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("CcSiteBaseCudRequest")
@Getter
@Setter
public class CcSiteBaseCudRequest extends BaseCommonEntity {
	private static final long serialVersionUID = 1L;

	private String siteNo;		//varchar(15) NOT NULL, -- 사이트번호
	private String siteNm;		//varchar(300) NOT NULL, -- 사이트명
	private String trdStrtDt;	//varchar(8) NOT NULL, -- 거래시작일자
	private String trdEndDt;	//varchar(8) NOT NULL, -- 거래종료일자
	private String siteDom;		//varchar(100) NOT NULL, -- 사이트도메인

	public String getTrdStrtDt(){
		return trdStrtDt.replaceAll("-", "");
	}
	public String getTrdEndDt(){
		return trdEndDt.replaceAll("-", "");
	}
}
