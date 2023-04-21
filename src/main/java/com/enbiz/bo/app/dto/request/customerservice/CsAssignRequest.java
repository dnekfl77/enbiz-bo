package com.enbiz.bo.app.dto.request.customerservice;

import java.util.List;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("CsAssignRequest")
@Getter
@Setter
public class CsAssignRequest extends BaseCommonEntity {
    private String startDate;
    private String endDate;
    private String autoDivGbCd;
    private String subAutoDivGbCd;
    private String autoDivDtlNo;
    private String subAutoDivDtlNo;
    private String ccnPrgsStatCd;
    private List<String> ccnPrgsStatCdList;
    private String userId;
    private int days;
}
