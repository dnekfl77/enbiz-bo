package com.enbiz.bo.app.dto.response.customer;

import org.apache.ibatis.type.Alias;

import lombok.Getter;
import lombok.Setter;

@Alias("CustomerTermsAgreeInfoResponse")
@Getter
@Setter
public class CustomerTermsAgreeInfoResponse {
    private	String mbrNo;	        //회원번호
    private	String siteNo;	        //사이트번호
    private	String emailRecvAgrYn;	//이메일수신동의여부
    private	String smsRecvAgrYn;	//SMS수신동의여부
    private	String appPushAgrYn;	//APP PUSH동의여부
    private	String autoLoginAgrYn;	//자동로그인동의여부
    private	String moblRectAgrYn;	//모바일영수증동의여부

    private String siteNm;          //사이트명
}
