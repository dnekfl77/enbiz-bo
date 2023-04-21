package com.enbiz.bo.app.dto.request.system;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@SuppressWarnings("serial")
@Alias("CcSiteCmpsInfoCudRequest")
@Getter
@Setter
public class CcSiteCmpsInfoCudRequest extends BaseCommonEntity {
	private String siteNo;		//사이트번호
	private String siteNm;		//사이트명
	private String trdStrtDt;	//거래시작일자
	private String trdEndDt;	//거래종료일자
	private String siteDom;		//사이트도메인
}
