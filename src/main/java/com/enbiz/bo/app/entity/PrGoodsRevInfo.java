package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * 상품리뷰정보
 */
@Alias("PrGoodsRevInfo")
@Getter
@Setter
public class PrGoodsRevInfo extends BaseCommonEntity{

    private String revNo                  ; // 리뷰번호
    private String siteNo                 ; // 사이트번호
    private String mbrNo                  ; // 회원번호
    private String loginId                ; // 회원아이디
    private String goodsNo                ; // 상품번호
    private String stdCtgNo               ; // 표준카테고리번호
    private String ordNo                  ; // 주문번호
    private String ordSeq                 ; // 주문순번
    private String revTypCd               ; // 리뷰유형코드(PR036)
    private String revGbCd                ; // 리뷰구분코드(PR021)
    private String revWrtDtm              ; // 리뷰작성일시
    private String revCont                ; // 리뷰내용
    private Integer revScrVal             ; // 리뷰별점
    private String stfd1Yn                ; // 만족도1여부
    private String stfd2Yn                ; // 만족도2여부
    private String stfd3Yn                ; // 만족도3여부
    private String frstRevYn              ; // 최초리뷰여부
    private String buyMembYn              ; // 구매회원여부
    private String revDispStatCd          ; // 리뷰전시상태코드(PR022)
    private String photoDispStatCd        ; // 사진전시상태코드(PR022)
    private String dispProcDtm            ; // 전시처리일시
    private String dispProcmnId           ; // 전시처리자ID
    private Integer hlpfulCnt             ; // 도움돼요수
    private String delYn                  ; // 삭제여부

}
