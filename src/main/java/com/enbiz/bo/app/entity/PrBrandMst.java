package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("PrBrandMst")
@Getter
@Setter
public class PrBrandMst extends BaseCommonEntity {
    private String brandNo         ;  // 브랜드번호
    private String brandNm         ;  // 브랜드명
    private String dispOptnCd      ;  // 전시옵션코드
    private String korBrandNm      ;  // 국문브랜드명
    private String engBrandNm      ;  // 영문브랜드명
    private String korSchNm        ;  // 한글검색명
    private String engSchNm        ;  // 영문검색명
    private String scw1Nm          ;  // 검색어1명
    private String scw2Nm          ;  // 검색어2명
    private String scw3Nm          ;  // 검색어3명
    private String useYn           ;  // 사용여부
    private String brandDescCmt    ;  // 브랜드설명내용
}
