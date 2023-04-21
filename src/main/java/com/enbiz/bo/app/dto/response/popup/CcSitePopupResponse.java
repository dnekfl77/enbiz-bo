package com.enbiz.bo.app.dto.response.popup;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("CcSitePopupResponse")
@Getter
@Setter
public class CcSitePopupResponse extends BaseCommonEntity {

    private String siteNo;
    private String siteNm;
    private String shopNm;
    private String trdStrtDt;
    private String trdEndDt;

}
