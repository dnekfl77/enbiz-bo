package com.enbiz.bo.app.dto.request.display;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("PrDispGoodsInfoRequest")
@Getter
@Setter
public class PrDispGoodsInfoRequest extends BaseCommonEntity {

    private String dispCtgNo	; 	// 전시카테고리번호
    private String goodsNo		; 	// 상품번호

}
