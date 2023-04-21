package com.enbiz.bo.app.dto.request.order.orderreception;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderGiftGridRequest extends BaseCommonEntity {
	//주문상품 정보
	private String siteNo;			/* 사이트번호(SITE_NO) */
	private String goodsNo;			/* 상품번호(GOODS_NO) */
	private String dispCtgNo;		/* 전시카테고리번호(DISP_CTG_NO) */
	private String stdCtgNo;		/* 표준카테고리번호(STD_CTG_NO) */
	private String entrNo;			/* 협력사번호(ENTR_NO) */
	private String brandNo;			/* 브랜드번호(BRAND_NO) */
	private String chlNo;			/* 채널번호(CHL_NO) */
}
