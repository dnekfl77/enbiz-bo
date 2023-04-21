package com.enbiz.bo.app.dto.request.customerservice;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("CsTransferInfoDetailRequest")
@Getter
@Setter
public class CsTransferInfoDetailRequest extends BaseCommonEntity {
    private String ccnNo;
    private String cnslProcSeq;
}
