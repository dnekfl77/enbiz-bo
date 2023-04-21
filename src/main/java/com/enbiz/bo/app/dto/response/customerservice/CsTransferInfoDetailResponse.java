package com.enbiz.bo.app.dto.response.customerservice;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;
import com.enbiz.common.base.masking.MaskString;
import com.enbiz.common.base.masking.MaskingType;

import lombok.Getter;
import lombok.Setter;

@Alias("CsTransferInfoDetailResponse")
@Getter
@Setter
public class CsTransferInfoDetailResponse extends BaseCommonEntity {
    private String ccnNo;     //상담번호
    private String acpData;   //접수자/접수일시
    private String userData;  //회원정보
    @MaskString(type = MaskingType.NAME_KR)
    private String mbrNm;
    @MaskString(type = MaskingType.EMAIL)
    private String emailAddr;
    private String gbcdMedia; //상담구분/접수매체
    private String accpTypCd; //접수유형
    private String accpTypNm; //
    private String telNo;
    private String telRgnNo;
    @MaskString(type = MaskingType.PHONE_NUM)
    private String telTxnoNo;
    private String telEndNo;
    private String ccnPrgsStatCd;
    private String ccnPrgsStatNm;//처리상태
    private String cnslTypText;  //상담유형
    private String obTypNm;      //업무유형
    private String accpCont;     //문의내용

    private String csMvotTypNm;     // 이관유형
    private String mvotProcStatCd;  //
    private String mvotProcStatNm;  // 이관상태
    private String emergMvotYn;     // 긴급이관
    private String reqmnNm;         // 이관요청자
    private String quotNm;          // 담당자
    private String mvotAfAempId;    // 담당자ID
    private String fnshmnNm;        // 완료자
    private String mvotReqDtm;      // 이관요청일시
    private String quotDtm;         // 할당일시
    private String fnshDtm;         // 완료일시
    private String mvotReqCont;     // 이관내용
    private String mvotAnsProcCont; // 답변내용
    private String cnslProcSeq;     // 상담처리순번
}