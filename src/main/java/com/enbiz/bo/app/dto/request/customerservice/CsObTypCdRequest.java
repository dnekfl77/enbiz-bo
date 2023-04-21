package com.enbiz.bo.app.dto.request.customerservice;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("CsObTypCdRequest")
@Getter
@Setter
public class CsObTypCdRequest extends BaseCommonEntity {
    private String obTypNm;
    private String useYn;
}
