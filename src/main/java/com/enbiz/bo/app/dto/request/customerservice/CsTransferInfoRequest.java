package com.enbiz.bo.app.dto.request.customerservice;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("CsTransferInfoRequest")
@Getter
@Setter
public class CsTransferInfoRequest extends BaseCommonEntity {
    String periodType; // 기간 Type
    String startDate;
    String endDate;
    String mvotProcStatCd;  // 이관상태
    String csMvotTypNo;     // 이관유형
    String mbrType;         // 회원정보 Type
    String mbrText;         // 회원ID or 회원명
    String userType;        // 요청/담당/완료자 Type
    String userText;        // 접수자ID / 처리자ID
    String ordNoCcnNoType;   // 주문/상담번호 Type
    String ordNoCcnNoText; // 주문번호 or 상담번호
    String emergMvotYn; // 주문번호 or 상담번호
}
