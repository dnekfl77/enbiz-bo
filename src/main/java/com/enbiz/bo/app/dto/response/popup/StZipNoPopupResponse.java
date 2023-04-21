package com.enbiz.bo.app.dto.response.popup;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("StZipNoPopupResponse")
@Getter
@Setter
public class StZipNoPopupResponse extends BaseCommonEntity {

    String zipNoSeq;
    String zipNo;
    String address;

}
