package com.enbiz.bo.app.service.customerservice;

import java.util.List;

import com.enbiz.bo.app.dto.request.customerservice.PhoneAppointmentRequest;
import com.enbiz.bo.app.dto.response.customerservice.PhoneAppointmentResponse;

/**
 * 전화약속관리 서비스
 */
public interface PhoneAppointmentMgmtService {
	
	/**
	 * 전화약속 목록 조회수
	 */
	public int getPhoneAppointmentCount(PhoneAppointmentRequest request);
	
	/**
	 * 전화약속 목록 조회
	 */
	public List<PhoneAppointmentResponse> getPhoneAppointmentList(PhoneAppointmentRequest request);

}
