package com.enbiz.bo.app.dto.request.customerservice;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("CsMvotTypeCodeRequest")
@Getter
@Setter
public class CsMvotTypeCodeRequest extends BaseCommonEntity {
    private String csMvotTypNm;
    private String useYn;
}
