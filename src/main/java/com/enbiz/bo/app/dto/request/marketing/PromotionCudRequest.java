package com.enbiz.bo.app.dto.request.marketing;

import java.util.List;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("PromotionCudRequest")
@Getter
@Setter
public class PromotionCudRequest extends BaseCommonEntity {
    //======기본정보======//
    private String promoNo;              // 프로모션번호
    private String promoNm;              // 프로모션명
    private String promoTypCd;           // 프로모션유형
    private String promoStatCd;          // 프로모션상태
    private String promoStrDtm;          // 전시 시작 일시
    private String promoEndDtm;          // 전시 종료 일시
    private String promoDesc;            // 프로모션설명

    //======프로모션 혜택======//
    private String cardcoCd;             // 카드사코드
    private List<String> aplyPsbMediaCd; // 적용가능매체코드
    private String mbrGradeCd;           // 회원등급코드
    private String mbrUprGradeAplyYn;    // 회원상위등급적용여부
    private String fixamtFxrtGbCd;       // 정액정률구분코드 ( 01 : 정액 , 02 : 정율 )
    private Integer dcRateAmt;           // 할인율금액
    private Integer minBuyAmt;           // 최소구매금액
    private Integer maxDcAmt;            // 최대할인금액

    //======적용대상======//
    private List<String> aplySites;      // 사이트
    private List<String> aplyGoods;      // 상품
    private List<String> aplyStdGoods;   // 표준상품분류
    private List<String> aplyCategory;   // 전시카테고리
    private List<String> aplyBrand;      // 브랜드
    private List<String> aplyEntr;       // 협력사
    private List<String> aplyChannel;    // 채널

    //======제외대상======//
    private List<String> exceptGoods;      // 상품
    private List<String> exceptStdGoods;   // 표준상품분류
}
