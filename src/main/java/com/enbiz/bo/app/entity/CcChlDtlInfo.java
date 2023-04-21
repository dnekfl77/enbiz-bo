package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("ccChlDtlInfo")
@Getter
@Setter
public class CcChlDtlInfo extends BaseCommonEntity {

    private	String chlDtlNo;	    //채널상세번호
    private	String chlNo;	        //채널번호
    private	String chlDtlNm;	    //채널상세명
    private	String chlDtlDesc;	    //채널상세설명
    private	String useYn;	        //사용여부

}
