package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("etDeliRegnByZipCd")
@Getter
@Setter
public class EtDeliRegnByZipCd extends BaseCommonEntity {
    private String deliRegnGbCd;
    private String zipNo;
}
