package com.enbiz.bo.app.dto.response.customerservice;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;
import com.enbiz.common.base.masking.MaskString;
import com.enbiz.common.base.masking.MaskingType;

import lombok.Getter;
import lombok.Setter;

@Alias("IntegratedCounselResponse")
@Getter
@Setter
public class IntegratedCounselResponse extends BaseCommonEntity{
    private String ccnNo         ; //상담번호
    private String accpDtm       ; //접수일시
    private String ccnPrgsStatCd ; //처리상태
    private String custCnslGbCd  ; //상담구분
    private String accpTypCd     ; //접수유형
    private String cnslTypNo     ; //상담유형
    private String cnslTypText   ; //상담유형명
    private String accpMediaCd   ; //접수매체
    @MaskString(type = MaskingType.ID)
    private String mbrId         ; //회원ID
    @MaskString(type = MaskingType.NAME_KR)
    private String mbrNm         ; //회원명
    private String acptmnNm      ; //접수자
    private String procmnNm      ; //처리자
    private String quotDtm       ; //할당일시
    private String fnshmnNm      ; //완료자
    private String fnshDtm       ; //완료일시
}
