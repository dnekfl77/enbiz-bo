package com.enbiz.bo.app.dto.response.customerservice;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("CsCustomerCompensResponse")
@Getter
@Setter
public class CsCustomerCompensResponse extends BaseCommonEntity {
    private String custCpnsAplyNo;
    private String accpDtm;
    private String cpnsAprvStatCd;
    private String cpnsAprvStatNm;
    private String cpnsPayStatCd;
    private String cpnsPayStatNm;
    private String cpnsTypNm;
    private String cpnsMeanCd;
    private String rspnGbCd;
    private String cpnsAmt;
    private String maxPayLim;
    private String overAmt;
    private String ordNo;
    private String goodsNo;
    private String goodsNm;
    private String itmNm;
    private String loginId;
    private String mbrNm;
    private String entrNm;
    private String acptmnId;
    private String aprvDtm;
    private String aprmnId;
    private String retnDtm;
    private String retnProcmnId;
    private String payDtm;
}
