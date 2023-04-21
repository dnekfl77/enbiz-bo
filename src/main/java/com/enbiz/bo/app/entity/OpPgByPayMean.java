package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("opPgByPayMean")
@Getter
@Setter
public class OpPgByPayMean extends BaseCommonEntity {

    private String pgGbCd        ; // PG사 구분코드
    private String payWayCd      ; // 결제수단코드
    private String linkYn        ; // 연결여부

}
