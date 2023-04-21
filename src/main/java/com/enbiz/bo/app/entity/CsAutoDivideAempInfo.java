package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * CS 자동배분 담당자 정보
 */
@Alias("CsAutoDivideAempInfo")
@Getter
@Setter
public class CsAutoDivideAempInfo extends BaseCommonEntity{
    private String autoDivNo;   // 자동배분번호
    private String aempId;      // 담당자 아이디
    private String autoDivGbCd; // 자동배분구분코드(CS023)
    private String autoDivDtlNo;// 자동배분상세번호
    private Integer dayclQuotQty;// 일별할당량
    private String autoDivPsbYn;// 자동배분가능여부
}
