package com.enbiz.bo.app.dto.response.customerservice;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;
import com.enbiz.common.base.masking.MaskString;
import com.enbiz.common.base.masking.MaskingType;

import lombok.Getter;
import lombok.Setter;

@Alias("CsCcnTransInfoDtlPopResponse")
@Getter
@Setter
public class CsCcnTransInfoDtlPopResponse extends BaseCommonEntity {
    @MaskString(type = MaskingType.NAME_KR)
    private String mbrNm;
    @MaskString(type = MaskingType.EMAIL)
    private String emailAddr;
    private String telRgnNo;
    @MaskString(type = MaskingType.PHONE_NUM)
    private String telTxnoNo;
    private String telEndNo;
    private String ordNo;
    private String ccnNo;
    private String goodsNo;
    private String goodsNm;
    private String itmNo;
    private String itmNm;
    private String entrNm;
    private String custCnslGbCd;
    private String custCnslGbNm;
    private String ccnPrgsStatCd;
    private String ccnPrgsStatNm;
    private String cnslTypNm;
    private String accpDtm;
    private String acptmnNm;
    private String accpCont;
    private String csMvotTypNm;
    private String mvotProcStatCd;
    private String mvotProcStatNm;
    private String emergMvotYn;
    private String mvotReqmnId;
    private String mvotReqmnNm;
    private String mvotReqDtm;
    private String mvotReqCont;
    private String quotDtm;
    private String mvotAfAempId;
    private String mvotAfAempNm;
    private String fnshmnNm;
    private String fnshDtm;
    private String mvotAnsProcCont;
    private String cnslProcSeq;
}
