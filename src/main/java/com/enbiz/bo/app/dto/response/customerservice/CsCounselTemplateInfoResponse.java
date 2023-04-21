package com.enbiz.bo.app.dto.response.customerservice;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("CsCounselTemplateInfoResponse")
@Getter
@Setter
public class CsCounselTemplateInfoResponse extends BaseCommonEntity {
    private String argInsertUpdate;
    private String typeCode;
    private String cnslAempId;
    private String cnslTmplNo;
    private String cnslGbCd;
    private String cnslTypCd;
    private String tmplNm;
    private String tmplCont;
}
