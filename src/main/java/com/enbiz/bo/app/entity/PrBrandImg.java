package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("PrBrandImg")
@Getter
@Setter
public class PrBrandImg extends BaseCommonEntity {
    private String brandNo      ;   //브랜드번호
    private String imgNo        ;   //이미지번호
    private String imgSizeCd    ;   //이미지크기코드(PR014)
    private String imgRouteNm   ;   //이미지경로명
    private String imgFileNm    ;   //이미지파일명
}
