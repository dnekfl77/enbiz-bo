package com.enbiz.bo.app.dto.response.adjust;

import org.apache.ibatis.type.Alias;

import com.enbiz.bo.app.entity.BaseCommonDto;

import lombok.Getter;
import lombok.Setter;

@Alias("VendorCommissionResponse")
@Getter
@Setter
public class VendorCommissionResponse extends BaseCommonDto {
	private String entrNm;		//업체
	private String norPrc;		//정상금액
	private String salePrc;		//판매금액
	private String cpnSum;		//쿠폰금액
	private String cpnSumEntr;	//쿠폰분담금
	private String paySum;		//BO결제금액
	private String payPg;		//PG결제금액
	private String payMilg;		//마일리지
	private String payEm;		//e-money
	private String payHp;		//H.Point
	private String dlexEntr;	//택배비
	private String cmsnPrc;		//매출수수료
	private String entrPrc;		//지급예정금액
}