package com.enbiz.bo.app.dto.request.order.orderreception;


import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("ManualOrderRequest")
@Getter
@Setter
public class ManualOrderRequest extends BaseCommonEntity {
    private String mbrNo; //회원 번호
}
