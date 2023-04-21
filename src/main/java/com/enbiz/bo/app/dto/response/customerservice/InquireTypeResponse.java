package com.enbiz.bo.app.dto.response.customerservice;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("InquireTypeResponse")
@Getter
@Setter
public class InquireTypeResponse extends BaseCommonEntity {
    private String custInqTypCd;
    private String custInqTypNm;
    private Integer sortSeq;
    private String useYn;
    private String ordGoodsMdtyYn;
    private String ansSubCd;
    private String cnslTypText;
    private String cnslTypNo;
    private String uprCustInqTypCd;
}
