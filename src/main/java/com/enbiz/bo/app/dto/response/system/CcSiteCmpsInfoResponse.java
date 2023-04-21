package com.enbiz.bo.app.dto.response.system;

import org.apache.ibatis.type.Alias;

import com.enbiz.bo.app.entity.BaseCommonDto;

import lombok.Getter;
import lombok.Setter;

@Alias("CcSiteCmpsInfoResponse")
@Getter
@Setter
public class CcSiteCmpsInfoResponse extends BaseCommonDto {
    private String siteNo;			//varchar(15) NOT NULL, -- 사이트번호
	private String cmpsGbTypCd;	//varchar(10) NOT NULL, -- 구성구분유형코드(CH012)
	private String siteSetupCd;	//varchar(10) NOT NULL, -- 사이트설정코드
	private String useYn;			//varchar(1) NOT NULL DEFAULT 'N'::character varying, -- 사용여부
	private String sysRegId;		//varchar(30) NOT NULL, -- 시스템등록자ID
	private String sysRegDtm;		//timestamp NOT NULL, -- 시스템등록일시
	private String sysModId;		//varchar(30) NOT NULL, -- 시스템수정자ID
	private String sysModDtm;		//timestamp NOT NULL, -- 시스템수정일시
}
