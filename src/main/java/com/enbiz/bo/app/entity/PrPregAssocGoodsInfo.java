package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("PrPregAssocGoodsInfo")
@Getter
@Setter
public class PrPregAssocGoodsInfo extends BaseCommonEntity {

    private String  pregGoodsNo       ;     //   가등록상품번호
    private String  asctGoodsNo       ;     //   연관상품번호
    private String  asctGbCd          ;     //   연관구분코드(PR016)
    private Integer sortSeq           ;     //   정렬순서

}
