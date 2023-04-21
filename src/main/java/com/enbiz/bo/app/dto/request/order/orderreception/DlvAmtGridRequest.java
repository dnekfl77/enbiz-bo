package com.enbiz.bo.app.dto.request.order.orderreception;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("DlvAmtGridRequest")
@Getter
@Setter
public class DlvAmtGridRequest extends BaseCommonEntity {
	private static final long serialVersionUID = 1L;
	//주문 정보
	private String mbrNo;			//회원번호
	private String mbrDlvpSeq;		//회원배송지순번
	private String dlvpAddr;		//회원배송지명
	private String entrNo;			//협력사번호
	private String entrNm;			//협력사명
	private String deliPolcNo;		//배송정책번호
	private String goodsNo;			//상품번호(GOODS_NO)
	private String goodsNm;			//상품명(GOODS_NM)
	private String bdlDeliPsbYn;	//묶음배송가능여부
	private String deliWayCd;		//배송수단코드(PR009)(01:택배배송, 02:무배송)
	private String deliProcTypCd;	//배송처리유형코드(PR008)(10:센터배송, 20:업체배송)
	private String zipNo;			//배송지 우편번호
	private String ordQty;			//주문수량
}
