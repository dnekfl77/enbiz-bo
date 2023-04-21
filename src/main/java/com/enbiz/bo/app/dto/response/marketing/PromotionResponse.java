package com.enbiz.bo.app.dto.response.marketing;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("PromotionResponse")
@Getter
@Setter
public class PromotionResponse extends BaseCommonEntity {
    private String promoNo;         //프로모션번호
    private String promoNm;         //프로모션명
    private String promoTypNm;      //프로모션유형명
    private String promoTypCd;      //프로모션유형
    private String promoStatNm;     //프로모션상태명
    private String promoStatCd;     //프로모션상태
    private String fixamtFxrtGbNm;  //정액정율구분명
    private String fixamtFxrtGbCd;  //정액정율구분
    private String dcRateAmt;       //할인액(율)
    private String promoStrDtm;     //프로모션시작일자
    private String promoEndDtm;     //프로모션종료일자
}
