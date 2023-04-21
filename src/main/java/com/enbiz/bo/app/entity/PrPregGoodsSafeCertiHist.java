package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.annotation.EmptyToNull;
import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * 가등록 상품안전인증 이력
 */
@Alias("PrPregGoodsSafeCertiHist")
@Getter
@Setter
public class PrPregGoodsSafeCertiHist extends BaseCommonEntity {

    private String pregGoodsNo          ;   //  가등록상품번호
    private String safeCertiGbCd        ;   //  안전인증구분코드(PR026)
    private String safeCertiNo          ;   //  안전인증번호
    private String aplyStrDt            ;   //  적용시작일자
    private String aplyEndDt            ;   //  적용종료일자

    @EmptyToNull
    private String safeCertiOrnNm       ;   //  안전인증기관명

}
