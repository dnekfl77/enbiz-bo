package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * 상품QA답변 템플릿정보
 */
@Alias("PrGoodsQaAnsTmplInfo")
@Getter
@Setter
public class PrGoodsQaAnsTmplInfo extends BaseCommonEntity {

    private String ansTmplNo       ; // 답변템플릿번호
    private String ansTmplNm       ; // 답변템플릿명
    private String ansTmplCont     ; // 답변템플릿내용
    private String useYn           ; // 사용여부

}
