package com.enbiz.bo.app.dto.request.goods;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * 상품 옵션 Request
 */
@Getter
@Setter
@Alias("GoodsOptionRequest")
public class GoodsOptionRequest extends BaseCommonEntity {

    private String entrNo               ; //   협력사번호
    private String optnCatNo            ; //   옵션분류번호

}
