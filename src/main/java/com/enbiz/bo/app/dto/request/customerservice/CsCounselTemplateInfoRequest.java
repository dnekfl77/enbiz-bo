package com.enbiz.bo.app.dto.request.customerservice;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("CsCounselTemplateInfoRequest")
@Getter
@Setter
public class CsCounselTemplateInfoRequest extends BaseCommonEntity {
    private String argSelectType;     // 선택구분 ( 1 : 단일 , N : 다중 )
    private String argInsertUpdate;
    private String typeCode;          // 텝 구분 (공통 : common, 개인 : alone)

    private String cnslAempId;
    private String cnslAempNm;
    private String cnslTmplNo;
    private String cnslGbCd;
    private String cnslTypCd;
    private String tmplNm;
    private String tmplCont;
    private String userId;
}
