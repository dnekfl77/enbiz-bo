package com.enbiz.bo.app.dto.request.customerservice;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("CsCcnTransInfoUpdateRequest")
@Getter
@Setter
public class CsCcnTransInfoUpdateRequest extends BaseCommonEntity {
    private String ccnNo;
    private String cnslProcSeq;
    private String mvotProcStatCd;
    private String mvotAnsProcCont;
}
