package com.enbiz.bo.app.dto.request.goods;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("WebStockMgmtRequest")
@Getter
@Setter
public class WebStockMgmtRequest extends BaseCommonEntity {

    private String[] goodsNoList        ;   // 상품번호
    private String goodsNm              ;   // 상품명
    private String entrNo               ;   // 협력사번호
    private String brandNo              ;   // 브랜드번호
    private String stdCtgNo             ;   // 표준분류카테고리번호
    private String mdId                 ;   // 담당MD
    private String lgcItmNo             ;   // 협력사상품코드(기간계단품번호)
    private String saleStatCd           ;   // 판매상태
    private String deliProcTypCd        ;   // 배송처리유형

    private Integer minStkQty           ;   // 단품 최소 재고 수량
    private Integer maxStkQty           ;   // 단품 최대 재고 수량
    private String itmSaleStatCd        ;   // 단품판매상태

}
