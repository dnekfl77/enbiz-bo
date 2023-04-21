package com.enbiz.bo.app.dto.response.customerservice;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("CsTransferTypeCodeResponse")
@Getter
@Setter
public class CsTransferTypeCodeResponse extends BaseCommonEntity {
    private	String csMvotTypNo;
    private	String csMvotTypNm;
    private	String csTypDesc;
    private	String useYn;
    private	String tmplMemo;
    private	String tmplMemoYn;
}
