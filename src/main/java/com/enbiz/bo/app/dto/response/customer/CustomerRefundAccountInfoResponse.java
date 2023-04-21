package com.enbiz.bo.app.dto.response.customer;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.masking.MaskString;
import com.enbiz.common.base.masking.MaskingType;

import lombok.Getter;
import lombok.Setter;

@Alias("CustomerRefundAccountInfoResponse")
@Getter
@Setter
public class CustomerRefundAccountInfoResponse {
    private	String mbrNo;	            //회원번호
    private	String rfdBankCd;	        //환불은행코드(OM026)
    @MaskString(type = MaskingType.ACTN)
    private	String rfdActnNo;	        //환불계좌번호
    @MaskString(type = MaskingType.NAME_KR)
    private	String rfdActnDepositorNm;	//환불계좌예금주명
    private	String rfdActnCertiYn;	    //환불계좌인증여부

    private String rfdBankNm;           //환불은행명(OM026)
}
