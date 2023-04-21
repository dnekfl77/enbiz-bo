package com.enbiz.bo.app.dto.request.customerservice;


import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("CsCpPayRequest")
@Getter
@Setter
public class CsCpPayRequest extends BaseCommonEntity {
    private String periodType;
    private String startDate;
    private String endDate;
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
