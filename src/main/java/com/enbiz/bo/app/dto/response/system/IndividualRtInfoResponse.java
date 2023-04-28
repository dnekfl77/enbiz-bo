package com.enbiz.bo.app.dto.response.system;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("IndividualRtInfoResponse")
@Getter
@Setter
public class IndividualRtInfoResponse extends BaseCommonEntity {
	private String indivRtNo;	//개별권한번호
    private String userId;		//사용자ID
    private	String userNm;
    private String sysGbCd;		//시스템구분코드(UR005)
    private String sysGbNm;
    private	String rtGrpNm;		//권한그룹명
    private String regCausCont;
    private String aplyStrDt;
    private String aplyEndDt;
    private String useYn;
    private String atchFileRouteNm;
    private String atchFileNm;
    private String sysModId;	//수정자id
    private String sysModNm;	//수정자명
    private String sysModDtm;	//수정일시
    private String excelHeader;	//엑셀 헤더
}
