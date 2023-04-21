package com.enbiz.bo.app.dto.response.vendor;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("PartnerDeliveryPolicySearchResponse")
@Getter
@Setter
public class PartnerDeliveryPolicySearchResponse extends BaseCommonEntity {
    private	String	deliPolcNo;	//배송정책번호
    private	String	entrNo;	//협력사번호
    private	String	dlexTypCd;	//배송비형태코드(VD005)
    private	Long	stdAmt;	//기준금액
    private	Long	dlexAmt;	//배송비금액
    private	Long	ferryRgnDlexAmt;	//도서산간배송비
    private	Long	jejuDlex;	//제주도배송비
    private	Long	jejuFerryRgnDlexAmt;	//제주도도서산간배송비
    private	Long	rtnAmt;	//반품비
    private	String	useYn;	//사용여부
    private	String	entrNm;	//협력사명
}
