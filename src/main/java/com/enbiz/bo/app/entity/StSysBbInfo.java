package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("StSysBbInfo")
@Getter
@Setter
public class StSysBbInfo extends BaseCommonEntity {

    private String bbcNo;
    private String sysGbCd;
    private String bbGbCd;
    private String title;
    private String fxdcYn;
    private String ntcGbCd;
    private String ntcTypCd;
    private String smsSndYn;
    private String emailSndYn;
    private String bbYn;
    private String bbStrDtm;
    private String bbEndDtm;
    private String popYn;
    private String popBbStrDtm;
    private String popBbEndDtm;
    private String bbcCont;
    private Integer qryCnt;
}
