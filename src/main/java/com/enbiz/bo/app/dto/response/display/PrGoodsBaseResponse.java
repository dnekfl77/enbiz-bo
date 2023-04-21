package com.enbiz.bo.app.dto.response.display;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("PrGoodsBaseResponse")
@Getter
@Setter
public class PrGoodsBaseResponse extends BaseCommonEntity {

    private String goodsNo                    ; // 표준카테고리 상품번호
    private String goodsNm                    ; // 표준카테고리 상품명
    private String saleStatCdNm               ; // 표준카테고리 상품 판매상태

}
