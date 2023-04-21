package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("opPayMeanCtrlDtlInfo")
@Getter
@Setter
public class OpPayMeanCtrlDtlInfo extends BaseCommonEntity {

    private String payMeanCtrlNo   ; // 결제수단제어번호
    private String ctrlGbCd        ; // 제어구분코드(OM032)
    private String ctrlTgtNo       ; // 제어대상번호
    private String ctrlTgtDtlNo    ; // 제어대상상세번호(OM031)

}
