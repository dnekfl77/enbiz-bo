package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("ccPromBase")
@Getter
@Setter
public class CcPromBase extends BaseCommonEntity{
    private String promoNo             ; //프로모션 번호
    private String promoNm             ; // 프로모션명
    private String promoTypCd          ; //프로모션유형코드 ( MK002 )
    private String promoStatCd         ; //프로모션상태코드 ( MK003 )
    private String promoStrDtm         ; //프로모션시작일시
    private String promoEndDtm         ; //프로모션종료일시
    private String promoDesc           ; //프로모션설명
    private String issuSubCd           ; //발급주체코드(MK006)
    private String issuMethCd          ; //발급방식코드(MK007)
    private String aplyTermGbCd        ; //적용기간구분코드(MK015)
    private Integer issuDdStdCpnUseDds ; //발급일기준쿠폰사용일수
    private String tmCpnYn             ; //타임쿠폰여부
    private String usePsbStrDt         ; //사용가능시작일자
    private String usePsbEndDt         ; //사용가능종료일자
    private String usePsbStrTm         ; //사용가능시작시간
    private String usePsbEndTm         ; //사용가능종료시간
    private String idIssuCntCd         ; //ID발급횟수코드(MK017)
    private String issuLmtYn           ; //발급제한여부
    private Integer issuQty            ; //발급수량
    private String autoIssuTypCd       ; //자동발급유형코드(MK008)
    private String autoIssuPotmCd      ; //자동발급시점코드(MK009)
    private Integer anvyBeIssuDaynub   ; //기념일선발행일수
    private String cpbookDispYn        ; //쿠폰북전시여부
    private String dcCpbookCd          ; //할인쿠폰북코드(MK010)
    private String cardcoCd            ; //카드사코드(OM027)
    private String mbrGradeCd          ; //회원등급코드(ME024)
    private String mbrUprGradeAplyYn   ; //회원상위등급적용여부
    private String fixamtFxrtGbCd      ; //정액정율구분코드(MK005)
    private Integer dcRateAmt          ; //할인율금액
    private Integer minBuyAmt          ; //최소구매금액
    private Integer maxDcAmt           ; //최대할인금액
}