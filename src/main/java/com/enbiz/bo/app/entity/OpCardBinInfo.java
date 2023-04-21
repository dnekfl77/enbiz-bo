package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("opCardBinInfo")
@Getter
@Setter
public class OpCardBinInfo extends BaseCommonEntity {
    private String cardBinno     ; 	// 카드Bin번호
    private String iscmCd        ; 	// 발급사 코드
    private String cardcoNm      ;  // 카드명칭
    private String mbrGbCd       ;  // 회원구분 코드
    private String cardTypCd     ; 	// 카드유형
    private String aplyDt        ; 	// 적용일자
    private String rmk           ;  // 비고
}
