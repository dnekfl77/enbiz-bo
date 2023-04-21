package com.enbiz.bo.app.dto.request.customerservice;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("PhoneAppointmentRequest")
@Getter
@Setter
public class PhoneAppointmentRequest extends BaseCommonEntity {
    String periodType; // 기간 Type
    String startDate;
    String endDate;
    String procState;  // 상태
    String prmsMethCd; // 약속방식 
    String mbrType;    // 회원정보 Type 
    String mbrText;    // 회원ID or 회원명
    String userType;   // 접수자 , 처리자 Type
    String userText;   // 접수자ID / 처리자ID
    String ordNoCcnNoType;   // 주문/상담번호 Type
    String ordNoCcnNoText; // 주문번호 or 상담번호
}
