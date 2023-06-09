package com.enbiz.bo.app.service.customer;

import java.util.List;
import java.util.Map;

import org.apache.commons.collections.map.HashedMap;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;

import com.enbiz.bo.app.constant.Constants;
import com.enbiz.bo.app.dto.request.customer.CustomerDetailRequest;
import com.enbiz.bo.app.dto.request.customer.CustomerSearchRequest;
import com.enbiz.bo.app.dto.request.realgrid.RawRealGridCUDRequest;
import com.enbiz.bo.app.dto.request.realgrid.RealGridCUDRequest;
import com.enbiz.bo.app.dto.response.customer.CustomerDeliveryInfoResponse;
import com.enbiz.bo.app.dto.response.customer.CustomerDetailResponseEx;
import com.enbiz.bo.app.dto.response.customer.CustomerGradeHistoryResponse;
import com.enbiz.bo.app.dto.response.customer.CustomerRefundAccountInfoResponse;
import com.enbiz.bo.app.dto.response.customer.CustomerSearchResponse;
import com.enbiz.bo.app.dto.response.customer.CustomerTermsAgreeHistoryResponse;
import com.enbiz.bo.app.dto.response.customer.CustomerTermsAgreeInfoResponse;
import com.enbiz.bo.app.entity.EtMbrBase;
import com.enbiz.bo.app.entity.EtMbrDlvpInfo;
import com.enbiz.bo.app.entity.EtMbrRfdActnInfo;
import com.enbiz.bo.app.repository.customer.EtMbrBaseMapper;
import com.enbiz.bo.app.repository.customer.EtMbrBaseTrxMapper;
import com.enbiz.common.base.Validator;
import com.enbiz.common.base.exception.MessageResolver;
import com.enbiz.common.base.rest.Response;
import com.enbiz.common.base.rest.RestApiUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 고객관리 서비스 IMPL
 */
@Service
@Lazy
@Slf4j
@RequiredArgsConstructor
//@Transactional(propagation = Propagation.SUPPORTS, readOnly = true) 
public class CustomerMgmtServiceImpl implements CustomerMgmtService {
	private final RestApiUtil restApiUtil;
	@Value("${app.apiUrl.bo}")
	private String boApiUrl;
    
	/**
	 * 회원 조회 수
	 * @param customerSearchRequest
     * @return Integer
     * @throws exception
	 */
	@Override
	public int getCustomerListCount(CustomerSearchRequest customerSearchRequest) throws Exception {
		return restApiUtil.get(boApiUrl+ "/api/bo/customer/customerMgmt/getCustomerListCount", customerSearchRequest, new ParameterizedTypeReference<Response<Integer>>() {}).getPayload();
    }

	/**
	 * 회원 조회
	 * @param customerSearchRequest
     * @return list
     * @throws exception
	 */
	@Override
	public List<CustomerSearchResponse> getCustomerList(CustomerSearchRequest customerSearchRequest) throws Exception {
		return restApiUtil.get(boApiUrl+ "/api/bo/customer/customerMgmt/getCustomerList", customerSearchRequest, new ParameterizedTypeReference<Response<List<CustomerSearchResponse>>>() {}).getPayload();
    }
	
	/**
	 * 회원 상세 뷰 
	 * @param customerDetailRequest
     * @return customerDetailResponseEx
     * @throws exception
	 */
	@Override
	public CustomerDetailResponseEx getCustomerDetail(CustomerDetailRequest customerDetailRequest) throws Exception {
	
		//1. Parameters Validation
	    if (customerDetailRequest == null) throw new Exception("필수값 누락");
	    if (StringUtils.isBlank(customerDetailRequest.getMbrNo())) throw new Exception("필수값 누락");
	
	    //2. 회원, 배송지, 마케팅/서비스 동의 정보 조회
	    CustomerDetailResponseEx customerDetailResponseEx =
	    		restApiUtil.get(boApiUrl+ "/api/bo/customer/customerMgmt/getCustomerDetail", customerDetailRequest, new ParameterizedTypeReference<Response<CustomerDetailResponseEx>>() {}).getPayload();

	    //조회된 가입사이트번호를 Request 객체에 담는다.(마케팅/서비스 동의정보 조회를 위해)
	    customerDetailRequest.setSiteNo(customerDetailResponseEx.getSiteNo());
	
	    List<CustomerDeliveryInfoResponse> customerDeliveryInfoResponseList =
	    		restApiUtil.get(boApiUrl+ "/api/bo/customer/customerMgmt/getCustomerDeliveryInfoByMbrNoList", customerDetailRequest, new ParameterizedTypeReference<Response<List<CustomerDeliveryInfoResponse>>>() {}).getPayload();

	    List<CustomerTermsAgreeInfoResponse> customerTermsAgreeInfoResponseList =
	    		restApiUtil.get(boApiUrl+ "/api/bo/customer/customerMgmt/getCustomerTermsAgreeInfoByMbrNoSiteNoList", customerDetailRequest, new ParameterizedTypeReference<Response<List<CustomerTermsAgreeInfoResponse>>>() {}).getPayload();
	
	    customerDetailResponseEx.setCustomerDeliveryInfoResponseList(customerDeliveryInfoResponseList);
	    customerDetailResponseEx.setCustomerTermsAgreeInfoResponseList(customerTermsAgreeInfoResponseList);
	
	    //3. 결과 Return
	
	    return customerDetailResponseEx;
	}
	
	/**
	 * 회원등급 이력 조회 수
	 * @param customerDetailRequest
     * @return Integer
     * @throws exception
	 */
	@Override
	public int getCustomerGradeHistoryByMemberNoCount(CustomerDetailRequest customerDetailRequest) throws Exception {
		return restApiUtil.get(boApiUrl+ "/api/bo/customer/customerMgmt/getCustomerGradeHistoryByMemberNoCount", customerDetailRequest, new ParameterizedTypeReference<Response<Integer>>() {}).getPayload();
	}
		
	/**
	 * 회원등급 이력 조회 수
	 * @param customerDetailRequest
     * @return list
     * @throws exception
	 */
	@Override
	public List<CustomerGradeHistoryResponse> getCustomerGradeHistoryByMemberNoData(CustomerDetailRequest customerDetailRequest) throws Exception {
		return restApiUtil.get(boApiUrl+ "/api/bo/customer/customerMgmt/getCustomerGradeHistoryByMemberNoData", customerDetailRequest, new ParameterizedTypeReference<Response<List<CustomerGradeHistoryResponse>>>() {}).getPayload();  
	}
	
	/**
	 * 환불 계좌 조회 
	 * @param customerDetailRequest
     * @return CustomerRefundAccountInfoResponse
     * @throws exception
	 */
	@Override
    public CustomerRefundAccountInfoResponse getCustomerRefundAccountInfoByMemberNo(CustomerDetailRequest customerDetailRequest) throws Exception {
		return restApiUtil.get(boApiUrl+ "/api/bo/customer/customerMgmt/getCustomerRefundAccountInfoByMemberNo", customerDetailRequest, new ParameterizedTypeReference<Response<CustomerRefundAccountInfoResponse>>() {}).getPayload();
		//return etMbrBaseMapper.getCustomerRefundAccountInfoByMemberNo(customerDetailRequest);
    }
	
	/**
	 * 환불 계좌 저장 
	 * @param etMbrRfdActnInfo
     * @return 
     * @throws exception
	 */
	@Override
    public void saveCustomerRefundAccount(EtMbrRfdActnInfo etMbrRfdActnInfo) throws Exception {
		restApiUtil.post(boApiUrl+ "/api/bo/customer/customerMgmt/saveCustomerRefundAccount", etMbrRfdActnInfo, new ParameterizedTypeReference<Response<String>>() {}).getPayload();
    	//etMbrBaseTrxMapper.saveCustomerRefundAccount(etMbrRfdActnInfo);
    }
	
	/**
	 * 회원 배송지 조회 수 
	 * @param customerDetailRequest
     * @return 회원 배송지 조회 수
     * @throws exception
	 */
    @Override
    public int getCustomerDeliveryListCount(CustomerDetailRequest customerDetailRequest) throws Exception {
    	return restApiUtil.get(boApiUrl+ "/api/bo/customer/customerMgmt/getCustomerDeliveryListCount", customerDetailRequest, new ParameterizedTypeReference<Response<Integer>>() {}).getPayload();
    }

    /**
	 * 회원 배송지 조회
	 * @param customerDetailRequest
     * @return 회원 배송지 조회 
     * @throws exception
	 */
    @Override
    public List<CustomerDeliveryInfoResponse> getCustomerDeliveryList(CustomerDetailRequest customerDetailRequest) throws Exception {
    	return restApiUtil.get(boApiUrl+ "/api/bo/customer/customerMgmt/getCustomerDeliveryList", customerDetailRequest, new ParameterizedTypeReference<Response<List<CustomerDeliveryInfoResponse>>>() {}).getPayload();
    }
    
    /**
	 * 회원상세 저장
	 * @param rawCUDRequest, etMbrBase
     * @return  
     * @throws exception
	 */
    @Override
    //@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void saveCustomerDetailAndOthersData(RawRealGridCUDRequest rawCUDRequest, EtMbrBase etMbrBase) throws Exception {
    	restApiUtil.post(boApiUrl+ "/api/bo/customer/customerMgmt/saveCustomerDetailAndOthersData", etMbrBase, new ParameterizedTypeReference<Response<String>>() {}).getPayload();
    	
    	Map<String, Object> request = new HashedMap();
    	request.put("mbrNo", etMbrBase.getMbrNo());
    	request.put("rawCUDRequest", rawCUDRequest);
    	
    	restApiUtil.get(boApiUrl+ "/api/bo/customer/customerMgmt/setOthersDataByMbrNo", request, new ParameterizedTypeReference<Response<String>>() {}).getPayload();
    	
    	
        //setOthersDataByMbrNo(rawCUDRequest, etMbrBase.getMbrNo());
    }

    private void setOthersDataByMbrNo(RawRealGridCUDRequest rawCUDRequest, String mbrNo) throws Exception {
        //배송비정책 그리드
        RealGridCUDRequest<EtMbrDlvpInfo> etMbrDlvpInfo = rawCUDRequest.getRequest("customerDeliveryGrid", EtMbrDlvpInfo.class);

        List<EtMbrDlvpInfo> createData = etMbrDlvpInfo.getCreate();
        List<EtMbrDlvpInfo> updateData = etMbrDlvpInfo.getUpdate();
        List<EtMbrDlvpInfo> deleteData = etMbrDlvpInfo.getDelete();
        saveEtMbrDlvpInfo(mbrNo, createData, updateData, deleteData);
    }

    private void saveEtMbrDlvpInfo(String mbrNo, List<EtMbrDlvpInfo> createData,
    		
                                   List<EtMbrDlvpInfo> updateData,
                                   List<EtMbrDlvpInfo> deleteData) throws Exception {

        for (EtMbrDlvpInfo currentData : createData) {
            if(mbrNo != null && !mbrNo.isEmpty()){
                currentData.setMbrNo(mbrNo);
            }

            etMbrDlvpValidator(currentData);

            etMbrBaseTrxMapper.insertEtMbrDlvpInfo(currentData);
        }

        for (EtMbrDlvpInfo currentData : updateData) {
            etMbrDlvpValidator(currentData);

            Validator.throwIfEmpty(currentData.getMbrNo()
                    , MessageResolver.getMessage(Constants.MSG_COMMON_PARAMETER_EMPTY_ERROR
                            , new String[] {"MbrNo"}));
            Validator.throwIfEmpty(currentData.getMbrDlvpSeq()
                    , MessageResolver.getMessage(Constants.MSG_COMMON_PARAMETER_EMPTY_ERROR
                            , new String[] {"MbrDlvpSeq"}));

            etMbrBaseTrxMapper.updateEtMbrDlvpInfo(currentData);
        }

        for (EtMbrDlvpInfo currentData : deleteData) {
            Validator.throwIfEmpty(currentData.getMbrNo()
                    , MessageResolver.getMessage(Constants.MSG_COMMON_PARAMETER_EMPTY_ERROR
                            , new String[] {"MbrNo"}));
            Validator.throwIfEmpty(currentData.getMbrDlvpSeq()
                    , MessageResolver.getMessage(Constants.MSG_COMMON_PARAMETER_EMPTY_ERROR
                            , new String[] {"MbrDlvpSeq"}));

            etMbrBaseTrxMapper.deleteEtMbrDlvpInfo(currentData);
        }
    }

    private void etMbrDlvpValidator(EtMbrDlvpInfo currentData) {
        Validator.throwIfEmpty(currentData.getZipNoSeq()
                , MessageResolver.getMessage(Constants.MSG_COMMON_PARAMETER_EMPTY_ERROR
                        , new String[] {"ZipNoSeq"}));

    }
    
    /**
	 * 동의정보 이력 조회 수
	 * @param customerDetailRequest
     * @return 이력 조회 수
     * @throws exception
	 */
    @Override
    public int getCustomerTermsAgreeHistoryByMemberNoSiteNoCount(CustomerDetailRequest customerDetailRequest) throws Exception {
    	return restApiUtil.get(boApiUrl+ "/api/bo/customer/customerMgmt/getCustomerTermsAgreeHistoryByMemberNoSiteNoCount", customerDetailRequest, new ParameterizedTypeReference<Response<Integer>>() {}).getPayload();
    	//return etMbrBaseMapper.getCustomerTermsAgreeHistoryByMemberNoSiteNoCount(customerDetailRequest);
    }

    /**
	 * 동의정보 이력 조회
	 * @param CustomerDetailRequest
     * @return 동의정보 이력 조회
     * @throws exception
	 */
    @Override
    public List<CustomerTermsAgreeHistoryResponse> getCustomerTermsAgreeHistoryByMemberNoSiteNoData(CustomerDetailRequest customerDetailRequest) throws Exception {
    	return restApiUtil.get(boApiUrl+ "/api/bo/customer/customerMgmt/getCustomerTermsAgreeHistoryByMemberNoSiteNoData", customerDetailRequest, new ParameterizedTypeReference<Response<List<CustomerTermsAgreeHistoryResponse>>>() {}).getPayload();
    	//return etMbrBaseMapper.getCustomerTermsAgreeHistoryByMemberNoSiteNoData(customerDetailRequest);
    }
	
	
	
    private final EtMbrBaseMapper etMbrBaseMapper;
    private final EtMbrBaseTrxMapper etMbrBaseTrxMapper;
    

//    @Override
//    public int getCustomerListCount(CustomerSearchRequest customerSearchRequest) throws Exception {
//        return etMbrBaseMapper.getSearchCustomerByCustomerMgmtViewCount(customerSearchRequest);
//    }

//    @Override
//    public List<CustomerSearchResponse> getCustomerList(CustomerSearchRequest customerSearchRequest) throws Exception {
//        return etMbrBaseMapper.getSearchCustomerByCustomerMgmtViewData(customerSearchRequest);
//    }

//    @Override
//    public CustomerDetailResponseEx getCustomerDetail(CustomerDetailRequest customerDetailRequest) throws Exception {
//
//        //1. Parameters Validation
//        if (customerDetailRequest == null) throw new Exception("필수값 누락");
//        if (StringUtils.isBlank(customerDetailRequest.getMbrNo())) throw new Exception("필수값 누락");
//
//        //2. 회원, 배송지, 마케팅/서비스 동의 정보 조회
//        CustomerDetailResponseEx customerDetailResponseEx =
//                etMbrBaseMapper.getCustomerDetailByMbrNo(customerDetailRequest);
//
//        //조회된 가입사이트번호를 Request 객체에 담는다.(마케팅/서비스 동의정보 조회를 위해)
//        customerDetailRequest.setSiteNo(customerDetailResponseEx.getSiteNo());
//
//        List<CustomerDeliveryInfoResponse> customerDeliveryInfoResponseList =
//                etMbrBaseMapper.getCustomerDeliveryInfoByMbrNoList(customerDetailRequest);
//
//        List<CustomerTermsAgreeInfoResponse> customerTermsAgreeInfoResponseList =
//                etMbrBaseMapper.getCustomerTermsAgreeInfoByMbrNoSiteNoList(customerDetailRequest);
//
//        customerDetailResponseEx.setCustomerDeliveryInfoResponseList(customerDeliveryInfoResponseList);
//        customerDetailResponseEx.setCustomerTermsAgreeInfoResponseList(customerTermsAgreeInfoResponseList);
//
//        //3. 결과 Return
//
//        return customerDetailResponseEx;
//    }

    

//    @Override
//    public int getCustomerDeliveryListCount(CustomerDetailRequest customerDetailRequest) throws Exception {
//        return etMbrBaseMapper.getCustomerDeliveryByMbrNoCount(customerDetailRequest);
//    }
//
//    @Override
//    public List<CustomerDeliveryInfoResponse> getCustomerDeliveryList(CustomerDetailRequest customerDetailRequest)
//            throws Exception {
//        return etMbrBaseMapper.getCustomerDeliveryByMbrNoData(customerDetailRequest);
//    }

//    @Override
//    public int getCustomerTermsAgreeHistoryByMemberNoSiteNoCount(CustomerDetailRequest customerDetailRequest) throws Exception {
//        return etMbrBaseMapper.getCustomerTermsAgreeHistoryByMemberNoSiteNoCount(customerDetailRequest);
//    }
//
//    @Override
//    public List<CustomerTermsAgreeHistoryResponse> getCustomerTermsAgreeHistoryByMemberNoSiteNoData(CustomerDetailRequest customerDetailRequest)
//            throws Exception {
//        return etMbrBaseMapper.getCustomerTermsAgreeHistoryByMemberNoSiteNoData(customerDetailRequest);
//    }

//    @Override
//    public CustomerRefundAccountInfoResponse getCustomerRefundAccountInfoByMemberNo(CustomerDetailRequest customerDetailRequest) throws Exception {
//        return etMbrBaseMapper.getCustomerRefundAccountInfoByMemberNo(customerDetailRequest);
//    }

//    @Override
//    public void saveCustomerRefundAccount(EtMbrRfdActnInfo etMbrRfdActnInfo) throws Exception {
//    	etMbrBaseTrxMapper.saveCustomerRefundAccount(etMbrRfdActnInfo);
//    }
    
//    @Override
//    public int getCustomerGradeHistoryByMemberNoCount(CustomerDetailRequest customerDetailRequest) throws Exception {
//        return etMbrBaseMapper.getCustomerGradeHistoryByMbrNoCount(customerDetailRequest);
//    }

//    @Override
//    public List<CustomerGradeHistoryResponse> getCustomerGradeHistoryByMemberNoData(CustomerDetailRequest customerDetailRequest) throws Exception {
//        return etMbrBaseMapper.getCustomerGradeHistoryByMemberNoData(customerDetailRequest);
//    }

}
