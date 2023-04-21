package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * 가등록 단품옵션정보
 */
@Alias("PrPregItmOptnInfo")
@Getter
@Setter
public class PrPregItmOptnInfo extends BaseCommonEntity {

    private String pregGoodsNo    ;     //  가등록상품번호
    private String optnCatNo      ;     //  옵션분류번호
    private String optnCatNm      ;     //  옵션분류명
    private String optnNo         ;     //  옵션번호
    private String optnNm         ;     //  옵션명

}
