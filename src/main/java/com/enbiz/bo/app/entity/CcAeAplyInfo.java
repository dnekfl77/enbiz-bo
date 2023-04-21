package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("ccAeAplyInfo")
@Getter
@Setter
public class CcAeAplyInfo extends BaseCommonEntity {
    private String aeNo         ; //사은행사번호
    private String fvrAplyGbCd  ; //혜택적용구분코드 (MK013)
    private String fvrAplyTypCd ; //혜택적용유형코드 (MK014)
    private String fvrTgtNo     ; //혜택대상번호
}
