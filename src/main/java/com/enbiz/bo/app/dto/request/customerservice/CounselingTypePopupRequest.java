package com.enbiz.bo.app.dto.request.customerservice;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("CounselingTypePopupRequest")
@Getter
@Setter
public class CounselingTypePopupRequest extends BaseCommonEntity {
    private String cnslTypNm;
    private String custCnslGbCd;
    private String cnslLrgTypNo;
    private String cnslMidTypNo;
    private String cnslSmlTypNo;
    private String rootCnslTypNo;
}
