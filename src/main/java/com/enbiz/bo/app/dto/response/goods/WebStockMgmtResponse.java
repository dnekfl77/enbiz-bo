package com.enbiz.bo.app.dto.response.goods;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("WebStockMgmtResponse")
@Getter
@Setter
public class WebStockMgmtResponse extends BaseCommonEntity {

    private String goodsNo                ; // 상품번호
    private String goodsNm                ; // 상품명
    private String itmNo                  ; // 단품번호
    private String itmNm                  ; // 단품명
    private String brandNm                ; // 브랜드명
    private String saleStatCdNm           ; // 판매상태
    private String itmSaleStatCdNm        ; // 단품판매상태
    private Integer stkQty                ; // 재고수량
    private String stdCtgHierarchy        ; // 표준분류
    private String entrNo                 ; // 협력사번호
    private String entrNm                 ; // 협력사명
    private String mdId                   ; // 담당MD
    private String lgcItmNo               ; // 협력사상품코드

}
