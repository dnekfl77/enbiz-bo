package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("opClmDcGdBase")
@Getter
@Setter
public class OpClmDcGdBase extends BaseCommonEntity {
    private String clmDcGdNo	    ; 	// 청구할인안내번호
    private String acqrCd	        ; 	// 매입사
    private String aplyStrDtm	    ; 	// 적용시작일시
    private String aplyEndDtm	    ; 	// 적용종료일시
    private Integer payStdAmt	    ; 	// 결제기준금액
    private String fixamtFxrtGbCd	; 	// 정액/정율구분
    private Integer dcRateAmt	    ; 	// 청구할인금액/율
    private Integer maxDcAmt	        ; 	// 최대할인금액
}
