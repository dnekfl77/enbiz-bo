package com.enbiz.bo.app.dto.request.order.orderreception;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("GoodsKeyWordRequest")
@Getter
@Setter
public class GoodsKeyWordRequest extends BaseCommonEntity {

	private String stdLrgCtgNo;		//표준상품분류
	private String saleStatCd;		//판매상태
	private String goodsNo;			//상품번호
	private String entrNo;			//협력사번호
	private String goodsNm;			//상품명
	private String dispCtgNo;		//전시카테고리
	private String mbrNo;			//회원ID
}
