package com.enbiz.bo.app.dto.response.customer;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("CustomerNoMaskingResponse")
@Getter
@Setter
public class CustomerNoMaskingResponse extends BaseCommonEntity {
    private String mbrNo;
    private String mbrNm;
    private String mbrGbCd;
    private String mbrMgrCd;
    private String loginId;
    private String telRgnNo;
    private String telTxnoNo;
    private String telEndNo;
    private String cellSctNo;
    private String cellTxnoNo;
    private String cellEndNo;
    private String mbrMgrNm;
    private String mbrGradeNm;
    private String mbrGradeCd;
    private String emailAddr;
    private String zipNoSeq;
    private String zipNo;
    private String zipAddr;
    private String dtlAddr;
}
