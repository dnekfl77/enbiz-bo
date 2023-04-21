package com.enbiz.bo.app.dto.request.delivery;


import javax.validation.constraints.NotEmpty;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EtDeliRegnByZipCdCudRequest extends BaseCommonEntity {
    @NotEmpty
    private String deliRegnGbCd;
    @NotEmpty
    private String zipNo;
}
