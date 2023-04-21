package com.enbiz.bo.app.dto.request.customerservice;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("CsCompensTypeCodeRequest")
@Getter
@Setter
public class CsCompensTypeCodeRequest extends BaseCommonEntity {
    private Integer level;
    private String useYn;
    private String cpnsTypNo;
    private String cpnsTypNm;
    private String uprCpnsTypCd;
}
