package com.enbiz.bo.app.dto.request.system;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IndividualRtInfoRequest {
	private String indivRtNo;	//개별권한번호
    private String userId;		//사용자ID
    private String sysGbCd;		//시스템구분코드(UR005)
    private	String rtGrpNm;		//권한그룹명
    private String aplyStrDt;
    private String aplyEndDt;
    private String useYn;
    private String regCausCont;
    private String atchFileRouteNm;
    private String atchFileNm;
//    private	String rtGrpNm;		//권한그룹명
    private String excelHeader;	//엑셀 헤더
}
