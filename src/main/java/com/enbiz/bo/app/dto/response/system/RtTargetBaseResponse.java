package com.enbiz.bo.app.dto.response.system;

import org.apache.ibatis.type.Alias;

import com.enbiz.bo.app.entity.BaseCommonDto;

import lombok.Getter;
import lombok.Setter;

@Alias("RtTargetBaseResponse")
@Getter
@Setter
public class RtTargetBaseResponse extends BaseCommonDto {

    private String rtTgtSeq;
    private String rtTgtNm;
    private String uprRtTgtSeq;
    private String popupYn;
    private String level;
    private String hierarchy;

    private String uprRtTgtNm;
    private String sysGbCd;
    private String rtTgtTypCd;
    private Integer sortSeq;
    private String callUrl;
    private String useYn;
    private String custInfoInclYn;
    private String rmkCont;
    private String btnId;
    private String leafMenuYn;
    private String userHelpCont;
}
