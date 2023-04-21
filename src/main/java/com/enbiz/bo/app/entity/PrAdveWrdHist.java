package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * 상품홍보문구이력
 */
@Alias("PrAdveWrdHist")
@Getter
@Setter
public class PrAdveWrdHist extends BaseCommonEntity {
    private String goodsNo;             // 상품번호
    private String aplyStrDt;           // 적용시작일자
    private String aplyEndDt;           // 적용종료일자
    private String adveWrd;             // 홍보문구
    private String useYn;               // 사용여부
}
