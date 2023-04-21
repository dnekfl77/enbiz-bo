package com.enbiz.bo.app.repository.customerservice;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.customerservice.PhoneAppointmentRequest;
import com.enbiz.bo.app.dto.response.customerservice.PhoneAppointmentResponse;

/**
 * 고객전화약속정보
 */
@Repository
@Lazy
public interface CsCustTelPrmsInfoMapper {
    /**
     * 전화약속관리 목록 조회
     */
    List<PhoneAppointmentResponse> getPhoneAppointmentList(PhoneAppointmentRequest request);

    /**
     * 전화약속관리 목록수 조회
     */
    int getPhoneAppointmentCount(PhoneAppointmentRequest request);
}
