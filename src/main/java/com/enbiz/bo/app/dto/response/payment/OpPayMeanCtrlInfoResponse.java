package com.enbiz.bo.app.dto.response.payment;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("OpPayMeanCtrlInfoResponse")
@Getter
@Setter
public class OpPayMeanCtrlInfoResponse extends BaseCommonEntity {
    private String argInsertUpdate ; // 등록,수정 구분
    private String payMeanCtrlNo ; // 결제수단제어번호
    private String useLmtDate    ; // 사용제한기간
    private String useLmtStrDtm  ; // 사용제한시작일시
    private String useLmtEndDtm  ; // 사옹제한종료일시
    private String dvcGbCd       ; // 디바이스코드
    private String ctrlGbCd      ; // 제어구분코드
    private String useYn         ; // 사용여부
    private String dispYn        ; // 전시여부
    private String dispStrDtm    ; // 전시시작일시
    private String dispEndDtm    ; // 전시종료일시
    private String title         ; // 제목
    private String cont          ; // 내용
    private String ctrlTgtNo     ; // 제어대상번호
    private String ctrlTgtDtlNo  ; // 제어대상상세번호
}
