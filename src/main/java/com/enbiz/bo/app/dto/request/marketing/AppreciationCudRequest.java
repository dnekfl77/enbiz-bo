package com.enbiz.bo.app.dto.request.marketing;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("AppreciationCudRequest")
@Getter
@Setter
public class AppreciationCudRequest extends BaseCommonEntity {
    //======기본정보======//
    private String aeNo;              // 사은행사번호
    private String aeNm;              // 사은행사명
    private String addEvtTypCd;       // 사은행사유형
    private String aePrgsStatCd;      // 사은행사상태
    private String aeDesc;            // 사은행사설명


    //======사은행사 지급설정======//
    private String aeStrDtm;             // 사은행사시작날짜
    private String aeEndDtm;             // 사은행사종료날짜
    private String payStrDt;             // 지급시작날짜
    private String payEndDt;             // 지급종료날짜
    private List<String> aplyPsbMediaCd; // 적용가능매체코드
    private String mbrTypCd;             // 회원유형코드
    private String tmEvtYn;              // 타임행사여부
    private String aplyStrTm;            // 적용시작시간
    private String aplyEndTm;            // 적용종료시간
    private List<Map<String,String>> aeFvrInfo;   // 지급사은품

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
