package com.enbiz.bo.app.dto.request.marketing;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("PromotionRequest")
@Getter
@Setter
public class PromotionRequest extends BaseCommonEntity {
    private String startDate;   // 시작일자
    private String endDate;     // 종료일자
    private String userId;      // 등록ID
    private String promoTypCd;  // 프로모션유형
    private String promoStatCd; // 프로모션상태
    private String promoNo;     // 프로모션번호
    private String promoNm;     // 프로모션명
}
