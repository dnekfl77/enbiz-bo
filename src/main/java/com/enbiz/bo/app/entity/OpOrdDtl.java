package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("opOrdDtl")
@Getter
@Setter
public class OpOrdDtl extends BaseCommonEntity {

    private String ordNo;
    private String ordSeq;
    private String uprOrdSeq;
    private String ordDtlGbCd;
    private String ordSaleTypCd;
    private String ordAccpDtm;
    private String ordFnshDtm;
    private String ordDtlStatCd;
    private String ordDtlStatDtm;
    private String chlNo;
    private String chlDtlNo;
    private String stdCtgNo;
    private String dispShopGbCd;
    private String repDispCtgNo;
    private String infDispCtgNo;
    private String conrNo;
    private String goodsNo;
    private String itmNo;
    private String goodsNm;
    private String itmNm;
    private String prestNm;
    private String goodsCompCd;
    private String goodsTypCd;
    private String saleMethCd;
    private Integer ordQty;
    private Integer cnclQty;
    private Integer rtnQty;
    private Integer supPcost;
    private Integer norPrc;
    private Integer salePrc;
    private Integer mrgnRate;
    private String taxGbCd;
    private String buyTypCd;
    private String entrNo;
    private String sndIndiFcstDt;
    private String insiDtm;
    private String sndContrDtm;
    private String sndImpsDtm;
    private String procDtm;
    private String fnshDtm;
    private String deliUnitNo;
    private Integer dlvpSeq;
    private String deliProcTypCd;
    private String deliWayCd;
    private String deliGoodsGbCd;
    private String deliPolcNo;
    private String dlexChrgSubCd;
    private Integer deliDday;
    private String bpckPsbYn;
    private String rtnPsbYn;
    private String exchPsbYn;
    private String sndWaitCausCd;
    private String claimCausCd;
    private String claimCausEtcCont;
    private String puTypCd;
    private String payProcSn;
    private String payFnshDtm;
    private String prrfTgtYn;
    private String prrfProcDtime;
    private String prrfDspsId;
    private String adjTrnsDtm;
}
