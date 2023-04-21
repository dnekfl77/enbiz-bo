package com.enbiz.bo.app.dto.request.customerservice;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("CsCustomerCounselInfoSuperRequest")
@Getter
@Setter
public class CsCustomerCounselInfoSuperRequest extends BaseCommonEntity {

    private String afterCall;
    private String afterTransfer;

    //============================ 고객상담정보 ============================
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
    private String emailAddr;         // 이메일ID
    private String accpCont;        // 접수내용
    private String smsAnsNtcYn;     // SMS 답변고지 여부
    private String emailAnsNtcYn;   // 이메일답변고지여부
    private String obTypNo;         // OB유형번호
    private String custInqLrgTypCd; // 고객문의대유형코드
    private String custInqSmlTypCd; // 고객문의소유형코드
    private String ansDtm;          // 답변일시
    private String ansCont;         // 답변내용
    private String questNo;         // 질문번호
    private String cnslGoodsNo;     // 상품번호
    private String preProcYn;       // 기처리여부

    //============================ 고객상담처리정보 ============================
    private String obProcTypCd;     //OB처리유형코드(CS014)
    private String cnslProcDtm;     //상담처리일시
    private String cnslProcCont;    //상담처리내용

    //============================ 고객주문상품정보 ============================
    private String ordNo;
    private String goodsNo;

    //============================ 고객전화약속정보 ============================
    private String prmsDtm;        //약속일시
    private String notiTmCd;       //알림시간코드(CS013)
    private String prmsMethCd;     //약속방식코드(CS008)
    private String prmsStatCd;     //약속상태코드(CS009)
    private String cnslMemo;       //상담메모
    private String aempId;         //담당자아이디
    private String aempConfDtm;    //담당자확인일시
    private String aempProcDtm;    //담당자처리일시
    private String telTryCnt;      //전화시도수

    //============================ 고객상담이관요청정보 ============================
    private String csMvotTypNo;       //CS이관유형번호
    private String mvotReqCont;       //이관요청내용
    private String mvotProcStatCd;    //이관처리상태코드(CS006)
    private String mvotReqmnId;       //이관요청자ID
    private String mvotReqDtm;        //이관요청일시
    private String emergMvotYn;       //긴급이관여부
    private String mvotAfAempId;      //이관후담당자ID
}
