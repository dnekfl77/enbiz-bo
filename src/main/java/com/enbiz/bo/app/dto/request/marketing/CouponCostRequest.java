package com.enbiz.bo.app.dto.request.marketing;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("CouponCostRequest")
@Getter
@Setter
public class CouponCostRequest extends BaseCommonEntity {
    private String startDate;
    private String endDate;
    private String sysRegId;
    private String promoTypCd;
    private String promoStatCd;
    private String promoNo;
    private String promoNm;
    private String ordNo;
    private String userId;
}
