package com.enbiz.bo.app.dto.response.marketing;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("CouponAplyMediaResponse")
@Getter
@Setter
public class CouponAplyMediaResponse extends BaseCommonEntity {
    private String promoNo;
    private String aplyPsbMediaCd;
}

