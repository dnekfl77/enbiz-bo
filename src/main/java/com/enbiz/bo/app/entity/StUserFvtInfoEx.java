package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import lombok.Getter;
import lombok.Setter;

@Alias("StUserFvtInfoEx")
@Getter
@Setter
public class StUserFvtInfoEx extends StUserFvtInfo{
    private	String	rtGrpNo;	//권한그룹번호
}
