package com.enbiz.bo.app.service.customer;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.request.customer.CustomerSearchRequest;
import com.enbiz.bo.app.dto.response.customer.CustomerSearchResponse;
import com.enbiz.bo.app.repository.customer.EtMbrBaseMapper;

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
public class DormantCustomerInquiryServiceImpl implements DormantCustomerInquiryService {

    private final EtMbrBaseMapper etMbrBaseMapper;

    @Override
    public int getDormantCustomerBySearchConditionCount(CustomerSearchRequest customerSearchRequest) {
        return etMbrBaseMapper.getDormantCustomerBySearchConditionCount(customerSearchRequest);
    }

    @Override
    public List<CustomerSearchResponse> getDormantCustomerBySearchConditionData(CustomerSearchRequest customerSearchRequest) {
        return etMbrBaseMapper.getDormantCustomerBySearchConditionData(customerSearchRequest);
    }

}
