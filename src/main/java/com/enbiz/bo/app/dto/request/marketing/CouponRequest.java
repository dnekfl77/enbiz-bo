package com.enbiz.bo.app.dto.request.marketing;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("CouponRequest")
@Getter
@Setter
public class CouponRequest extends BaseCommonEntity {
    private String startType;   // 0 : 전시시작일자 , 1 : 사용시작일자
    private String startDate;   // 시작일자
    private String endDate;     // 종료일자
    private String userId;    // 등록ID
    private String promoTypCd;  // 쿠폰유형
    private String promoStatCd; // 쿠폰상태
    private String promoNo;     // 쿠폰번호
    private String promoNm;     // 쿠폰명
}
