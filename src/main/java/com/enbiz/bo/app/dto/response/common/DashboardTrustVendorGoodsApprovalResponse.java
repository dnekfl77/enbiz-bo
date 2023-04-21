package com.enbiz.bo.app.dto.response.common;

import lombok.Getter;
import lombok.Setter;
import org.apache.ibatis.type.Alias;

@Alias("DashboardTrustVendorGoodsApprovalResponse")
@Getter
@Setter
public class DashboardTrustVendorGoodsApprovalResponse {
    private	String pregStatCd;              //승인상태코드
    private	String pregStatCdNm;            //승인상태명
    private String cnt;                     //갯수
}
