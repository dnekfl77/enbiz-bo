package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("loDeliBase")
@Getter
@Setter
public class LoDeliBase extends BaseCommonEntity {

    private String deliNo;
    private String siteNo;
    private String ordNo;
    private Integer dlvpSeq;
    private String deliGbCd;
    private String deliTypCd;
    private String deliProcTypCd;
    private String deliWayCd;
    private String indiDtm;
    private String procDtm;
    private String fnshDtm;
    private String deliPrgsStatCd;
    private String deliPolcNo;
    private String dlexChrgSubCd;
    private String puTypCd;
    private String hdcCd;
    private String invNo;
    private String invRegDtm;
    private String invRegId;
    private String mbrNo;
    private String ordererNm;
    private String entrNo;

}
