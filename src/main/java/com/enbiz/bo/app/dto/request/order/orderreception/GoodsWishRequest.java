package com.enbiz.bo.app.dto.request.order.orderreception;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("GoodsWishRequest")
@Getter
@Setter
public class GoodsWishRequest extends BaseCommonEntity {
    private String mbrNo;				//회원번호
}
