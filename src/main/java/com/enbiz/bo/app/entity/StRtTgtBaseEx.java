package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import lombok.Getter;
import lombok.Setter;

@Alias("stRtTgtBaseEx")
@Getter
@Setter
public class StRtTgtBaseEx extends StRtTgtBase{

    private static final long serialVersionUID = 1L;
    private String mrkNm;
    private String upLevelId;
    private String upUpLevelId;
    private String lvl;
    private String jobGrpCd;
    private String uprMrkNm;

    private String sRtTgtTpCd;
    private String sRtTgtSeq;
    private String uprRtTgtSeq;
    private String downRtTgtCnt;
    private String sMrkNm;
    private String sUseYn;
    private String caller;
    private String subMenuCnt;

}
