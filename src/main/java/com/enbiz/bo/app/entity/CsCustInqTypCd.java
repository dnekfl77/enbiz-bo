package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("CsCustInqTypCd")
@Getter
@Setter
public class CsCustInqTypCd extends BaseCommonEntity {
    private String custInqTypCd;
    private String custInqTypNm;
    private Integer sortSeq;
    private String useYn;
    private String ordGoodsMdtyYn;
    private String ansSubCd;
    private String cnslTypNo;
    private String uprCustInqTypCd;
}
