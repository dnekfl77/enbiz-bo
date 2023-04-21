package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("StZipNo")
@Getter
@Setter
public class StZipNo extends BaseCommonEntity {

    private Integer zipNoSeq;
    private String zipNo;
    private String ctpNm;
    private String ctpEngNm;
    private String sigNm;
    private String sigEngNm;
    private String emdNm;
    private String emdEngNm;
    private String roadCd;
    private String roadNm;
    private String roadEngNm;
    private String buldSeCd;
    private String buldMnnm;
    private String buldSlno;
    private String bdMgtSn;
    private String zipNm;
    private String posBulNm;
    private String admCd;
    private String admNm;
    private String riNm;
    private String hemdNm;
    private String mntnYn;
    private String lnbrMnnm;
    private String emdNo;
    private String lnbrSlno;
    private String useYn;

}
