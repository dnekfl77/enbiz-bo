package com.enbiz.bo.app.dto.request.system;

import javax.validation.constraints.NotEmpty;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("RtTargetBaseCudRequest")
@Getter
@Setter
public class RtTargetBaseCudRequest extends BaseCommonEntity {

    private String rtTgtSeq;
    @NotEmpty
    private String sysGbCd;
    @NotEmpty
    private String rtTgtTypCd;
    @NotEmpty
    private String rtTgtNm;
    @NotEmpty
    private Integer sortSeq;
    @NotEmpty
    private String callUrl;
    private String useYn;
    private String custInfoInclYn;
    private String rmkCont;
    private String popupYn;
    private String btnId;
    @NotEmpty
    private String uprRtTgtSeq;
    @NotEmpty
    private String leafMenuYn;

    private String userHelpCont;

}
