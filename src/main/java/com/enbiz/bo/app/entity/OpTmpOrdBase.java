package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("OpTmpOrdBase")
@Getter
@Setter
public class OpTmpOrdBase extends BaseCommonEntity {
    private String tmpOrdNo;           // 임시주문번호
    private String siteNo;             // 비회원
    private String bsketNo;            // 장바구니번호
    private String ordMediaCd;         // 주문매체코드(OM007)
    private String mbrNo;              // 회원번호
    private String ordManNm;           // 주문자명
    private String ordAccpDtm;         // 주문접수일시
    private String mbrGradeCd;         // 회원등급코드(ME024)
    private String mbrMgrCd;           // 회원관리코드(ME002)
    private String fstOrdYn;           // 첫주문여부
    private String umemEmailAddr;      // 비회원이메일주소
    private String umemCellSctNo;      // 비회원휴대폰구분번호
    private String umemCellTxnoNo;     // 비회원휴대폰국번번호
    private String umemCellEndNo;      // 비회원휴대폰끝번호
    private String umemTelRgnNo;       // 비회원휴대폰끝번호
    private String umemTelTxnoNo;      // 비회원전화국번번호
    private String umemTelEndNo;       // 비회원전화끝번호
    private Integer umemZipNoSeq;      // 비회원우편번호순번
    private String umemZipNo;          // 비회원우편번호
    private String umemZipAddr;        // 비회원우편주소
    private String umemDtlAddr;        // 비회원상세주소
    private String rfdBankCd;          // 환불은행코드(OM026)
    private String rfdActnNo;          // 환불계좌번호
    private String rfdActnDepositorNm; // 환불예금주
    private String trnsDt;             // 전송일자
    private String trnsTm;             // 전송시각
    private String ordNo;              // 주문번호
    private String ordRsltCd;          // 주문결과코드(OM016)
    private String ordRsltMsgCont;     // 주문결과메시지내용
}
