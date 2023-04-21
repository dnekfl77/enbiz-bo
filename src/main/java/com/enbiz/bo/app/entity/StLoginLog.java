package com.enbiz.bo.app.entity;

import java.io.Serializable;
import java.time.LocalDateTime;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("stLoginLog")
@Setter
@Getter
public class StLoginLog extends BaseCommonEntity implements Serializable {
    private	Long loginLogSeq;	    //로그인로그순번
    private	String userId;	        //사용자아이디
    private	String sysGbCd;	        //시스템구분코드(UR005)
    private LocalDateTime loginDtm;	//로그인일시
    private	String loginIpAddr;	    //로그인IP주소
    private	LocalDateTime loutDtm;	//로그아웃일시
    private	String loutCausCd;	    //로그아웃사유코드(UR007)
}
