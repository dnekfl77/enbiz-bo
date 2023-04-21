package com.enbiz.bo.app.dto.request.customerservice;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("CsCustomerCompensRequest")
@Getter
@Setter
public class CsCustomerCompensRequest extends BaseCommonEntity {
    private String periodType;
    private String startDate;
    private String endDate;
    private String rspnGbCd;
    private String cpnsTypNo;
    private String cpnsTypNm;
    private String cpnsMeanCd;
    private String mbrType;
    private String loginId;
    private String mbrNm;
    private String cpnsAprvStatCd;
    private String cpnsPayStatCd;
    private String userType;
    private String userNm;
    private String userId;
}
