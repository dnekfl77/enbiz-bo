package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("ccSiteBase")
@Getter
@Setter
public class CcSiteBase extends BaseCommonEntity {

    private String siteNo;
    private String siteNm;
    private String siteDom;
    private String trdStrtDt;
    private String trdEndDt;

}
