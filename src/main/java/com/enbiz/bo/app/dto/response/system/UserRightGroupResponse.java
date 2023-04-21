package com.enbiz.bo.app.dto.response.system;

import org.apache.ibatis.type.Alias;

import com.enbiz.bo.app.entity.BaseCommonDto;

import lombok.Getter;
import lombok.Setter;

@Alias("UserRightGroupResponse")
@Getter
@Setter
public class UserRightGroupResponse extends BaseCommonDto {
    private	String	rtGrpNo;	//권한그룹번호
    private	String	sysGbNm;	//시스템구분명
    private	String	rtGrpNm;	//권한그룹명
    private	String	aplyStrDt;	//적용시작일자
    private String  aplyEndDt; //적용종료일자
}
