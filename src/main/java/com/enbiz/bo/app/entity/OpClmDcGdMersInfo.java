package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("opClmDcGdMersInfo")
@Getter
@Setter
public class OpClmDcGdMersInfo extends BaseCommonEntity {
    private String clmDcGdNo	    ; 	// 청구할인안내번호
    private String mersNo	        ; 	// 가맹점번호
}
