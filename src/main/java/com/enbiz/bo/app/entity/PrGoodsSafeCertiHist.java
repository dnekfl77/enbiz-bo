package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * 상품안전인증이력
 */
@Alias("PrGoodsSafeCertiHist")
@Getter
@Setter
public class PrGoodsSafeCertiHist extends BaseCommonEntity{

    private String goodsNo             ; // 상품번호
    private String safeCertiGbCd       ; // 안전인증구분코드
    private String safeCertiNo         ; // 안전인증번호
    private String aplyStrDt           ; // 적용시작일자
    private String aplyEndDt           ; // 적용종료일자
    private String safeCertiOrnNm      ; // 안전인증기관명
    
}
