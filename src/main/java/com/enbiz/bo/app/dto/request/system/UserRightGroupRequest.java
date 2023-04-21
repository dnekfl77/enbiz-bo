package com.enbiz.bo.app.dto.request.system;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("UserRightGroupRequest")
@Getter
@Setter
public class UserRightGroupRequest extends BaseCommonEntity{
    private String sysGbCd; //시스템구분코드
    private	String rtGrpNo; //권한그룹번호
    private	String rtGrpNm;	//권한그룹명
    private String argSelectType;
    private String argSysGbCd;
}
