package com.enbiz.bo.app.service.customer;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.request.customer.CustomerDetailRequest;
import com.enbiz.bo.app.dto.request.customer.CustomerSearchRequest;
import com.enbiz.bo.app.dto.request.customer.WatchCustomerRequest;
import com.enbiz.bo.app.dto.response.customer.CustomerDetailOrderCallCountResponse;
import com.enbiz.bo.app.dto.response.customer.WatchCustomerResponse;
import com.enbiz.bo.app.dto.response.customer.WatchCustomerSearchResponse;
import com.enbiz.bo.app.entity.EtMgrMbrInfo;
import com.enbiz.bo.app.repository.customer.EtMbrBaseMapper;
import com.enbiz.bo.app.repository.customer.EtMbrBaseTrxMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 고객관리 서비스 IMPL
 */
@Service
@Lazy
@Slf4j
@RequiredArgsConstructor
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class WatchCustomerMgmtServiceImpl implements WatchCustomerMgmtService {

    private final EtMbrBaseMapper etMbrBaseMapper;
    private final EtMbrBaseTrxMapper etMbrBaseTrxMapper;

    @Override
    public int getWatchCustomerSearchByViewConditionCount(CustomerSearchRequest customerSearchRequest) throws Exception {
        return etMbrBaseMapper.getWatchCustomerSearchByViewConditionCount(customerSearchRequest);
    }

    @Override
    public List<WatchCustomerSearchResponse> getWatchCustomerSearchByViewConditionData(CustomerSearchRequest customerSearchRequest) throws Exception {
        return etMbrBaseMapper.getWatchCustomerSearchByViewConditionData(customerSearchRequest);
    }

    @Override
    public int getWatchCustomerInfoByMemberNoCount(CustomerDetailRequest customerDetailRequest) throws Exception {
        return etMbrBaseMapper.getWatchCustomerInfoByMbrNoCount(customerDetailRequest);
    }

    @Override
    public List<WatchCustomerResponse> getWatchCustomerInfoByMemberNoData(CustomerDetailRequest customerDetailRequest)
            throws Exception {
        return etMbrBaseMapper.getWatchCustomerInfoByMbrNoData(customerDetailRequest);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void unlockWatchCustomer(WatchCustomerRequest watchCustomerRequest) throws Exception {
    	etMbrBaseTrxMapper.unlockWatchCustomer(watchCustomerRequest);
    }

    @Override
    public void saveWatchCustomer(EtMgrMbrInfo etMgrMbrInfo) {
    	etMbrBaseTrxMapper.saveWatchCustomer(etMgrMbrInfo);
    }
    
    @Override
    public CustomerDetailOrderCallCountResponse getCustomerDetailOrderCallCountByMemberNo(CustomerDetailRequest customerDetailRequest)
            throws Exception {
        return etMbrBaseMapper.getCustomerDetailOrderCallCountByMemberNo(customerDetailRequest);
    }

}
