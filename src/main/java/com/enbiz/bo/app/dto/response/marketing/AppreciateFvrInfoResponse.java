package com.enbiz.bo.app.dto.response.marketing;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("AppreciateFvrInfoResponse")
@Getter
@Setter
public class AppreciateFvrInfoResponse extends BaseCommonEntity {
    private String aeNo;
    private String aeFvrSeq;
    private Integer aplyMinAmt;
    private String goodsNo;
    private String goodsNm;
}
