package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * 상품리뷰평가 Entity
 */
@Alias("PrGoodsRevEvlt")
@Getter
@Setter
public class PrGoodsRevEvlt extends BaseCommonEntity{

    private String revNo           ; // 리뷰번호
    private String evltItemNo      ; // 평가항목번호
    private String evltValNo       ; // 평가값번호
    private String evltItemNm      ; // 평가항목명
    private String evltVal         ; // 평가값
    private String ansCont         ; // 답변내용
    private String stdCtgNo        ; // 표준카테고리번호

}
