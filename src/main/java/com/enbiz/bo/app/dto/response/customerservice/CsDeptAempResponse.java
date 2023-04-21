package com.enbiz.bo.app.dto.response.customerservice;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("CsDeptAempResponse")
@Getter
@Setter
public class CsDeptAempResponse extends BaseCommonEntity {
    private String autoDivNo;
    private String aempId;
    private String aempNm;
    private String autoDivGbCd;
    private String autoDivGbNm;
    private String autoDivDtlNo;
    private Integer dayclQuotQty;
    private String autoDivPsbYn;
    private String state;
}
