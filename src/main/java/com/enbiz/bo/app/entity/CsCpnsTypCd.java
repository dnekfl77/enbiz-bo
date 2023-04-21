package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("CsCpnsTypCd")
@Getter
@Setter
public class CsCpnsTypCd extends BaseCommonEntity {

    private String cpnsTypNo;
    private String cpnsTypNm;
    private String useYn;
    private Integer sortSeq;
    private String cpnsSubCd;
    private String cpnsStdCd;
    private String cpnsStdRate;
    private Integer maxPayLim;
    private String cpnsStdDesc;
    private String uprCpnsTypCd;

}
