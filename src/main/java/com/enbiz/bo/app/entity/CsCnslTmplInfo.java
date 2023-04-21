package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("CsCnslTmplInfo")
@Getter
@Setter
public class CsCnslTmplInfo extends BaseCommonEntity {
    private String typeCode;
    private String cnslAempId;
    private String cnslTmplNo;
    private String cnslGbCd;
    private String cnslTypCd;
    private String tmplNm;
    private String tmplCont;
}
