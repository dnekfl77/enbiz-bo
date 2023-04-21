package com.enbiz.bo.app.dto.response.customerservice;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("CsCcnGoodsResponse")
@Getter
@Setter
public class CsCcnGoodsResponse extends BaseCommonEntity {
    private String goodsNo;
    private String goodsNm;
    private String entrNm;
}
