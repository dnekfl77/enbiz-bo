package com.enbiz.bo.app.dto.request.order.orderreception;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("OrderBenefitRequest")
@Getter
@Setter
public class OrderBenefitRequest extends BaseCommonEntity {
    private String mbrNo;				// 회원번호
    private String media;				// 매체
    private String siteNo;				// 사이트번호
    private String chlNo;				// 사이트번호
    private String[] goodsInfoList;	// 상품정보 리스트
    private String[] promotionList; // 프로모션 리스트
}
