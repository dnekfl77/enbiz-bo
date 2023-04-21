package com.enbiz.bo.app.dto.response.customerservice;

import java.util.List;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;
import com.enbiz.common.base.masking.MaskString;
import com.enbiz.common.base.masking.MaskingType;

import lombok.Getter;
import lombok.Setter;

@Alias("IntegratedCsDetailResponse")
@Getter
@Setter
public class IntegratedCsDetailResponse extends BaseCommonEntity {
    private String ccnNo;           //상담번호
    private String acpData;         //접수자/접수일시
    private String userData;        //회원정보
    @MaskString(type = MaskingType.NAME_KR)
    private String mbrNm;
    @MaskString(type = MaskingType.EMAIL)
    private String emailAddr;
    private String gbcdMedia;       //상담구분/접수매체
    private String accpTypCd;       //접수유형
    private String accpTypNm;       //접수유형
    private String telNo;           //전화번호
    private String telRgnNo;
    @MaskString(type = MaskingType.PHONE_NUM)
    private String telTxnoNo;
    private String telEndNo;
    private String ccnPrgsStatCd;   // 처리상태
    private String ccnPrgsStatNm;   // 처리상태
    private String cnslTypText;     // 상담유형
    private String obTypNm;         // 업무유형
    private String accpCont;        // 문의내용
    private String mvotCaus;        // 이관사유
    private String smsAnsNtcYn;     // SMS 답변고지여부
    private String emailAnsNtcYn;   // 이메일 답변고지여부
    private String preProcYn;       // 기처리여부
    private String ansCont;         // 답변 내용
    private String ansDtm;          // 답변 일시
    private String ansText;         // 답변 텍스트
    private String custCnslGbCd;    // 상담구분코드
    private String procmnId;        // 처리자ID
    private String cellNoYn;        // 휴대폰번호 Y , N
    List<CsCcnOrdGoodsResponse> integrateOrdAndGoodsInfo; //상담상품내용
    List<CsCcnProcInfoResponse> integrateProcInfo; //처리내용

    private String telYn;     // 전화예약완료 여부
    private String transYn;   // 이관완료 여부
    private String cpnsPayYn; // 보상완료 여부
}
