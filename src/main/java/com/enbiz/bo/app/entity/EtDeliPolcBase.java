package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * 배송정책기본
 */
@Alias("EtDeliPolcBase")
@Getter
@Setter
public class EtDeliPolcBase extends BaseCommonEntity {
    private	String	deliPolcNo;	                //  배송정책번호
    private	String	entrNo;	                    //  협력사번호
    private	String	dlexTypCd;	                //  배송비형태코드(VD005)
    private	Integer	stdAmt;	                    //  기준금액
    private	Integer	dlexAmt;	                //  배송비금액
    private	Integer	ferryRgnDlexAmt;	        //  도서산간배송비
    private	Integer	jejuDlex;	                //  제주도배송비
    private	Integer	jejuFerryRgnDlexAmt;	    //  제주도도서산간배송비
    private	Integer	rtnAmt;	                    //  반품비
    private	String	useYn;	                    //  사용여부
}
