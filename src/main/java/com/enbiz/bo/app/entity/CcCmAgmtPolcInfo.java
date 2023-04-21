package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("ccCmAgmtPolcInfo")
@Getter
@Setter
public class CcCmAgmtPolcInfo extends BaseCommonEntity {
    private String cmAgmtSeq;
    private String siteNo;
    private String agmtPolcCd;
    private String aplyStrDt;
    private String aplyEndDt;
    private String cmAgmtPolcGbCd;
    private String title;
    private String wrdCont;
}
