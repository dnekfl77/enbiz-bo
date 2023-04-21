package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("opPayMeanCtrlInfo")
@Getter
@Setter
public class OpPayMeanCtrlInfo extends BaseCommonEntity {

    private String payMeanCtrlNo ; // 결제수단제어번호
    private String useLmtStrDtm  ; // 사용제한시작일시
    private String useLmtEndDtm  ; // 사용제한종료일시
    private String dvcGbCd       ; // 디바이스코드(OM031)
    private String ctrlGbCd      ; // 제어구분코드(OM032)
    private String useYn         ; // 사용여부
    private String dispYn        ; // 전시여부
    private String dispStrDtm    ; // 전시시작일시
    private String dispEndDtm    ; // 전시종료일시
    private String title         ; // 제목
    private String cont          ; // 내용

}
