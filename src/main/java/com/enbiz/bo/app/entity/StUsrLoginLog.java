package com.enbiz.bo.app.entity;

import java.util.Date;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;
import com.enbiz.common.base.masking.MaskingFormat;

import lombok.Getter;
import lombok.Setter;

@Alias("stUsrLoginLog")
@Getter
@Setter
public class StUsrLoginLog extends BaseCommonEntity {

    private Date loginDtime;
    @MaskingFormat(regexPattern="^(.*)\\.(.*)\\.(.*)\\.(.*)$", replacePattern="$1.$2.***.***")
    private String usrIpAddr;
    private String sessId;
    private Date logoutDtime;
    private String usrId;
    private String loginTpNm;
    
}
