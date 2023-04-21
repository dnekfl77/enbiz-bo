package com.enbiz.bo.app.dto.response.customerservice;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("CsCcnOrdResponse")
@Getter
@Setter
public class CsCcnOrdResponse extends BaseCommonEntity {
    private String ordNo;
    private String goodsNo;
    private String goodsNm;
    private String itmNo;
    private String itmNm;
    private String ordQty;
    private String salePrc;
    private String entrNo;
    private String entrNm;
}
