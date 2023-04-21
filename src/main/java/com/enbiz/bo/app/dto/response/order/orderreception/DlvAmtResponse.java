package com.enbiz.bo.app.dto.response.order.orderreception;

import java.util.Objects;

import org.apache.ibatis.type.Alias;

import lombok.Getter;
import lombok.Setter;

@Alias("DlvAmtResponse")
@Getter
@Setter
public class DlvAmtResponse {
	private String dlvpAddr;	           // 주소지명
	private String mbrDlvpSeq;	           // 주소지명
	private String zipNo;	               // 우편번호
	private String entrNo;				   // 협력사번호
	private String entrNm;				   // 협력사명
	private String goodsNmTitle;		   // 적용상품 노출명(상품 외 3건)
	private String goodsNoList;			   // 적용상품 전체
	private Integer ordAmt;				   // 주문금액
	private String bdlDeliPsbYn;           // 묶음배송여부
	private String deliPolcNo;             // 배송정책
	private	String	dlexTypCd;	           //  배송비형태코드(VD005)
	private	String	dlexTypCdNm;	       //  배송비형태코드명
	private	Integer	stdAmt;	               //  기준금액
	private	Integer	dlexAmt;	           //  배송비금액
	private	Integer	ferryRgnDlexAmt;	   //  도서산간배송비
	private	Integer	jejuDlex;	           //  제주도배송비
	private	Integer	jejuFerryRgnDlexAmt;   //  제주도도서산간배송비
	private Integer ordDeliAmt;            //  주문 배송비
	private Integer hiddenOrdDeliAmt;      //  주문 배송비 (노출 X)

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;
		DlvAmtResponse that = (DlvAmtResponse) o;
		return Objects.equals(dlvpAddr, that.dlvpAddr) && Objects.equals(mbrDlvpSeq, that.mbrDlvpSeq) && Objects.equals(zipNo, that.zipNo) && Objects.equals(entrNo, that.entrNo) && Objects.equals(entrNm, that.entrNm) && Objects.equals(goodsNmTitle, that.goodsNmTitle) && Objects.equals(goodsNoList, that.goodsNoList) && Objects.equals(ordAmt, that.ordAmt) && Objects.equals(bdlDeliPsbYn, that.bdlDeliPsbYn) && Objects.equals(deliPolcNo, that.deliPolcNo) && Objects.equals(dlexTypCd, that.dlexTypCd) && Objects.equals(dlexTypCdNm, that.dlexTypCdNm) && Objects.equals(stdAmt, that.stdAmt) && Objects.equals(dlexAmt, that.dlexAmt) && Objects.equals(ferryRgnDlexAmt, that.ferryRgnDlexAmt) && Objects.equals(jejuDlex, that.jejuDlex) && Objects.equals(jejuFerryRgnDlexAmt, that.jejuFerryRgnDlexAmt) && Objects.equals(ordDeliAmt, that.ordDeliAmt) && Objects.equals(hiddenOrdDeliAmt, that.hiddenOrdDeliAmt);
	}

	@Override
	public int hashCode() {
		return Objects.hash(dlvpAddr, mbrDlvpSeq, zipNo, entrNo, entrNm, goodsNmTitle, goodsNoList, ordAmt, bdlDeliPsbYn, deliPolcNo, dlexTypCd, dlexTypCdNm, stdAmt, dlexAmt, ferryRgnDlexAmt, jejuDlex, jejuFerryRgnDlexAmt, ordDeliAmt, hiddenOrdDeliAmt);
	}
}