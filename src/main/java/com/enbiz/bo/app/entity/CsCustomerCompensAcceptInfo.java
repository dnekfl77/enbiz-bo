package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.encrypt.Encrypt;
import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * 고객보상접수정보
 */
@Alias("CsCustomerCompensAcceptInfo")
@Getter
@Setter
public class CsCustomerCompensAcceptInfo extends BaseCommonEntity{
    @Encrypt
    private String payActnNo;
    private String custCpnsAplyNo;
    private String ccnNo;
    private String cpnsTypNo;
    private String cpnsMeanCd;
    private String rspnGbCd;
    private String cpnsAprvStatCd;
    private String cpnsPayStatCd;
    private String mbrNo;
    private String accpDtm;
    private String accpCont;
    private String acptmnId;
    private Integer cpnsAmt;
    private String aprvDtm;
    private String aprmnId;
    private String payReqMemo;
    private String retnDtm;
    private String retnProcmnId;
    private String payDtm;
    private String paymnId;
    private String payCont;
    private String payReqDtm;
    private String payBankCd;
    private String payDepositorNm;
    private String ordNo;
    private String goodsNo;
    private String retnCausCont;
}
