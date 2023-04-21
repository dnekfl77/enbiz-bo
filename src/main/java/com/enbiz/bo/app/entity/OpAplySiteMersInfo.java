package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("opAplySiteMersInfo")
@Getter
@Setter
public class OpAplySiteMersInfo extends BaseCommonEntity {

    private String mersNo   ; 	// 가맹점 번호
    private String siteNo   ; 	// 사이트 번호

}
