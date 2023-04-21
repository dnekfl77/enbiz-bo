package com.enbiz.bo.app.dto.request.customerservice;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("InquireTypeRequest")
@Getter
@Setter
public class InquireTypeRequest extends BaseCommonEntity {
    private String custInqTypCd;
    private String custInqTypNm;
    private String sortSeq;
    private String useYn;
    private String ordGoodsMdtyYn;
    private String ansSubCd;
    private String cnslTypNo;
    private String uprCustInqTypCd;
}
