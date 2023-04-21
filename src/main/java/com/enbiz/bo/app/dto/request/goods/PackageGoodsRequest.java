package com.enbiz.bo.app.dto.request.goods;

import org.apache.ibatis.type.Alias;

import com.enbiz.bo.app.entity.PrGoodsBase;
import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * 묶음상품 상세 Request
 */
@Getter
@Setter
@Alias("PackageGoodsRequest")
public class PackageGoodsRequest extends BaseCommonEntity {

    private PrGoodsBase prGoodsBase                              ; // 상품기본
}
