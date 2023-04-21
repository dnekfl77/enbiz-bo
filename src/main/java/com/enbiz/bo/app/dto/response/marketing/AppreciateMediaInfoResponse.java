package com.enbiz.bo.app.dto.response.marketing;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("AppreciateMediaInfoResponse")
@Getter
@Setter
public class AppreciateMediaInfoResponse extends BaseCommonEntity {
    private String aeNo;
    private String aplyPsbMediaCd;
}
