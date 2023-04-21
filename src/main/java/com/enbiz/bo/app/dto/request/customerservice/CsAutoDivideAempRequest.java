package com.enbiz.bo.app.dto.request.customerservice;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("CsAutoDivideAempRequest")
@Getter
@Setter
public class CsAutoDivideAempRequest extends BaseCommonEntity {
    private String autoDivNo;   // 자동배분번호
    private String aempId;      // 담당자 아이디
    private String autoDivGbCd; // 자동배분구분코드(CS023)
    private String autoDivDtlNo;// 자동배분상세번호
    private String deptCd;      // 부서코드
    private String state;       // 상태
}
