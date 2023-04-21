package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("loDeliDtl")
@Getter
@Setter
public class LoDeliDtl extends BaseCommonEntity {

    private String deliNo;
    private Integer deliSeq;
    private String ordNo;
    private String ordSeq;
    private String ordSaleTypCd;
    private String entrNo;
    private String goodsNo;
    private String itmNo;
    private String goodsNm;
    private String itmNm;
    private String prestNm;
    private String goodsCompCd;
    private String goodsTypCd;
    private String saleMethCd;
    private Integer indiQty;
    private Integer cnclQty;
    private Integer procQty;
    private Integer supPcost;
    private Integer norPrc;
    private Integer salePrc;
    private Integer mrgnRate;
    private String taxGbCd;
    private String buyTypCd;
    private String deliGoodsGbCd;
    private String sndWaitCausCd;
}
