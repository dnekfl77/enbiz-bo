package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import lombok.Getter;
import lombok.Setter;

@Alias("stUsrWkLogEx")
@Getter
@Setter
public class StUsrWkLogEx extends StUsrWkLog {

    private String usrId;
    private String schDateSt;
    private String schDateEd;

}
