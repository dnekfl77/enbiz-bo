package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("stUsrWkLog")
@Getter
@Setter
public class StUsrWkLog extends BaseCommonEntity {

    private String usrId;
    private String usrIpAddr;
    private String sessId;
    private String rtTgtSeq;
    private String prsnInfoYn;
    private String wkUrlAddr;
    private String PrmtInfo;

}
