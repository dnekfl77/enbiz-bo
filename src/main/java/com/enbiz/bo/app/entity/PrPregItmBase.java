package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.annotation.EmptyToNull;
import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * 가등록 단품기본
 */
@Alias("PrPregItmBase")
@Getter
@Setter
public class PrPregItmBase extends BaseCommonEntity {

    private String pregGoodsNo        ;     //    가등록상품번호
    private String itmNo              ;     //    단품번호
    private Integer stkQty            ;     //    재고수량

    @EmptyToNull
    private String lgcItmNo           ;     //    기간계단품번호

    @EmptyToNull
    private String soutCausCd         ;     //    품절사유코드(PR032)

    private String soutNotiYn         ;     //    품절알림여부
    private Integer soutNotiStdQty    ;     //    품절알림기준수량

    @EmptyToNull
    private String optnCatNo1         ;     //    옵션분류번호_1

    @EmptyToNull
    private String optnCatNm1         ;     //    옵션분류명_1

    @EmptyToNull
    private String optnNo1            ;     //    옵션번호_1

    @EmptyToNull
    private String optnNm1            ;     //    옵션명_1

    @EmptyToNull
    private String optnCatNo2         ;     //    옵션분류번호_2

    @EmptyToNull
    private String optnCatNm2         ;     //    옵션분류명_2

    @EmptyToNull
    private String optnNo2            ;     //    옵션번호_2

    @EmptyToNull
    private String optnNm2            ;     //    옵션명_2

    @EmptyToNull
    private String optnCatNo3         ;     //    옵션분류번호_3

    @EmptyToNull
    private String optnCatNm3         ;     //    옵션분류명_3

    @EmptyToNull
    private String optnNo3            ;     //    옵션번호_3

    @EmptyToNull
    private String optnNm3            ;     //    옵션명_3

    @EmptyToNull
    private String optnCatNo4         ;     //    옵션분류번호_4

    @EmptyToNull
    private String optnCatNm4         ;     //    옵션분류명_4

    @EmptyToNull
    private String optnNo4            ;     //    옵션번호_4

    @EmptyToNull
    private String optnNm4            ;     //    옵션명_4

    @EmptyToNull
    private String optnCatNo5         ;     //    옵션분류번호_5

    @EmptyToNull
    private String optnCatNm5         ;     //    옵션분류명_5

    @EmptyToNull
    private String optnNo5            ;     //    옵션번호_5

    @EmptyToNull
    private String optnNm5            ;     //    옵션명_5

}
