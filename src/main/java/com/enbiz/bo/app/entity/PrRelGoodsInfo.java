package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * 관계상품정보
 */
@Alias("PrRelGoodsInfo")
@Getter
@Setter
public class PrRelGoodsInfo extends BaseCommonEntity{

    private String baseGoodsNo;          // 기준상품번호
    private String tgtGoodsNo;           // 대상상품번호
    private String repYn;                // 대표여부
    private Integer sortSeq;             // 정렬순서

}
