package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("adminCommonBase")
@Getter
@Setter
public class AdminCommonBase extends BaseCommonEntity {

    private String mbrId;
    private String phon;
    private String inqrNm;
    private String mbrGdCont;
    private String emailAddr;
    private String callNumber;

}
