package com.enbiz.bo.app.entity;

import java.sql.Timestamp;

import org.apache.ibatis.type.Alias;

import lombok.Getter;
import lombok.Setter;

@Alias("stStdCdEx")
@Getter
@Setter
public class StStdCdEx extends StStdCdMl {

    private String stdCatNo;

    private Timestamp systemIFExpStartDtime;

    private Timestamp systemIFExpEndDtime;
    
    private String payMeanCd;
    
}
