package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("CsObTypCd")
@Getter
@Setter
public class CsObTypCd extends BaseCommonEntity {
    private String obTypNo;
    private String obTypNm;
    private String obTypDesc;
    private String useYn;
    private String cnslTypNo;
}
