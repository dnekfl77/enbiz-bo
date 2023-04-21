package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("CcChlBase")
@Getter
@Setter
public class CcChlBase extends BaseCommonEntity {
    private	String chlNo;	        //채널번호
    private	String siteNo;	        //사이트번호
    private	String chlClssCd;	    //채널분류코드(CH001)
    private	String chlTypCd;	    //채널유형코드(CH002)
    private	String chlNm;	        //채널명
    private	String aplyStrDt;	    //적용시작일자
    private	String aplyEndDt;	    //적용종료일자
    private	String chlDesc;	        //채널설명
    private	String entrNo;	        //협력사번호

}
