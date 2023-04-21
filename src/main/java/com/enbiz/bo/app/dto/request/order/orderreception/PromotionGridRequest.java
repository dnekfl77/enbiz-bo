package com.enbiz.bo.app.dto.request.order.orderreception;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("PromotionGridRequest")
@Getter
@Setter
public class PromotionGridRequest extends BaseCommonEntity {
	private static final long serialVersionUID = 1L;
	//주문 정보
	private String mbrNo;				//회원번호
	private String goodsNo;				// 상품번호(GOODS_NO)
	private String goodsNm;				// 상품명(GOODS_NM)
	private String itmNo;				// 단품번호
	private String deliPolcNo;			// 배송정책번호
	private String siteNo;				// 사이트번호
	private String dispCtgNo;			// 전시카테고리
	private String stdCtgNo;			// 표준카테고리번호(표준상품분류)
	private String entrNo;				// 협력사번호
	private String brandNo;				// 브랜드번호
	private String chlNo="1000120";		// 채널번호(Backoffice)
	private String salePrc;				// 판매가
	private String ordQty;				// 주문수량
}
