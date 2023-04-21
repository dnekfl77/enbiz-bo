package com.enbiz.bo.app.dto.response.marketing;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("CouponResponse")
@Getter
@Setter
public class CouponResponse extends BaseCommonEntity {
    private String promoNo;         //쿠폰번호
    private String promoNm;         //쿠폰명
    private String promoTypNm;      //쿠폰유형명
    private String promoTypCd;      //쿠폰유형
    private String promoStatNm;     //쿠폰상태명
    private String promoStatCd;     //쿠폰상태
    private String fixamtFxrtGbNm;  //정액정율구분명
    private String fixamtFxrtGbCd;  //정액정율구분
    private String dcRateAmt;       //할인액(율)
    private String promoStrDtm;     //전시시작일자
    private String promoEndDtm;     //전시시작일자
    private String usePsbStrDt;     //사용시작일자
    private String usePsbEndDt;     //사용종료일자
//    private String sysRegId;        //등록자
//    private String sysRegDtm;       //등록일시
}
