package com.enbiz.bo.app.dto.response.order.orderreception;

import org.apache.ibatis.type.Alias;

import lombok.Getter;
import lombok.Setter;

@Alias("OrderGiftResponse")
@Getter
@Setter
public class OrderGiftResponse {
	private String aeNo;			/* 사은행사번호 */
	private String aeFvrSeq;		/* 사은행사혜택순번 */
	private String addEvtTypCd;	    /* 사은행사유형코드 */
	private String addEvtTypCdNm;	/* 사은행사유형코드명 */
	private String aeNm;			/* 행사명 */
	private String goodsNo;			/* 사은품번호 - 상품번호 */
	private String goodsNm;			/* 사은품명 */
	private String itmNo;			/* 사은품번호 - 단품번호 */
	private String itmNm;			/* 단품명 */
	private Integer stkQty;			/* 재고 */
	private String bdlDeliPsbYn;    /* 묶음배송가능여부 */
	private String deliPolcNo;      /* 배송정책 */
}
