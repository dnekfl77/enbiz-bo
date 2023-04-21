package com.enbiz.bo.app.dto.response.order.orderreception;

import org.apache.ibatis.type.Alias;

import lombok.Getter;
import lombok.Setter;

@Alias("DlvRegnByZipCdResponse")
@Getter
@Setter
public class DlvRegnByZipCdResponse {
    private String deliRegnGbCd;
    private String zipNo;
}
