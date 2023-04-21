package com.enbiz.bo.app.dto.response.payment;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("OpPgByPayMeanResponse")
@Getter
@Setter
public class OpPgByPayMeanResponse extends BaseCommonEntity {
    private String cd            ; // PG사 구분코드
    private String cdNm          ; // PG사명
    private String useYn         ; // 사용여부
    private String pgGbCd        ; // PG사 구분코드
    private String payWayCd      ; // 결제수단코드
    private String linkYn        ; // 연결여부
}
