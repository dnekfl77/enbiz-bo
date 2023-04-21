package com.enbiz.bo.app.dto.response.customer;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("WatchCustomerResponse")
@Getter
@Setter
public class WatchCustomerResponse extends BaseCommonEntity {
    private	String mgrMbrNo;	        //관리회원번호
    private	String mbrNo;	            //회원번호
    private	String mgrGbCd;	            //관리구분코드(ME019)
    private	String mgrTypCd;	        //관리유형코드(ME009)
    private	String regCausCont;	        //등록사유내용
    private	String ordNo;	            //주문번호
    private String regDtm;	            //등록일시
    private String rvcDtm;	            //해제일시
    private	String mgrMbrRegId;	        //관리회원등록자ID
    private	String mgrMbrRvcId;	        //관리회원해제자ID

    private	String mgrGbNm;	            //관리구분명(ME019)
    private	String mgrTypNm;	        //관리유형명(ME009)
}
