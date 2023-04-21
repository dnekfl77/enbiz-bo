package com.enbiz.bo.app.dto.request.customer;

import org.apache.ibatis.type.Alias;

import lombok.Getter;
import lombok.Setter;

@Alias("CustomerDetailRequest")
@Getter
@Setter
public class CustomerDetailRequest {
    private	String mbrNo;	            //회원번호
    private String siteNo;              //가입사이트번호
    private String mbrNm;               //회원명
}
