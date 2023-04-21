package com.enbiz.bo.app.dto.response.customerservice;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("CsAssignResponse")
@Getter
@Setter
public class CsAssignResponse extends BaseCommonEntity {
    private String autoDivNo;
    private String autoDivGbCd;
    private String autoDivGbNm;
    private String autoDivDtlNo;
    private String autoDivDtlNm;
    private String numOfPeopleHandling;
    private String numOfAllotableCases;
    private String numOfAssignments;
    private String numOfUnassignments;
    private String receipt;
    private String inProgress;
    private String complete;
    private String already;
    private String aempId;
    private String aempNm;
    private String state;
}
