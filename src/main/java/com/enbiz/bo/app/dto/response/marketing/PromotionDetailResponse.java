package com.enbiz.bo.app.dto.response.marketing;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("PromotionDetailResponse")
@Getter
@Setter
public class PromotionDetailResponse extends BaseCommonEntity {

    //======기본정보======//
    private String promoNo;              // 쿠폰번호
    private String promoNm;              // 쿠폰명
    private String promoTypCd;           // 쿠폰유형
    private String promoStatCd;          // 쿠폰상태
    private String promoStrDtm;          // 전시 시작 일시
    private String promoEndDtm;          // 전시 종료 일시
    private String promoDesc;            // 프로모션설명

    //======쿠폰혜택======//
    private String issuSubCd;            // 발급주체코드
    private String issuLmtYn;            // 발급제한여부
    private Integer issuQty = 0;         // 발급수량
    private List<String> aplyPsbMediaCd = new ArrayList<>(); // 적용가능매체코드
    private String mbrGradeCd;           // 회원등급코드
    private String mbrUprGradeAplyYn;    // 회원상위등급적용여부
    private String cardcoCd;             // 카드사코드
    private String issuMethCd;           // 발급방식코드 ( 01 : 대상자지정발급 , 02 : 조건부자동발급, 03 : 고객다운로드 발급 )
    private String autoIssuTypCd;        // 자동발급유형코드
    private String autoIssuPotmCd;       // 자동발급시점코드
    private Integer anvyBeIssuDaynub;    // 기념일선발행일수
    private String cpbookDispYn;         // 쿠폰북전시여부
    private String dcCpbookCd;           // 할인쿠폰북코드
    private String aplyTermGbCd;         // 적용기간구분코드 ( 01 : 기간기준 , 02 : 발급일 기준 )
    private Integer issuDdStdCpnUseDds;  // 발급일기준쿠폰사용일수
    private String usePsbStrDt;          // 사용가능시작일자
    private String usePsbEndDt;          // 사용가능종료일자
    private List<String> useWdayCd = new ArrayList<>();      // 사용요일코드
    private String tmCpnYn;              // 타임쿠폰여부
    private String usePsbStrTm;          // 사용가능시작시간
    private String usePsbEndTm;          // 사용가능종료시간
    private String fixamtFxrtGbCd;       // 정액정률구분코드 ( 01 : 정액 , 02 : 정율 )
    private Integer dcRateAmt;           // 할인율금액
    private Integer minBuyAmt;           // 최소구매금액
    private Integer maxDcAmt;            // 최대할인금액

    //======적용대상======//
    private List<Map<String,String>> aplySites = new ArrayList<>();      // 사이트
    private List<Map<String,String>> aplyGoods = new ArrayList<>();      // 상품
    private List<Map<String,String>> aplyStdGoods = new ArrayList<>();   // 표준상품분류
    private List<Map<String,String>> aplyCategory = new ArrayList<>();   // 전시카테고리
    private List<Map<String,String>> aplyBrand = new ArrayList<>();      // 브랜드
    private List<Map<String,String>> aplyEntr = new ArrayList<>();       // 협력사
    private List<Map<String,String>> aplyChannel = new ArrayList<>();    // 채널

    //======제외대상======//
    private List<Map<String,String>> exceptGoods = new ArrayList<>();      // 상품
    private List<Map<String,String>> exceptStdGoods = new ArrayList<>();   // 표준상품분류
}
