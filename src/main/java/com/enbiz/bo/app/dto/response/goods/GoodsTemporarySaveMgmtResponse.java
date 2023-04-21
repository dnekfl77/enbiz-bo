package com.enbiz.bo.app.dto.response.goods;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * 상품 임시 저장 관리 Response
 */
@Alias("GoodsTemporarySaveMgmtResponse")
@Getter
@Setter
public class GoodsTemporarySaveMgmtResponse extends BaseCommonEntity {

    private String pregStatCd          ;     // 가등록상태코드(PR024)
    private String pregStatCdNm        ;     // 가등록상태코드명
    private String retnCausCdNm        ;     // 반려사유코드명
    private String retnCaus            ;     // 반려사유
    private String retnDt              ;     // 반려일자
    private String goodsCompCd         ;     // 상품구성코드
    private String goodsCompCdNm       ;     // 상품구성코드명
    private String saleMethCdNm        ;     // 판매방식코드명
    private String goodsTypCdNm        ;     // 상품유형코드명
    private String mdNm                ;     // 담당MD명
    private String pregGoodsNo         ;     // 가등록상품번호
    private String goodsNm             ;     // 상품명
    private String modlNm              ;     // 모델명
    private String entrNm              ;     // 협력사명
    private String brandNm             ;     // 브랜드명
    private String stdCtgHierarchy     ;     // 표준분류하이라키구조
    private String buyTypCdNm          ;     // 매입형태코드명
    private String goodsRegDtm         ;     // 상품등록일시

}
