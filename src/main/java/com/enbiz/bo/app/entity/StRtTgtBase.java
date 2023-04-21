package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("stRtTgtBase")
@Getter
@Setter
public class StRtTgtBase extends BaseCommonEntity {

    private String rtTgtSeq;
    private String sysGbCd;
    private String rtTgtTypCd;
    private String rtTgtNm;
    private Integer sortSeq;
    private String callUrl;
    private String useYn;
    private String custInfoInclYn;
    private String rmkCont;
    private String popupYn;
    private String btnId;
    private String uprRtTgtSeq;
    private String leafMenuYn;
    private String userHelpCont;

}
