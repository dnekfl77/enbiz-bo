package com.enbiz.bo.app.dto.response.marketing;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("AppreciateAplyInfoResponse")
@Getter
@Setter
public class AppreciateAplyInfoResponse extends BaseCommonEntity {
    private String aeNo;
    private String fvrAplyGbCd;
    private String fvrAplyTypCd;
    private String fvrTgtNo;
    private String fvrTgtNm;
}
