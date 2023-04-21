package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("StIndInfoQryRtInfo")
@Getter
@Setter
public class StIndInfoQryRtInfo extends BaseCommonEntity {

    private String userId; //사용자ID
    private String indInfoGbCd; //개인정보구분코드(UR008)
    private String useYn; //사용여부

}
