package com.enbiz.bo.app.dto.response.customer;

import org.apache.ibatis.type.Alias;

import lombok.Getter;
import lombok.Setter;

@Alias("CustomerGradeHistoryResponse")
@Getter
@Setter
public class CustomerGradeHistoryResponse {
    private String mbrNo;               //회원번호
    private String mbrGradeCd;          //회원등급코드(ME024)
    private String histStrDtm;          //이력시작일시

    private String mbrGradeNm;          //회원등급명(ME024)
}
