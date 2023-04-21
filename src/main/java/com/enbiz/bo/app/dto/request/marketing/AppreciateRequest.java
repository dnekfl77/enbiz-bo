package com.enbiz.bo.app.dto.request.marketing;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("AppreciateRequest")
@Getter
@Setter
public class AppreciateRequest  extends BaseCommonEntity {
    private String startDate;   // 시작일자
    private String endDate;     // 종료일자
    private String userId;      // 등록ID
    private String addEvtTypCd;  // 사은행사유형
    private String aePrgsStatCd; // 사은행사상태
    private String aeNo;        // 사은행사번호
    private String aeNm;        // 사은행사명
}
