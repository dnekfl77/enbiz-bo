package com.enbiz.bo.app.dto.response.customer;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("CustomerTermsAgreeHistoryResponse")
@Getter
@Setter
public class CustomerTermsAgreeHistoryResponse extends BaseCommonEntity {
    private	String agrChgHistSeq;	//동의변경이력순번
    private	String mbrNo;	        //회원번호
    private	String siteNo;	        //사이트번호
    private	String svcAgrTypCd;	    //서비스동의유형코드(ME025)
    private	String agrYn;	        //동의여부

    private String svcAgrTypNm;    //서비스동의유형명(ME025)
}
