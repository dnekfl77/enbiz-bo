package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("PrPregGoodsContInfo")
@Getter
@Setter
public class PrPregGoodsContInfo extends BaseCommonEntity {

    private String pregGoodsNo        ;     //  가등록상품번호
    private String cmtTypCd           ;     //  컨텐츠유형코드(PR017)
    private String cmtSerialNo        ;     //  컨텐츠일련번호
    private String goodsDtlDesc       ;     //  상품상세설명
    private String imgGbCd            ;     //  이미지구분코드(PR031)
    private String contFilePathNm     ;     //  컨텐츠파일경로명
    private String contFileNm         ;     //  컨텐츠파일명

}
