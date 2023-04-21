package com.enbiz.bo.app.dto.response.goods;

import java.util.List;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * 묶음상품 상세 Response
 */
@Getter
@Setter
@Alias("PackageGoodsResponse")
public class PackageGoodsResponse extends BaseCommonEntity {

    private GoodsBaseResponse prGoodsBase                   ; // 상품기본
    private List<RelatedGoodsResponse> prRelGoodsInfoList   ; // 관계상품 목록

}
