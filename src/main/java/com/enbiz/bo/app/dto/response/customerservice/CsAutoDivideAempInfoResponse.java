package com.enbiz.bo.app.dto.response.customerservice;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("CsAutoDivideAempInfoResponse")
@Getter
@Setter
public class CsAutoDivideAempInfoResponse extends BaseCommonEntity {
    private String autoDivNo;   // 자동배분번호
    private String aempId;      // 담당자 아이디
    private String autoDivGbCd; // 자동배분구분코드(CS023)
    private String autoDivDtlNo;// 자동배분상세번호
    private String autoDivDtlNm;// 자동배분상세번호명
    private Integer dayclQuotQty;// 일별할당량
    private String autoDivPsbYn;// 자동배분가능여부
}
