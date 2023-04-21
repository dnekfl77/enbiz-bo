package com.enbiz.bo.app.dto.response.customer;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.masking.MaskString;
import com.enbiz.common.base.masking.MaskingType;

import lombok.Getter;
import lombok.Setter;

@Alias("CustomerDetailOrderCallCountResponse")
@Getter
@Setter
public class CustomerDetailOrderCallCountResponse {
    private	String mbrNo;	                //회원번호
    @MaskString(type = MaskingType.NAME_KR)
    private	String mbrNm;	                //회원명
    private	String mbrGradeCd;	            //회원등급코드(ME024)
    private	String mbrGradeNm;	            //회원등급명(ME024)
    private Integer ordCnt;                 //주문건수
    private Integer callCnt;                //상담건수
    @MaskString(type = MaskingType.ID)
    private String loginId;                 //회원ID
}
