package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("PrMkdpGoodsInfo")
@Getter
@Setter
public class PrMkdpGoodsInfo extends BaseCommonEntity {

    private String mkdpNo;
    private String divobjNo;
    private String goodsNo;
    private String goodsNm;
    private Integer dispSeq;
    private String saleStatCd;
    private String entrNm;
    private String norPrc;
    private String salePrc;
    private String sysReqDtm;

}
