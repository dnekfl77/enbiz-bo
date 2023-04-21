package com.enbiz.bo.app.dto.response.goods;

import org.apache.ibatis.type.Alias;

import com.enbiz.bo.app.entity.PrAssocGoodsInfo;

import lombok.Getter;
import lombok.Setter;

/**
 * 연관상품 Response
 */
@Getter
@Setter
@Alias("AssociatedGoodsResponse")
public class AssociatedGoodsResponse extends PrAssocGoodsInfo {

    private String asctGoodsNm                      ;   // 연관상품명
    private String saleStatCdNm                     ;   // 판매상태코드명
}
