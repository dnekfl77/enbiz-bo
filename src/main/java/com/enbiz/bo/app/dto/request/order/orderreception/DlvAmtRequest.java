package com.enbiz.bo.app.dto.request.order.orderreception;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("DlvAmtRequest")
@Getter
@Setter
public class DlvAmtRequest extends BaseCommonEntity {
	//주문 정보
	private String goodsNo;      // 상품번호
	private String goodsNm;      // 상품명
	private String itmNo;        // 단품번호
	private String itmNm;        // 단품명
	private Integer salePrc;     // 판매가
	private Integer ordQty;      // 주문수량
	private Integer discountAmt; // 할인금액
	private String deliPolcNo;   // 배송정책
	private String bdlDeliPsbYn; // 묶음배송여부
	private String zipNoSeq;	 // 우편번호 순번
	private String zipNo;		 // 우편번호
	private String dlvpAddr;	 // 주소
	private String mbrDlvpSeq;	 //
}
