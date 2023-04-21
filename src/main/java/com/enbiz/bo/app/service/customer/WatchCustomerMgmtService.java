package com.enbiz.bo.app.service.customer;

import java.util.List;

import com.enbiz.bo.app.dto.request.customer.CustomerDetailRequest;
import com.enbiz.bo.app.dto.request.customer.CustomerSearchRequest;
import com.enbiz.bo.app.dto.request.customer.WatchCustomerRequest;
import com.enbiz.bo.app.dto.response.customer.CustomerDetailOrderCallCountResponse;
import com.enbiz.bo.app.dto.response.customer.WatchCustomerResponse;
import com.enbiz.bo.app.dto.response.customer.WatchCustomerSearchResponse;
import com.enbiz.bo.app.entity.EtMgrMbrInfo;

/**
 * 관심고객서비스
 */
public interface WatchCustomerMgmtService {

    int getWatchCustomerSearchByViewConditionCount(CustomerSearchRequest customerSearchRequest) throws Exception;

    List<WatchCustomerSearchResponse> getWatchCustomerSearchByViewConditionData(CustomerSearchRequest customerSearchRequest) throws Exception;

    int getWatchCustomerInfoByMemberNoCount(CustomerDetailRequest customerDetailRequest) throws Exception;

    List<WatchCustomerResponse> getWatchCustomerInfoByMemberNoData(CustomerDetailRequest customerDetailRequest) throws Exception;

    void unlockWatchCustomer(WatchCustomerRequest watchCustomerRequest) throws Exception;

    void saveWatchCustomer(EtMgrMbrInfo etMgrMbrInfo);
    
    CustomerDetailOrderCallCountResponse getCustomerDetailOrderCallCountByMemberNo(CustomerDetailRequest customerDetailRequest) throws Exception;

}
