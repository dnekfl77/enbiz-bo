package com.enbiz.bo.app.dto.response.order.orderreception;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("OrderBenefitResponse")
@Getter
@Setter
public class OrderBenefitResponse extends BaseCommonEntity {
    private String  cpnIsuNo;			// 쿠폰발급번호
    private String  promoNo;			// 매체
    private String  promoNm;			// 사이트번호
    private String  promoTypCd;			// 사이트번호
    private String  promoTypNm;			// 사이트번호
    private Integer discountAmt;		// 할인금액
    private String  goodsNo;			// 상품번호
    private String  gOodsNm;			// 상품명
    private String  itmNo;				// 단품번호
    private String  itmNm;				// 단품명
    private Integer salePrc;			    // 판매가
    private Integer ordQty;				// 주문수량
    private String  discountLevel;		// 할인레벨
    private String  overlapCpnYn;       // 중복여부
}
