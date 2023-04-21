package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("CsCnslTypInfo")
@Getter
@Setter
public class CsCnslTypInfo extends BaseCommonEntity {
    private String cnslTypNo;
    private String cnslTypNm;
    private String useYn;
    private Integer sortSeq;
    private String custCnslGbCd;
    private String goodsSelMdtyYn;
    private String respBaseMemo;
    private String cnslLrgTypNo;
    private String cnslMidTypNo;
    private String cnslSmlTypNo;
    private String uprCnslTypNo;
}
