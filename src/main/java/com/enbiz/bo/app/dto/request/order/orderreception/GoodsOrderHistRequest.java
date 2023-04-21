package com.enbiz.bo.app.dto.request.order.orderreception;


import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("GoodsOrderHistRequest")
@Getter
@Setter
public class GoodsOrderHistRequest extends BaseCommonEntity {
	private String mbrNo;				//회원번호
	private String ordFnshStartDtm;		//주문일자 시작일
	private String ordFnshEndDtm;		//주문일자 종료일
	private String periodYn;		//주문일자 종료일
}
