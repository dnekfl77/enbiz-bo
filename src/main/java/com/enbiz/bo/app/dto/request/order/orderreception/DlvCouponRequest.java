package com.enbiz.bo.app.dto.request.order.orderreception;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("DlvCouponRequest")
@Getter
@Setter
public class DlvCouponRequest extends BaseCommonEntity {
    private String mbrNo;
    private String promoTypCd;
}
