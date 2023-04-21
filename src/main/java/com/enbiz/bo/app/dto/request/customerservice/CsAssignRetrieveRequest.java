package com.enbiz.bo.app.dto.request.customerservice;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("CsAssignRetrieveRequest")
@Getter
@Setter
public class CsAssignRetrieveRequest extends BaseCommonEntity {
    private String startDate;
    private String endDate;
    private String autoDivNo;
    private String aempId;
    private String autoDivGbCd;
    private String autoDivDtlNo;
}
