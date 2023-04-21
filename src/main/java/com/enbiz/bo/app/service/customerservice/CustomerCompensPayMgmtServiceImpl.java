package com.enbiz.bo.app.service.customerservice;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.request.customerservice.CsCpPayRequest;
import com.enbiz.bo.app.dto.response.customerservice.CsCustomerCompensResponse;
import com.enbiz.bo.app.repository.customerservice.CsCustCpnsAccpInfoMapper;

import lombok.RequiredArgsConstructor;

/**
 * 고객보상지급관리
 */
@Service
@Lazy
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
@RequiredArgsConstructor
public class CustomerCompensPayMgmtServiceImpl implements CustomerCompensPayMgmtService {

    private final CsCustCpnsAccpInfoMapper csCustCpnsAccpInfoMapper;

    /**
     * 고객보상 지급목록 조회
     */
    @Override
    public List<CsCustomerCompensResponse> getCustomerCompensPayList(CsCpPayRequest request) throws Exception {
        return csCustCpnsAccpInfoMapper.customerCpPayManagementList(request);
    }

    /**
     * 고객보상 지급목록수 조회
     */
    @Override
    public int getCustomerCompensPayListCount(CsCpPayRequest request ) throws Exception {
        return csCustCpnsAccpInfoMapper.customerCpPayManagementListCount(request);
    }
}
