package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("ccAeAplyMediaInfo")
@Getter
@Setter
public class CcAeAplyMediaInfo extends BaseCommonEntity {
    private String aeNo;            //사은행사번호
    private String aplyPsbMediaCd;  //적용가능매체코드 (MK004)
}
