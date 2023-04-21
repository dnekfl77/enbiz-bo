package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import lombok.Getter;
import lombok.Setter;

@Alias("stStdCdMl")
@Getter
@Setter
public class StStdCdMl extends StStdCd {

    private String langCd;
    private String cdNm;
    private String mrkNm;
    private String ref1Val;
    private String ref2Val;
    private String ref3Val;
    private String ref4Val;
    private String ref5Val;
    private String ref6Val;
    private String grpNm;

}
