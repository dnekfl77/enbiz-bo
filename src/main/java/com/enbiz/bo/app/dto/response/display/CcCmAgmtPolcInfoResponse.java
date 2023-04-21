package com.enbiz.bo.app.dto.response.display;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("CcCmAgmtPolcInfoResponse")
@Getter
@Setter
public class CcCmAgmtPolcInfoResponse extends BaseCommonEntity {

    private String cmAgmtSeq;
    private String siteNo;
    private String agmtPolcCd;
    private String aplyStrDt;
    private String aplyEndDt;
    private String cmAgmtGbNm;
    private String agmtPolcNm;
    private String cmAgmtPolcGbCd;
    private String title;
    private String wrdCont;
    private String siteNm;
    private String aplyStrYn;
    private String aplyEndYn;
}
