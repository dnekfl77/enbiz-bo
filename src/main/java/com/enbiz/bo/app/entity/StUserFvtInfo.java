package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("stUserFvtInfo")
@Getter
@Setter
public class StUserFvtInfo extends BaseCommonEntity {

    private	String	userId;	    //사용자아이디
    private	String	useYn;	    //사용여부
    private	String	rtTgtSeq;	//권한대상순번
    private	Long	sortSeq;	//정렬순서

}
