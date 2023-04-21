package com.enbiz.bo.app.dto.response.customerservice;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("CsCompensTypeCodeResponse")
@Getter
@Setter
public class CsCompensTypeCodeResponse extends BaseCommonEntity {
    private Integer level;
    private String cpnsTypNo;
    private String cpnsTypNm;
    private String cpnsTypLrgNm;
    private String cpnsTypSmlNm;
    private String useYn;
    private Integer sortSeq;
    private String cpnsSubCd;
    private String cpnsSubNm;
    private String cpnsStdCd;
    private String cpnsStdNm;
    private String cpnsStdRate;
    private Integer maxPayLim;
    private String cpnsStdDesc;
    private String cpnsStdDescYn;
    private String uprCpnsTypCd;
    private String hierarchy;
    private String hierarchyText;
}
