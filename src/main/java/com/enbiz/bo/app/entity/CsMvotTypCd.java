package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("CsMvotTypCd")
@Getter
@Setter
public class CsMvotTypCd extends BaseCommonEntity {
    private	String csMvotTypNo;
    private	String csMvotTypNm;
    private	String csTypDesc;
    private	String useYn;
    private	String tmplMemo;
}
