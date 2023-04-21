package com.enbiz.bo.app.dto.response.customerservice;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("CounselingTypeResponse")
@Getter
@Setter
public class CounselingTypeResponse extends BaseCommonEntity {
    private Integer level;
    private String cnslTypNo;
    private String cnslTypNm;
    private String useYn;
    private String sortSeq;
    private String custCnslGbCd;
    private String goodsSelMdtyYn;
    private String respBaseMemo;
    private String cnslLrgTypNo;
    private String cnslLrgTypNm;
    private String cnslMidTypNo;
    private String cnslMidTypNm;
    private String cnslSmlTypNo;
    private String cnslSmlTypNm;
    private String uprCnslTypNo;
    private String hierarchy;
    private String hierarchyText;
    private String respBaseMemoData;
}
