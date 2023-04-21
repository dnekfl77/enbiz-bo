package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * 회원자산관리이력
 */
@Alias("EtMbrAstMgrHist")
@Getter
@Setter
public class EtMbrAstMgrHist extends BaseCommonEntity{
    private String astMgrSeq;
    private String mbrNo;
    private String astGbCd;
    private String rsrvUseGbCd;
    private String astRsrvTypCd;
    private String actPointTypCd;
    private String astMgrNo;
    private String astMgrDtlNo;
    private String ocurDtm;
    private Integer ocurAmt;
    private Integer balAmt;
    private String avalStrtDt;
    private String avalEndDt;
    private String astUseCausCd;
    private String payNo;
    private String astUseDtm;
    private String astMgrMemo;
}
