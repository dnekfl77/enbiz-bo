package com.enbiz.bo.app.dto.response.customerservice;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("CsObCounselInfoResponse")
@Getter
@Setter
public class CsObCounselInfoResponse extends BaseCommonEntity {
    private String mbrNo;
    private String ordNo;
    private String accpCont;
    private String yn;
    private String failCont;
    private String cnslTypNo;
    private String obTypNo;
}
