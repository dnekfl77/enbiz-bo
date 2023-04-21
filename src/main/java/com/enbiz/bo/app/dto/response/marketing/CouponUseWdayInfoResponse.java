package com.enbiz.bo.app.dto.response.marketing;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("CouponUseWdayInfoResponse")
@Getter
@Setter
public class CouponUseWdayInfoResponse extends BaseCommonEntity {
    private String promoNo;
    private String useWdayCd;
}