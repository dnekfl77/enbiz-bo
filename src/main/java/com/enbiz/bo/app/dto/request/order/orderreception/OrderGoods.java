package com.enbiz.bo.app.dto.request.order.orderreception;

import lombok.Getter;
import lombok.Setter;

/**
 * 주문상품 정보
 * @author bisop
 *
 */
@Getter
@Setter
public class OrderGoods {
	private String goodsNo;		// 상품번호(GOODS_NO)
	private String goodsNm;		// 상품명(GOODS_NM)
	private String deliPolcNo;	// 배송정책번호
	private String ordQty;		// 주문수량
}