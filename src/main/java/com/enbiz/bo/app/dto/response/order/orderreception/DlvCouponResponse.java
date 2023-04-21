package com.enbiz.bo.app.dto.response.order.orderreception;

import org.apache.ibatis.type.Alias;

import lombok.Getter;
import lombok.Setter;

@Alias("DlvCouponResponse")
@Getter
@Setter
public class DlvCouponResponse {
	private String cpnIsuNo;	//쿠폰발급번호
	private String promoNm;		//프로모션명: 유효종료일(yyyy-mm-dd)
}
