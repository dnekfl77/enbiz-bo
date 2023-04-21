package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("etMbrSvcAgrInfo")
@Getter
@Setter
public class EtMbrSvcAgrInfo extends BaseCommonEntity {
    private	String mbrNo;	        //회원번호
    private	String siteNo;	        //사이트번호
    private	String emailRecvAgrYn;	//이메일수신동의여부
    private	String smsRecvAgrYn;	//SMS수신동의여부
    private	String appPushAgrYn;	//APP PUSH동의여부
    private	String autoLoginAgrYn;	//자동로그인동의여부
    private	String moblRectAgrYn;	//모바일영수증동의여부
}
