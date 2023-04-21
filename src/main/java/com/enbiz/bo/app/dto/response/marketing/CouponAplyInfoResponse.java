package com.enbiz.bo.app.dto.response.marketing;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("CouponAplyInfoResponse")
@Getter
@Setter
public class CouponAplyInfoResponse extends BaseCommonEntity {

    private String promoNo;
    private String fvrAplyGbCd;
    private String fvrAplyTypCd;
    private String fvrTgtNo;
    private String fvrTgtNm;

}