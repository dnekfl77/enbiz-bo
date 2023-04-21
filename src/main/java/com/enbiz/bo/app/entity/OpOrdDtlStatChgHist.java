package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("opOrdDtlStatChgHist")
@Getter
@Setter
public class OpOrdDtlStatChgHist extends BaseCommonEntity {

    private String ordNo;
    private String ordSeq;
    private String chgDtm;
    private String ordDtlStatCd;

}
