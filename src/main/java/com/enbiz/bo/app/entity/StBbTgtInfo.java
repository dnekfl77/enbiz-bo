package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("StBbTgtInfo")
@Getter
@Setter
public class StBbTgtInfo extends BaseCommonEntity {
    private String bbcNo;
    private String entrNo;
}
