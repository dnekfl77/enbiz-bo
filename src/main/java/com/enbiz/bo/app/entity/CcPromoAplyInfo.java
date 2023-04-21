package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("ccPromoAplyInfo")
@Getter
@Setter
public class CcPromoAplyInfo extends BaseCommonEntity {

    private String promoNo;
    private String fvrAplyGbCd;
    private String fvrAplyTypCd;
    private String fvrTgtNo;

}
