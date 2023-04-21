package com.enbiz.bo.app.dto.response.goods;


import org.apache.ibatis.type.Alias;

import lombok.Getter;
import lombok.Setter;

@Alias("GoodsItemSaleStatusResponse")
@Getter
@Setter
public class GoodsItemSaleStatusResponse {
    private String cd;
    private Integer count;
}
