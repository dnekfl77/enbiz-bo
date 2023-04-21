package com.enbiz.bo.app.service.customerservice;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.request.customerservice.PhoneAppointmentRequest;
import com.enbiz.bo.app.dto.response.customerservice.PhoneAppointmentResponse;
import com.enbiz.bo.app.repository.customerservice.CsCustTelPrmsInfoMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Lazy
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
@Slf4j
@RequiredArgsConstructor
public class PhoneAppointmentMgmtServiceImpl implements PhoneAppointmentMgmtService {
	
	private final CsCustTelPrmsInfoMapper csCustTelPrmsInfoMapper;
	
	@Override
	public int getPhoneAppointmentCount(PhoneAppointmentRequest request) {
		return csCustTelPrmsInfoMapper.getPhoneAppointmentCount(request);
	}

	@Override
	public List<PhoneAppointmentResponse> getPhoneAppointmentList(PhoneAppointmentRequest request) {
		return csCustTelPrmsInfoMapper.getPhoneAppointmentList(request);
	}

}
