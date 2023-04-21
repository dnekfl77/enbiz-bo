package com.enbiz.bo.app.service.customer;

import java.util.List;

import com.enbiz.bo.app.dto.request.customer.CustomerDetailRequest;
import com.enbiz.bo.app.dto.request.customer.CustomerSearchRequest;
import com.enbiz.bo.app.dto.request.realgrid.RawRealGridCUDRequest;
import com.enbiz.bo.app.dto.response.customer.CustomerDeliveryInfoResponse;
import com.enbiz.bo.app.dto.response.customer.CustomerDetailResponseEx;
import com.enbiz.bo.app.dto.response.customer.CustomerGradeHistoryResponse;
import com.enbiz.bo.app.dto.response.customer.CustomerRefundAccountInfoResponse;
import com.enbiz.bo.app.dto.response.customer.CustomerSearchResponse;
import com.enbiz.bo.app.dto.response.customer.CustomerTermsAgreeHistoryResponse;
import com.enbiz.bo.app.entity.EtMbrBase;
import com.enbiz.bo.app.entity.EtMbrRfdActnInfo;

/**
 * 회원관리 서비스
 */
public interface CustomerMgmtService {
	
	int getCustomerListCount(CustomerSearchRequest customerSearchRequest) throws Exception;

    List<CustomerSearchResponse> getCustomerList(CustomerSearchRequest customerSearchRequest) throws Exception;

    CustomerDetailResponseEx getCustomerDetail(CustomerDetailRequest customerDetailRequest) throws Exception;

    void saveCustomerDetailAndOthersData(RawRealGridCUDRequest rawCUDRequest, EtMbrBase etMbrBase) throws Exception;

    int getCustomerDeliveryListCount(CustomerDetailRequest customerDetailRequest) throws Exception;

    List<CustomerDeliveryInfoResponse> getCustomerDeliveryList(CustomerDetailRequest customerDetailRequest) throws Exception;

    int getCustomerTermsAgreeHistoryByMemberNoSiteNoCount(CustomerDetailRequest customerDetailRequest) throws Exception;

    List<CustomerTermsAgreeHistoryResponse> getCustomerTermsAgreeHistoryByMemberNoSiteNoData(CustomerDetailRequest customerDetailRequest)
            throws Exception;

    CustomerRefundAccountInfoResponse getCustomerRefundAccountInfoByMemberNo(CustomerDetailRequest customerDetailRequest)
            throws Exception;

    void saveCustomerRefundAccount(EtMbrRfdActnInfo etMbrRfdActnInfo) throws Exception;

    int getCustomerGradeHistoryByMemberNoCount(CustomerDetailRequest customerDetailRequest) throws Exception;

    List<CustomerGradeHistoryResponse> getCustomerGradeHistoryByMemberNoData(CustomerDetailRequest customerDetailRequest)
            throws Exception;

}
