package com.enbiz.bo.app.dto.response.marketing;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("CouponExcelMbrResponse")
@Getter
@Setter
public class CouponExcelMbrResponse extends BaseCommonEntity {
    String mbrNo;
    String mbrNm;
    String loginId;
    String mbrGradeCd;
    String mbrGradeNm;
}
