package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("OpRfdInfo")
@Getter
@Setter
public class OpRfdInfo extends BaseCommonEntity{
    private String rfdNo;
    private String payNo;
    private String ordNo;
    private String mbrNo;
    private String rfdTypCd;
    private String rfdPrgsStatCd;
    private String rfdBankCd;
    private String rfdActnNo;
    private String rfdActnDepositorNm;
    private String rfdCausCd;
    private String rfdActnCertiYn;
    private Integer rfdAmt;
    private Integer rfdCmsnAmt;
    private String rfdItmi;
    private String acptmnId;
    private String accpDtm;
    private String reqDtm;
    private String aprmnId;
    private String aprvDtm;
    private String fnshmnId;
    private String fnshDtm;
    private String rfdSmsSndYn;
}
