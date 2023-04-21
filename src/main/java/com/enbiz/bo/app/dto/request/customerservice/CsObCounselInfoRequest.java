package com.enbiz.bo.app.dto.request.customerservice;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("CsObCounselInfoRequest")
@Getter
@Setter
public class CsObCounselInfoRequest extends BaseCommonEntity {
    private String mbrNo;
    private String ordNo;
    private String accpCont;
    private String yn;
    private String failCont;
    private String cnslTypNo;
    private String obTypNo;
}
