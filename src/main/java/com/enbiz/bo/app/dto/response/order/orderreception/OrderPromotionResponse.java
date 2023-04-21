package com.enbiz.bo.app.dto.response.order.orderreception;

import org.apache.ibatis.type.Alias;

import lombok.Getter;
import lombok.Setter;

@Alias("OrderPromotionResponse")
@Getter
@Setter
public class OrderPromotionResponse {
	private String promoTypCdNm;//프로모션유형코드명(MK002)(11:상품할인쿠폰, 12:장바구니쿠폰, 13:중복할인쿠폰, 14:무료배송쿠폰, 15:무료반품쿠폰, 20:임직원할인, 30:카드사할인, 40:상품적립금)
	private String overlapCpnYn;//중복여부
	private String promoNm;		//프로모션명/카드사코드명
	private String discountAmt;	//할인가
	private String goodsNm;		//상품명
	private String itmNm;		//단품명
	private String salePrc;		//판매가
	private String ordQty;		//구매수량

	private String promoNo;		//프로모션번호
	private String cpnIsuNo;	//쿠폰발급번호
	private String promoTypCd;	//프로모션유형코드(MK002)
	private String cardcoCd;	//카드사코드(OM027)
	private String goodsNo;		//상품번호
	private String itmNo;		//단품번호
}
