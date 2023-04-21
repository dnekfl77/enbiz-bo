package com.enbiz.bo.app.dto.response.customerservice;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.encrypt.Encrypt;
import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("CsCompensDetailResponse")
@Getter
@Setter
public class CsCompensDetailResponse extends BaseCommonEntity {
    private String custCpnsAplyNo;
    private String mbrNm;
    private String mbrNo;
    private String loginId;
    private String ccnNo;
    private String ordNo;
    private String goodsNo;
    private String goodsNm;
    private String cpnsMeanCd;
    private String cpnsTypNm;
    private String rspnGbCd;
    private String standard;
    private Integer maxPayLim;
    private Integer cpnsAmt;
    private String payBankCd;
    private String payDepositorNm;
    @Encrypt
    private String payActnNo;
    private String cpnsAprvStatCd;
    private String cpnsAprvStatNm;
    private String cpnsPayStatCd;
    private String cpnsPayStatNm;
    private String accpCont;
    private String payReqMemo;
    private String acptmnId;
}
