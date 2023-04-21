package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("EtMbrRfdActnInfo")
@Getter
@Setter
public class EtMbrRfdActnInfo extends BaseCommonEntity {
    private	String mbrNo;	            //회원번호
    private	String rfdBankCd;	        //환불은행코드(OM026)
    private	String rfdActnNo;	        //환불계좌번호
    private	String rfdActnDepositorNm;	//환불계좌예금주명
    private	String rfdActnCertiYn;	    //환불계좌인증여부
}
