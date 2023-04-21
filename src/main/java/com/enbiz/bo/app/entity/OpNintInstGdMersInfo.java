package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("opNintInstGdMersInfo")
@Getter
@Setter
public class OpNintInstGdMersInfo extends BaseCommonEntity {
    private String nintInstGdNo	    ; 	// 일련번호
    private String mersNo	        ; 	// 가맹점번호
}
