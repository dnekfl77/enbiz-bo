package com.enbiz.bo.app.dto.response.customerservice;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;
import com.enbiz.common.base.masking.MaskString;
import com.enbiz.common.base.masking.MaskingType;

import lombok.Getter;
import lombok.Setter;

@Alias("CsTransferInfoResponse")
@Getter
@Setter
public class CsTransferInfoResponse extends BaseCommonEntity {
    private String ccnNo;
    private String cnslProcSeq;
    private String csMvotTypNo;
    private String csMvotTypNm;
    private String mvotReqCont;
    private String mvotProcStatCd;
    private String emergMvotYn;
    private String ordNo;
    private String goodsNo;
    private String goodsNm;
    @MaskString(type = MaskingType.ID)
    private String mbrId;
    @MaskString(type = MaskingType.NAME_KR)
    private String mbrNm;
    private String cnslTypNm;
    private String reqmnNm;
    private String mvotReqDtm;
    private String quotNm;
    private String quotDtm;
    private String fnshmnNm;
    private String fnshDtm;
}
