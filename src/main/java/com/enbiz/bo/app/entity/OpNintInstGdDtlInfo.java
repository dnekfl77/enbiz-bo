package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("opNintInstGdDtlInfo")
@Getter
@Setter
public class OpNintInstGdDtlInfo extends BaseCommonEntity {
    private String nintInstGdNo	    ; 	// 일련번호
    private Integer tgtAmt	        ; 	// 대상금액
    private String nint2MonYn	    ; 	// 무이자2개월여부
    private String nint3MonYn	    ; 	// 무이자3개월여부
    private String nint4MonYn	    ; 	// 무이자4개월여부
    private String nint5MonYn	    ; 	// 무이자5개월여부
    private String nint6MonYn	    ; 	// 무이자6개월여부
    private String nint7MonYn	    ; 	// 무이자7개월여부
    private String nint8MonYn	    ; 	// 무이자8개월여부
    private String nint9MonYn	    ; 	// 무이자9개월여부
    private String nint10MonYn	    ; 	// 무이자10개월여부
    private String nint11MonYn	    ; 	// 무이자11개월여부
    private String nint12MonYn	    ; 	// 무이자12개월여부
}
