package com.enbiz.bo.app.dto.response.popup;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * ==========================
 * 브랜드 팝업 관리 Response Dto
 * ==========================
 */
@Alias("PrBrandMstResponse")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PrBrandMstResponse extends BaseCommonEntity {

    private String brandNo         ;  // 브랜드번호
    private String brandNm         ;  // 브랜드명
    private String dispOptnCd      ;  // 전시옵션코드(PR025)
    private String korBrandNm      ;  // 국문브랜드명
    private String engBrandNm      ;  // 영문브랜드명
    private String korSchNm        ;  // 한글검색명
    private String engSchNm        ;  // 영문검색명
    private String scw1Nm          ;  // 검색어1명
    private String scw2Nm          ;  // 검색어2명
    private String scw3Nm          ;  // 검색어3명
    private String useYn           ;  // 사용여부
    private String brandDescCmt    ;  // 브랜드설명내용

    private String dispOptnCdNm    ;  // 전시옵션코드명 ( 01 : 국문, 02 : 영문 )
    private String brandImg        ;  // 이미지 경로명

}
