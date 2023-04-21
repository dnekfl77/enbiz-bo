package com.enbiz.bo.app.service.customer;

import java.util.List;

import com.enbiz.bo.app.dto.request.customer.CustomerSearchRequest;
import com.enbiz.bo.app.dto.response.customer.CustomerSearchResponse;

/**
 * 휴면회원조회 서비스
 */
public interface DormantCustomerInquiryService {

    int getDormantCustomerBySearchConditionCount(CustomerSearchRequest customerSearchRequest);

    List<CustomerSearchResponse> getDormantCustomerBySearchConditionData(CustomerSearchRequest customerSearchRequest);
}
