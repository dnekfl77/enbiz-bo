package com.enbiz.bo.app.service.adjust;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.request.adjust.VendorCommissionRequest;
import com.enbiz.bo.app.dto.response.adjust.VendorCommissionResponse;
import com.enbiz.common.base.rest.Response;
import com.enbiz.common.base.rest.RestApiUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 업체매출수수료조회
 */

@Service
@Lazy
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
@Slf4j
@RequiredArgsConstructor
public class VendorCommissionServiceImpl implements VendorCommissionService {
	private final RestApiUtil restApiUtil;
	
	@Value("${app.apiUrl.bo}")
	private String boApiUrl;
	
	/**
	 *  업체매출수수료조회 목록 Count 조회
	 * @param  vendorCommissionRequest
	 * @return 목록 Count
	 * @throws Exception
	 */
	@Override
	public int getVendorCommissionListCount(VendorCommissionRequest vendorCommissionRequest) throws Exception {
		return restApiUtil.get(boApiUrl+ "/api/bo/adjust/vendorCommission/getVendorCommissionListCount", vendorCommissionRequest, new ParameterizedTypeReference<Response<Integer>>() {}).getPayload();
	}
	
	/**
	 * 업체매출수수료조회 목록 조회
	 * @param vendorCommissionRequest
	 * @return 목록
	 * @throws Exception
	 */
	@Override
	public List<VendorCommissionResponse> getVendorCommissionList(VendorCommissionRequest vendorCommissionRequest) throws Exception {
		return restApiUtil.get(boApiUrl+ "/api/bo/adjust/vendorCommission/getVendorCommissionList", vendorCommissionRequest, new ParameterizedTypeReference<Response<List<VendorCommissionResponse>>>() {}).getPayload();
	}
}
