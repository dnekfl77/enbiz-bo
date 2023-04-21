package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("ccPromoUseWdayInfo")
@Getter
@Setter
public class CcPromoUseWdayInfo extends BaseCommonEntity {
    private String promoNo;
    private String useWdayCd;
}
