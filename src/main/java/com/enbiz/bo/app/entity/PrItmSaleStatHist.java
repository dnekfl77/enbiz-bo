package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * 상품,단품 판매상태 이력
 */
@Alias("prItmSaleStatHist")
@Getter
@Setter
public class PrItmSaleStatHist extends BaseCommonEntity {
    private String goodsItmGbCd;    // 상품단품구분코드(PR020)
    private String goodsNo;         // 상품번호
    private String itmNo;           // 단품번호
    private String histStrDtm;      // 이력시작일시
    private String histEndDtm;      // 이력종료일시
    private String itmSaleStatCd;   // 단품판매상태코드(PR005)
    private String soutCausCd;      // 품절사유코드(PR032)
}
