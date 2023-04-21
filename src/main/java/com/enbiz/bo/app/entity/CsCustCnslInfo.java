package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * 고객상담정보
 */
@Alias("CsCustCnslInfo")
@Getter
@Setter
public class CsCustCnslInfo extends BaseCommonEntity{
    private String ccnNo;           // 상담번호
    private String custCnslGbCd;    // 상담구분코드(CS001)
    private String accpMediaCd;     // 접수매체코드(CS002)
    private String accpTypCd;       // 접수유형코드(CS003)
    private String cnslSubCd;       // 상담주체코드(CS004)
    private String ccnPrgsStatCd;   // 고객상담진행상태코드(CS005)
    private String accpDtm;         // 접수일시
    private String quotDtm;         // 할당일시
    private String fnshDtm;         // 완료일시
    private String acptmnId;        // 접수자 아이디
    private String procmnId;        // 처리자 아이디
    private String fnshmnId;        // 완료자 아이디
    private String mbrNo;           // 회원번호
    private String inqmnNm;         // 문의자명
    private String cnslLrgTypNo;    // 상담대유형번호
    private String cnslMidTypNo;    // 상담중유형번호
    private String cnslTypNo;       // 상담유형번호
    private String cellNoYn;        // 휴대폰번호여부
    private String telRgnNo;        // 전화지역번호
    private String telTxnoNo;       // 전화국번번호
    private String telEndNo;        // 전화끝번호
    private String emailAddr;       // 이메일ID
    private String accpCont;        // 접수내용
    private String smsAnsNtcYn;     // SMS 답변고지 여부
    private String emailAnsNtcYn;   // 이메일답변고지여부
    private String obTypNo;         // OB유형번호
    private String custInqLrgTypCd; // 고객문의대유형코드
    private String custInqSmlTypCd; // 고객문의소유형코드
    private String ansDtm;          // 답변일시
    private String ansCont;         // 답변내용
    private String questNo;         // 질문번호
    private String goodsNo;         // 상품번호
    private String preProcYn;       // 기처리여부
}
