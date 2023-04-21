package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import lombok.Getter;
import lombok.Setter;

@Alias("stUsrLoginLogEx")
@Getter
@Setter
public class StUsrLoginLogEx extends StUsrLoginLog {

    private String usrSctCd;
    private String usrId;
    private String usrNm;
    private String loginFailCnt;
    private String usrTxt;
    private String usrCd;
    private String locked;
    private String cnt;
    private String system;
    private String loginTpCd;
    private String empNo;
    private String lgcOrgCd;

}
