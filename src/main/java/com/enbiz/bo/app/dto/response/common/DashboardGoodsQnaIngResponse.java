package com.enbiz.bo.app.dto.response.common;

import lombok.Getter;
import lombok.Setter;
import org.apache.ibatis.type.Alias;

@Alias("DashboardGoodsQnaIngResponse")
@Getter
@Setter
public class DashboardGoodsQnaIngResponse {
    private	String buyTypCd;                //계약유형
    private	String buyTypCdNm;              //계약유형명
    private String fstCnt;                  //24시간이내
    private String secCnt;                  //24-72시간사이
    private String thdCnt;                  //72-1달간사이
}
