package com.enbiz.bo.app.dto.request.display;

import org.apache.ibatis.type.Alias;

import com.enbiz.bo.app.enums.DP011;
import com.enbiz.bo.app.enums.DP012;
import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("PrDispGrpMappInfoRequest")
@Getter
@Setter
public class PrDispGrpMappInfoRequest extends BaseCommonEntity {
	private static final long serialVersionUID = 1L;
	private String dispGrpTypCd = DP011.REPRESENTATIVE_EXHIBITION.getCd();	//전시그룹유형코드(DP011)(01:대표기획전)	varchar(10) Not Null
	private String dispGrpNo;											//전시그룹번호 							varchar(15) NOT NULL
	private String dispShopGbCd = DP012.EXHIBITION.getCd();		//전시매장구분코드(DP012)(02:기획전) 		varchar(10) NOT NULL
	private String shopCtgNo;											//매장카테고리번호 						varchar(15) NOT NULL
	private String dispSeq;												//전시순서 							numeric(5) NOT NULL DEFAULT 0
	private String useYn;												//사용여부 							varchar(1) NOT NULL
	private String sysRegId;											//시스템등록자ID 						varchar(30) NOT NULL
	private String sysRegDtm;											//시스템등록일시 						timestamp NOT NULL
	private String sysModId;											//시스템수정자ID 						varchar(30) NOT NULL
	private String sysModDtm;											//시스템수정일시 						timestamp NOT NULL
}