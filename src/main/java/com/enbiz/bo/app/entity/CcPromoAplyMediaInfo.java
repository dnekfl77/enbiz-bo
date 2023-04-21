package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("ccPromoAplyMediaInfo")
@Getter
@Setter
public class CcPromoAplyMediaInfo extends BaseCommonEntity {
    private String promoNo;
    private String aplyPsbMediaCd;
}
