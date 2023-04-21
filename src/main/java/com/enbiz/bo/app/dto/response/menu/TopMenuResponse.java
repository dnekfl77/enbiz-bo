package com.enbiz.bo.app.dto.response.menu;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

import org.apache.ibatis.type.Alias;

@Alias("TopMenuResponse")
@Getter
@Setter
public class TopMenuResponse implements Serializable {
    private	String	rtTgtSeq;	//권한대상순번
    private	String	sysGbCd;	//시스템구분코드(UR005)
    private	String	rtTgtNm;	//권한대상명
}
