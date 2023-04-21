package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("StBldgAddrInfo")
@Getter
@Setter
public class StBldgAddrInfo extends BaseCommonEntity {

    private String bdMgtSn;
    private String admCd;
    private String ctgNm;
    private String sigNm;
    private String emdNm;
    private String liNm;
    private String mntnYn;
    private Integer lnbrMnnm;
    private Integer lnbrSlno;
    private String roadCd;
    private String roadNm;
    private String buldSeCd;
    private Integer buldMnnm;
    private Integer buldSlno;
    private String buldLdgNm;
    private String buldDtlNm;
    private String emdNo;
    private String hemdCd;
    private String hemdNm;
    private String zipNo;
    private String zipNoSn;
    private String zipNm;
    private String movCausCd;
    private String pbldDt;
    private String preChgRoadNm;
    private String posBulNm;
    private String comnHsYn;
    private String baseZonNo;
    private String dtlAddrYn;
    private String rmk1;
    private String rmk2;

}
