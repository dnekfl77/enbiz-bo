package com.enbiz.bo.app.dto.response.marketing;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("AppreciateDetailResponse")
@Getter
@Setter
public class AppreciateDetailResponse extends BaseCommonEntity {
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
    private List<String> aplyPsbMediaCd = new ArrayList<>(); // 적용가능매체코드
    private String mbrTypCd;             // 회원유형코드
    private String tmEvtYn;              // 타임행사여부
    private String aplyStrTm;            // 적용시작시간
    private String aplyEndTm;            // 적용종료시간
    private List<AppreciateFvrInfoResponse> aeFvrInfo = new ArrayList<>();   // 지급사은품

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
